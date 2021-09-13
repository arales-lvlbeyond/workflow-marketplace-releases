# Create Placeholder Assets (M&E)

## Summary
The 'Create Placeholder' workflows provide a ability for a user to create assets that are going to to be delivered and ingested into RE.  
These workflows also provide organizations with a way to track the receipt of materials from internal and/or external parties, thus providing media management teams the ability to track the state and status of all of various components of an episode of a show.

These workflows are able to be used in order to build the plan for new episodes and components.

When executing, the New Episode (or New Season) workflow will create a Collection with metadata to represent an Episode then utilize the subflows to build out the necessary placeholder assets, apply the appropriate metadata and normalize the assets naming strucuture. 

## Files
<pre>
Placeholders/mpPlaceholderNewSeason.xml
Placeholders/mpPlaceholderNewEpisode.xml
Placeholders/mpPlaceholderCreateAdditionalPlaceholders.xml
Placeholders/mpPlaceholderCreateNewEpisodePlaceholders.xml
Placeholders/Individuals/mpPlaceholderCreateAudioPlaceholder.xml  
Placeholders/Individuals/mpPlaceholderCreateDocumentPlaceholder.xml  
Placeholders/Individuals/mpPlaceholderCreateImagePlaceholder.xml  
Placeholders/Individuals/mpPlaceholderCreateVideoPlaceholder.xml  
</pre>


##Getting Started

## Deployment Steps

### Categories

##### Create the following Categories in Reach Engine

* Episode
* Delivery Package
* Deliverable
* Logo
* Season
* Series
* Audio Component
* Timed Text Component
* Image Component
* Video Component

### Metadata
##### The following csv files can be used to add values to the metadata fields created below:
* Placeholder Metadata Value CSVs/Additional Placeholders.csv
* Placeholder Metadata Value CSVs/Contains Forced Narrative.csv
* Placeholder Metadata Value CSVs/Content Status.csv
* Placeholder Metadata Value CSVs/Content Type.csv
* Placeholder Metadata Value CSVs/Episode Number.csv
* Placeholder Metadata Value CSVs/Format.csv
* Placeholder Metadata Value CSVs/Language.csv
* Placeholder Metadata Value CSVs/Season Number.csv
* Placeholder Metadata Value CSVs/Sub Track Type.csv
* Placeholder Metadata Value CSVs/Track Arrangement.csv
* Placeholder Metadata Value CSVs/Track Type.csv

##### Create the following required metadata fields in Reach Engine
*Note:  The following Metadata Fields MUST be created with exact property/field names and types listed below.  Display Names can be modified, if desired.

| Display Name | Property/FieldName | Type | Suggested Metadata Groups | Notes | 
| :--- | :--- | :--- | :--- | :--- |
| Series | mpPlaceholderSeries | Standard Picklist (Single)  | Episode, Season, Series, Delivery Package |
| Season | mpPlaceholderSeason | Standard Picklist (Single)  | Episode, Season, Delivery Package |
| Episode Number | mpPlaceholderEpisodeNumber | Standard Picklist (Single) | Episode, Deliverable |
| Provider | mpPlaceholderProvider | Standard Picklist (Single) | Episode, Deliverable |
| Format | mpPlaceholderFormat | Standard Picklist (Single) | Episode, Season, Delivery Package |
| Language | mpPlaceholderLanguage | Standard Picklist (Single) | Content Details |
| Languages | mpPlaceholderLanguages | Standard Picklist (Multi)  | n/a | 
| Content Type | mpPlaceholderContentType | Standard Picklist (Single) | Content Details |
| Audio Track Layout | mpPlaceholderTrackType |  Standard Picklist (Single)  | Content Details | 
| Audio Track Content | mpPlaceholderSubTrackType |  Standard Picklist (Single)  | Content Details | 
| Audio Track Channel | mpPlaceholderTrackArrangement |  Standard Picklist (Single)  | Content Details | 
| Content Status | mpPlaceholderContentStatus |  Standard Picklist (Single)  | Content Details | 
| How Many Episodes? | mpPlaceholderNumberOfEpisodes | Number | n/a |


These Metadata Fields MUST be created with exact property/field names, types, picklist values AND IDs listed below.  Display Names can be modified, if desired.

| Display Name | Property/FieldName | Type | Display Name and ID | Notes | 
| :--- | :--- | :--- | :--- | :--- |
| Select Forced Narratives | mpPlaceholderContainsForcedNarrative | Standard Picklist (Single) | <ul><li>None - (id=none)</li> <li>All - (id=all)</li> <li>All Except English - (id=notEnglish)</li></ul> |
| Select Additional Placeholders| mpPlaceholderAdditionalPlaceholders | Standard Picklist (multiple) | <ul><li>Audio master (8ch) -(id=audioMaster)</li> <li>Closed Caption - (id=closedCaption)</li> <li>Dub Card - (id=dubCard)</li> <li>Forced Narrative - (id=forcedNarrative)</li> <li>Poster Art - (id=posterArt)</li> <li>Subtitle - (id=subtitle)</li> <li>Title Card - (id=titleCard)</li> <li>Video Master - (id=videoMaster)</li> <li>Promo10 - (id=promo10)</li> <li>Promo15 (id=promo15)</li> <li>Promo30  - id=promo30)</li></ul> |


#### Create the following Metadata Forms  
*Note:  Display Names can be modified, if desired.

#####Form Name: New Season
| Display Name on Form | Metadata Field Name | Required? |
| :--- | :--- | :--- |
| Series | mpPlaceholderSeries  | required | 
| Season | mpPlaceholderSeason  | required | 
| Provider | mpPlaceholderProvider  | required | 
| Number of Episodes | mpPlaceholderNumberOfEpisodes  | required | 
| Format | mpPlaceholderFormat  | required | 
| Contains Forced Narrative | mpPlaceholderContainsForcedNarrative  | not required | 
| Additional Languages to Prepare | mpPlaceholderLanguages  | not required |   

#####Form Name: New Episode
| Display Label on Form | Metadata Field Name | Required? |
| :--- | :--- | :--- |
| Series | mpPlaceholderSeries  | required | 
| Season | mpPlaceholderSeason  | required | 
| Episode Number | mpPlaceholderEpisodeNumber  | required | 
| Provider | mpPlaceholderProvider  | required | 
| Format | mpPlaceholderFormat  | required | 
| Contains Forced Narrative | mpPlaceholderContainsForcedNarrative  | not required | 
| Additional Languages to Prepare | mpPlaceholderLanguages  | not required |   


#####Form Name: Create Additional Placeholders
| Display Label on Form | Metadata Field Name | Required? |
| :--- | :--- | :--- |
| Additional Placeholders | mpPlaceholderAdditionalPlaceholders  | required | 
| Format | mpPlaceholderFormat  | required | 
| Languages | mpPlaceholderLanguages  | required | 


##Metadata Groups
####Create the following Metadata Groups
<ul>
<li>Series</li>
<li>Season</li>
<li>Episode</li>
</ul>


## Workflow Summary
* Note: Import workflows in the following order

| ID | Name | Description |
| :--- | :--- | :--- |
| 1 |mpPlaceholderCreateDocumentPlaceholders | Subflow that creates a 'Document' Asset Placeholder |
| 2 |mpPlaceholderCreateAudioPlaceholders | Subflow that creates a 'Audio' Asset Placeholder |
| 3 |mpPlaceholderCreateImagePlaceholders | Subflow that creates a 'Image' Asset Placeholder |
| 4 |mpPlaceholderCreateVideoPlaceholders | Subflow that creates a 'Video' Asset Placeholder |
| 5 |mpPlaceholderCreateNewEpisodePlaceholders | An action that is presented on an Episode Collection that will create new placeholder assets for the selected episode.  | (amytodo - had to put before createAdditionalPlaceholders otherwise import failed)
| 6 |mpPlaceholderCreateAdditionalPlaceholders | An action that is presented on a Collection with the 'Episode' Category to create new placeholder assets based on choices made by the user. |
| 7 |mpPlaceholderNewEpisode | The main action that creates all the placeholder assets required for a new episode. |
| 8 |mpPlaceholderNewSeason | The main action that creates all the placeholder assets and collections required for a new season of a specific show. |

## Test it out
###Create New Season

####Steps:
1) From RE Web UI, with no asset selected 
2) From the Action Menu under the Placeholders Group, the "New Season" workflow is listed
3) A modal will appear, Select the "New Season" Metadata form
4) Fill out Metadata form:
    - Series (required)
    - Season (required)
    - Number of Episodes (required)  (enter a number from 1 to 30)
    - Format (required)
    - Provider (required) 
    - Contains Forced Narrative (not required)
    - Languages (not required)
    
5) Click Start

####Test Validation:

For each Episode Number Reach Engine will: 
1) Create an episode Collection (if one doesn't exist already)
2) Collection Name = "{Series Name} +  S+ {Season Name} + E+ {Episode Number}"
3) Set the Episode Collection Metadata:
    - series
    - season
    - episode number
    - provider

4) Set the Series Collection Category = "Episode"
5) Create a Series Collection 
6) Collection Name = "{Series Name}"
7) Set the metadata on the collection 
    - series
    - provider
8) Set the Series Collection Category = "Series"
9) Create a Season Collection 
10) Collection Name = "{Series Name} +  S+{Season Name}"
11) Set Season Collection Metadata:
    - series
    - season
    - provider

12) Set the Season Collection Category = "Season"
 
13) For the given Episode Number, depending on the input sent in on the form, assets will be created and placed in the episode collection that was created.



###Create New Episode
####Steps:
1) From RE Web UI, with no asset selected 
2) From the Action Menu under the Placeholders Group, the "New Episode" workflow is listed
3) A modal will appear, Select the "New Episode" Metadata form
4) Fill out Metadata form:
    - Series (required)
    - Season (required)
    - Episode Number (required)
    - Provider (required) 
    - Format (required)
    - Contains Forced Narrative (not required)
    - Languages (not required)
    - IMDB (not required)
    
5) Click Start

####Test Validation:
Same as Validation noted for New Season, but for a single episode number


###Create Additional Placeholders
####Steps
1) From RE Web UI, with Collection with a Category of "Episode" Selected
2) From the Action Menu, Select the "Create Additional Placeholders" Metadata form
3) A modal will appear, Select the "New Episode" Metadata form
4) Fill out Metadata form:
     - Additional Placeholders (required)
     - Format (required)
     - Languages (not required)
5) Click Start

####Test Validation:

For each Additional Placeholder specificed in form, Reach Engine will: 
1) Create an asset of that type and place it in the selected collection.
