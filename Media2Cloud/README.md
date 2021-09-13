# Project Title

AWS Media2Cloud ("M2C") AI/ML integration

# What is Media2Cloud?

The Media2Cloud solution helps customers streamline, automate, and set up a serverless end-to-end ingest workflow to establish the necessary metadata, proxy video, and image thumbnails to manage large video content, and migrate your video assets and associated metadata to the cloud. The solution leverages the Media Analysis Solution to analyze and extract valuable metadata from your video archives using Amazon Rekognition, Amazon Transcribe, and Amazon Comprehend. Media2Cloud also includes a simple web interface that enables you to immediately start ingesting your archives and extracting metadata.

More information: [AWS Media2Cloud](https://aws.amazon.com/solutions/implementations/media2cloud/)

# Key Benefits

**1. DATA MIGRATION TO THE CLOUD**

Achieve your complex, legacy archive migrations to the cloud without interfering with day-to-day production activity

**2. LEVERAGE AWS MEDIA ANALYSIS SOLUTION**

Serverless, AWS-native AI services to automatically extract valuable metadata from media files

**3. ENRICH CONTENT WITH METADATA**

Create a rich, searchable catalog of content to be shared across your organization and with external partners

**4. PREPARE CONTENT FOR DISTRIBUTION**

Create curated content with Reach Engine Timeline Clips based on the metadata extracted from the AI services

**5. LEVERAGE REACH ENGINE FEATURES**

Leverage the Reach Engine Workflow Engine to archive content to AWS S3 Glacier, export/distribute content to partners and networks and much more...

## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Copy/upload a file to the M2C ingest bucket
    * On an S3 event, a series of Lambda functions will be kicked off
    * AWS will trigger the `m2cIngest.xml` workflow to ingest the source and proxy file and create a timeline with markers and timeline clips

### Workflow summary
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [m2cAssetIngest](./m2cAssetIngest.xml) | Simple copy file to the configured S3 ingest bucket for M2C |
| 2 | [parseRekognitionData](./parseRekognitionData.xml) | Subflow to extract metadata from the output.json file and create markers and timeline clips |
| 3 | [m2cIngest](./m2cIngest.xml) | Parent workflow to ingest and asset, create a timeline and add the VTT file |
| 4 | [resetDemoContent](./resetDemoContent.xml) | (Optional) Standalone workflow to delete all content where `demoTemp = true` |

### Metadata properties

| Name | Type |
| :--- | :--- |
| persons | Picklist (multiple) |
| emotions | Picklist (multiple) |
| keyPhrases | Picklist (multiple) |
| celebrities | Picklist (multiple) |
| labels | Picklist (multiple) |
| locations | Picklist (multiple) |
| demoTemp | Checkbox |

### Dynamic properties

| Property | Type | Description |
| :--- | :--- | :--- |
| metadata.picklist.id.persons | Integer | Metadata property ID `persons` |
| metadata.picklist.id.emotions | Integer | Metadata property ID `emotions` |
| metadata.picklist.id.keyPhrases | Integer | Metadata property ID `keyPhrases` |
| metadata.picklist.id.celebrities | Integer | Metadata property ID `celebrities` |
| metadata.picklist.id.labels | Integer | Metadata property ID `labels` |
| metadata.picklist.id.locations | Integer | Metadata property ID `locations` |
| s3bucket.m2cIngest.name | String | M2C ingest S3 bucket name |
| reachengine.url | String | Reach Engine URL (https://) |
| workflow.api.key | String | Reach Engine API key for System user |

### Installing

* Log in to Reach Engine as an Administrator
* Create the metadata fields as above
* Import the workflows in the order above

## Running the tests

* Run "Media2Cloud Asset Ingest" (m2cAssetIngest.xml)
* Select a file to upload, or a file in a managed repository (on-prem or S3)
* Click on Start

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

