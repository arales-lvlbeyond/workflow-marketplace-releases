## Project Title

Automatic timeline creation for video asset master

## Description

Create a Reach Engine Timeline in 1-click for your video assets. Can be used in conjuction with any notification workflow (send via email, Slack, etc) for a simple review & approve process. 

Additionally, this workflow can be used as a (subflow) step to create a Timeline on ingest.


## Getting Started

These instructions will guide you through the installation and testing steps

### Description
* The workflow will:
    * Check for boolean `createTimeline` (default: true)
    * Retrieve video asset metadata, categories and collections
    * Create an SMPTE timeline asset
    * Add video asset to the timeline
    * Associate metadata, categories and collections to the timeline asset
    
**Note:** This workflow can be called from a parent workflow and will return the `timeline` data object as a resultDataDef

### Installing

* Log in to Reach Engine as an Administrator
* Import the workflow in the following order

### Workflow summary
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [createTimeline.xml](./createTimeline.xml) | Main workflow |

## Running the tests

* Log in to Reach Engine with your personal credentials
* Select a video asset
* Run the workflow called "_Create Timeline_"

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
