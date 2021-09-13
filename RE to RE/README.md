# Ingest and Pair

For clients with multiple instances of Reach Engine.
An Ingest on one system will automatically be ingested on the sibling system, along with proxy content and metadata.

# Description

Reach Engine is a media asset management and dynamic orchestration platform that enables production teams to easily organize, find, share, and produce digital media. The power of Reach Engine lies within its workflows, which enable users to find content with metadata tagging, assign projects, produce packages and distribute finished pieces to multiple channels in an automated fashion.

These workflows enable Reach to automatically ingest assets on sibling Reach systems.

** Curently configured to sync only 2 Reach Engines but scalable to many more.

## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Ingest asset on Reach Engine it is run on
    * Create Placeholder Asset on sibling Reach Engine with corresponding metadata
    * Check if Signiant is configured on system
        * If Configured, sends file to sibling system using Signiant
        * If not configured, sends file to s3 bucket to be pulled from sibling system
    * Replace placeholder asset on sibling system with asset sent from original system

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| marketplace.ingestPair.siblingServer1 | `destinationServer1` | - | Sibling1 Reach name |
| marketplace.ingestPair.siblingAddress1 | `remoteReachEngineAddress1` | - | Sibling1 Reach address |
| marketplace.ingestPair.signiantConfigured | `signiantConfigured` | false | Signiant Configured T/F |
| marketplace.ingestPair.awsTransferBucket | `awsTransferBucket` | - | If using s3 method, s3 bucket to transfer files to |
| marketplace.ingestPair.siblingUsername1 | `siblingReachUser` | - | Username on sibling Reach system (Hidden) |
| marketplace.ingestPair.siblingPassword1 | `siblingReachPw` | - | Password on sibling Reach system (Hidden) |
| marketplace.ingestPair.ingestSubflow | `ingestSubflow` | _anyAssetIngest | Default Ingest workflow |

### Metadata Fields
| Field Name | Type | 
| :--- | :--- | 
| `eTag` | String | 
| `sha1` | String | 

** Metadata fields much match exactly on both systems for metadata to transfer to sibling system

### Installing

* Determine whether you are going to use Signiant or s3 buckets for file transfer between Reach
    * Signiant -- Configure signiantManagerRequest workflows
    * S3 -- Create an s3 bucket with Read & Write permissions for both sibling Reach Engines
* Make sure Workflow Authorization is already configured, as written in first steps
* Add dynamic properties above
* Import workflow on each sibling system in the following order:
    1. existingSha1AssignSubflow
    2. runRemoteWorkflowAndMonitor
    3. createPlaceholder
    4. IF
        a. Signiant -- signiantManagerRequest
    5. updateMediaInfo
    6. queryAssetAndReplace
    7. ingestAndPair

## Running the tests

* In 1st Reach Engine, Select `Ingest and Pair` from the menu
* Select the file you would like to ingest
* Ingest File as Usual
* Check sibling system to make sure placeholder is created
* Once workflow completes, check sibling Reach Engine for matching asset and confirm

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
