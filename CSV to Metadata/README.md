# Import CSV to Metadata

These workflows will take an Input CSV file, search for an asset based off a field in CSV and assign corresponding metadata from said CSV.



## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Take an input CSV file and turn it to a JSON object
    * Split the JSON by line and feed to SUBFLOW:
        * Searches for an asset based on a field in the JSON line.
        * Assigns all corresponding metadata to that asset, so long as the field names match the headers.
            * (Currently searches for asset based off `assetId`)
### Data Defs as Subflow

### Dynamic properties used
* `filesystem.root.temp`

## Versioning
*Version 1* - 1/3/2020 Commit

## Authors
**Levels Beyond - Evan Apodaca** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

