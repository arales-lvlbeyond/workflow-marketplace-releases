## Project Title

Export an asset to S3 with metadata JSON side-car file

## Description

Normalized cloud export with JSON metadata to facilitate automated external integrations with 3rd party systems.


## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Get asset metadata
    * Combine asset metadata and metadata form
    * Create a metadata JSON side-car file 
    * Copy the [source | mezzanine | proxy] content to an S3 location (UUID)
    * Copy the metadata JSON side-car file to the same S3 location (UUID)
    * Notify on errors

### Installing

* Log in to Reach Engine as an Administrator
* Create the dynamic properties as described below
* Import the workflows in the following order

**Note**: for S3 content, localContext.xml file must be configured with the correct s3mapping  

### Workflow summary
| ID | Name | Description |
| --- | --- | --- |
| 1 | [ingestNormalizeMetadata.xml](./ingestNormalizeMetadata.xml) | Subflow to combine asset metadata and metadata form input |
| 2 | [sendAssetToS3.xml](./sendAssetToS3.xml) | Parent workflow |

### Dynamic properties

| Property | Context Data Def | Default value | Description |
| --- | --- | --- | --- |
| workflows.s3.path | `s3Path` | - | Path to S3 destination. Reach Engine IAM role must have RW permissions. |
| temp.path | `metadataFilePath` | - | Local path for temporary JSON side-car file. Alternatively, contextDataDef can be changed to `#sysconfig('filesystem.root.temp')`. | 

## Running the tests

* Log in to Reach Engine with your personal credentials
* Select an asset (video, audio, image, document)
* Run the workflow called "_Send asset to S3_"
* Enter required values and click **Start**

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
