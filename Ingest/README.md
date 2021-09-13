# Project Title

Ingest S3 Objects with Metadata from a CSV Index File

## Getting Started 

These instructions will guide you through the installation and testing steps for your purchased workflow

### Workflow steps
* The workflow will:
    * Prompt the user for a CSV file
    * Convert the CSV to JSON
    * Ingest each file in the CSV along with the corresponding metadata

### Dynamic properties used for Workflow

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| workflow.s3.ingest.queueLimit | `queueLimit` | 51 | - |
| workflow.s3.ingest.batchSize | `batchSize` | 25 | - |
| workflow.s3.ingest.pollInterval | `queryPollInterval` | 5 | - |


### Installing 
* Import the csvIngest.xml workflow

## Running the tests

* Ensure the necessary metadata fields and metadata picklist options exist in Reach Engine (ids must match those in the CSV exactly)
* Make sure no asset is selected
* From the Action Menu, select the "CSV Ingest" workflow
* Select a viable CSV file (ensure the CSV is structured exactly per the provided csvIngestIndexFile.csv)
* Run the Workflow

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

