# Project Title

Export assets to user selected format and create download link

# Description

Current system actions only allow a user to download the proxy / mezzanine / source format for a given asset. 
This workflow gives users the ability to self-service content from Reach Engine in a different format.

## Getting Started

These instructions will guide you through the installation and testing steps

### Prerequisites

* User can select a single asset, multiple assets or a collection
* Workflow is applicable for video assets only. If a different asset type is part of the selection, it will be excluded from the resulting output file.

### Workflow steps
* The workflow will:
    * Notify the user that the workflow has started (in-app notification)
    * If a non-standard asset contentUse is selected, leverage the default video transcoder to create a new rendition using the selected transcoding template
    * Output the files in a temporary location
    * If a Collection of videos is selected, compress the files in a .zip archive
    * Generate a download link and present it in the Status tab
    * Notify the user that the workflow is complete (in-app notification)

### Workflow summary
| ID | Description |
| :--- | :--- |
| [Export Asset and Download](exportAssetAndDownload.xml) | Parent workflow to export a video asset and create the download link |
| [Export Collection and Download](exportCollectionAndDownload.xml) | Parent workflow for Collections only. Creates a ZIP of the temp directory. |
| [Export Assets](exportAssets.xml) | Subflow to check the file validity and convert the video |

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| temp.export.path | `exportPath` | /reachengine/temp | Temporary path to exported assets |

### Installing

* Log in to Reach Engine as an Administrator
* Import the exportAssets.xml subflow first
* Import the 2 parent workflows next
* (optional) Configure `temp.export.path` in the Dynamic Properties


### Errors and Troubleshooting

* Source content is archived and contentUse SOURCE or OTHER is selected. Restore source content before running this workflow.
* Vantage template is `null` or invalid. Please select a valid Vantage template.
* 404 - File not found. Content to export could not be found on your primary storage system.

## Running the tests

* Select one or multiple assets, or select a project Collection
* From the Action Menu, run the "Export Asset and Download" workflow. If a Collection is selected, run the "Export Collection and Download" workflow.
* Wait for the in-app notification
* Go to the Status tab
* Click on the download icon next to your workflow execution
    * Note: If multiple video files are selected outside of a Collection, one download link per file is displayed

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
