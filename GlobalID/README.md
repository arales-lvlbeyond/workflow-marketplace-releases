# Assign GlobalID & globalGUID
These workflows are made for multi-site clients in order to give each asset a unique ID with an identifier for which system the asset was ingested from.


## Getting Started
These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Identify all assets and collections that do not have a globalGUID
        * The subflow then identifies whether the asset is a collection or an asset
        * It then sends the asset or collections ID, system it came from, and whether or not it is a collection to the subflow
            * The subflow globalEncodeDecode is then called to create the unique globalGUID, it is explained in the readme below:
        * Calls `existingSha1AssignSubflow` which is also in this workflow marketplace repo, in order to get the sha1 of the asset.
        * Assigns a globalID, globalGUID, and sha1 on that asset.
### Data Defs as Subflow


### Workflow summary
On multi-site systems, these workflows assign:
    * sha1 
    * globalID containing the ID and which system it came from 
    * globalGUID which is a unique ID made from the globalID which is encoded and decodable

### Dynamic properties used
    * workflows.globalIdAssign.queueLimit ?: 11
	* workflows.globalIdAssign.batchSize ?: 10
	* workflows.globalIdAssign.queryPollInterval ?: 60
	* workflow.globalID.originalServer ?: NON - System CODE EX NYC WDC
	* workflow.globalId.template - Create this using `globalIdGenerateKeys` and putting output of workflow here

## Versioning

*Version 1* - 2/17/2020

## Authors

* **Levels Beyond - Evan Apodaca

## License

## Acknowledgments
Theron Lewis for writing this crazy encoder/decoder below


## GlobalId encoding/encryption algorithm for [UUID](https://tools.ietf.org/html/rfc4122) Generation

According to [RFC-4122](https://tools.ietf.org/html/rfc4122) there is a UUID variant that contains a node ID
which is pretty much the same as the site ID we use and another identifier.  The UUID is supposed to be MD5 
encoded or a newer variant SHA1 encoded.  The problem with this is that neither MD5 nor SHA1 are reversable so if
we want to figure out which asset on whose machine maps to the UUID we will have to do a database lookup.

A UUID is 16 bytes, but for UUIDs of type variant 2 version 3 which is the name-based version with md5 hashing we 
actually have 15 bytes and 2 bits free for us to use.  Looking at existing block encryption algorithms the minimum 
sized block those would work with are 128 bits or 16 bytes.  We are 6 bits short!

My goal in writing a custom encoder was to create a reversable 15 byte and 2 bit encryption that would be
easily encoded and generate a result that looked like md5 hashing but not show linear depenence.  In other words if
site `RED-5` was encoding two different assets, `8675308` and `8675309` I wanted the generated result to appear completely different
rather than having the results identical except for a single digit.

In order to achieve my goals I used `XOR` for it's property that a bit `XOR`ed twice with the same bit would result in the 
original bit.  I also used bit rotation, and finally I shuffled the bytes around.  The uses of bitwise `OR` and `AND` were used 
for bitwise masking and addition when setting the 6 required bits for a properly formatted [RFC-4122](https://tools.ietf.org/html/rfc4122)
compliant UUID.

The first thing I did was to create four rows of 15 bytes of random numbers to `XOR` with the 15 bytes of data to obfiscate the data.  I also
created 4 sorting templates for shuffling around the bytes.  Here is the fallback template formatted as JSON:

```
tt = [
{
    "map": [5, 1, 0, 6, 8, 7, 3, 9, 14, 2, 12, 4, 10, 13, 11], 
    "key": [193, 50, 215, 82, 175, 147, 167, 196, 38, 223, 252, 136, 207, 135, 97]
}, 
{
    "map": [9, 11, 5, 10, 3, 14, 2, 4, 0, 8, 7, 6, 13, 1, 12], 
    "key": [161, 197, 241, 97, 158, 73, 144, 242, 9, 198, 101, 140, 165, 158, 6]
}, 
{
    "map": [9, 12, 4, 5, 14, 7, 6, 11, 8, 0, 10, 1, 3, 2, 13], 
    "key": [36, 3, 96, 135, 77, 90, 15, 106, 252, 246, 63, 255, 235, 165, 230]
}, 
{
    "map": [4, 0, 13, 11, 7, 6, 12, 2, 5, 9, 14, 3, 1, 10, 8], 
    "key": [33, 106, 175, 203, 62, 158, 137, 230, 244, 156, 185, 43, 26, 45, 104]
}
]

```

The `map` key is used to translate the index in to the buffer so in this example if we're using template 0 then
index 0 maps to index 5,  index 1 maps to index 1, index 2 maps to index 0, etc.

The `key` key has the xor value so the first byte will be xor'd with 193, the second with 50, etc.

I wrote an algorithm to take a passphrase string and turn it in to a random seed that should theoretically generate the same 
encryption template every time.  This is guarenteed unless the version of java changes.  While it is highly unlikely 
this would cause a random sequence to change for the same seed, it is best if once the dynamic properties are generated
that we keep the templates and not try to regenerate them from the passphrase every time.  Once the UUIDs are used as
global IDs and stored in the database we don't want to be changing the template as the old globalIds would become invalid.

The 8 byte long value representing our asset ID or collection ID is written in binary form to the first 8 bytes of the 15 byte buffer.  The characters from the node or site ID are
written to the remaining bytes with zero padding.  We use `ISO-8859-1` as the character encoding since it has exactly 256 unique
characters which maps a single character to a single byte preserving any binary values.  We should make sure not to
use any special UTF-8 characters in the site ID or node name because it could generate multiple bytes for a single value.

The bytes in the buffer are first xor'd with each other.  The first 7 bytes are xor'd with the last 7 bytes, so byte 0 is xored with byte 14, byte 1 with byte 13,
byte 2 with byte 12, etc.  Byte 7 is left as is.  As each byte is placed in the 2nd buffer it is rotated based on it's position.  Byte
0 is rotated right 0 bits.  Byte 1 is rotated right 1 bit.  Byte 2 is rotated right 2 bits, etc.  This is handled by the `TwoToneCrypt.enc` method
and the result is returned as an array.

The results from the `TwoToneCrypt.enc` method are then assigned to a third buffer.  First the bytes in the original unencoded 
buffer are summed up an the modulus 4 is computed.  This gives a number from 0 to 3 which can be encoded in 2 bits which I call the crypt
index or cidx.  The array returned from the `TwoToneCrypt.enc` method is then stored in to a third 16 byte buffer using the `TwoToneCrypt.put` method
which translates the index using the `map` at the `cidx` (eg: cidx = 2 means it uses the third map) and xor's each byte with the right
`key` value at the `cidx`.  The `key` for the xor is taken from the original position in the byte array, not the mapped position.

The result is that the encrypted and shuffled 15 bytes are placed in the first 15 bytes of the final 16 byte array.  Now there are 6 bits that are 
required to be set according to [RFC-4122](https://tools.ietf.org/html/rfc4122).  The 4 most significant bits of the 7th byte (or 6 since the index starts
at 0) aka the `time_hi_and_version` field must be 0011 binary, and the most significant two bits of the `clk_seq_hi_res` field which is the 9th byte
(or index 8) must be 10 binary.  The first thing we do is take the 4 most significant bits from both of those fields and copy them in to 
the last byte, the most significant bits belonging to the `time_hi_and_version` byte and the least significant bytes belonging to the
`clk_seq_hi_res` field.  The required values for this to be a legal UUID are then masked in place with `and` and `or` bitwise operators.

You'll notice that the next two significant bits in the `clk_seq_hi_res` field which signify the UUID variant are marked "don't care" according
to the RFC.  Well as it turns out our `cidx` value is exactly 2 bits.  We mask in those two bits in to the unused bits of that field.

The 16 byte buffer with the encrypted and encded guid information is then pulled out as a low order long value and a high order long value
and fed in to the UUID class.  The toString method of that class gives us the final string UUID value with the encoded encrypted 
asset ID and site ID or `node`.  I validated that the UUID class returns the expected version and variant.

In order to decode this, we do everything in reverse. We call the UUID classes static method to parse the UUID and convert it in to it's binary
representation.  We then pull the values out as the low order long and high order long and put it in a 16 byte buffer. 
We pull the `cidx` from the two bits in the `clk_seq_hi_res` field.  The rotates are left instead of right.  We copy the 16th byte in to the proper places in the 7th and 9th byte. 
We then transfer those values to another buffer using the index values from the map at the `cidx` position, xor'ing those values with the `key` values.  
Remember, if you xor the same bit over a bit twice you get the original bit 
value back.  We then xor the left and write halfs of the buffer with eachother again, and the result is the original buffer values.  The first 8 bytes are then extracted
as a long and the remaining 7 bytes are converted to a string.  The conversion requires replacing the null characters at the end of the string with the empty string but 
otherwise we get back what we originally encded in to the UUID.

