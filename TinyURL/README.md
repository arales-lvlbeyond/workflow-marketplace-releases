# Project Title

Creates a short URL for the selected asset using the tinyurl.com service

# Description

For users who need an elegant HTTP link to be shared internally or with external systems when readability and number of characters is an issue.


## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Create a percent-encoded URL of the Reach Engine asset URL
    * Send the encoded URL to tinyurl.com via an API POST command
    * Save the link (payload response) to the asset as a metadata field
    * Notify the user in case of success of failure (via the Status tab) of the workflow

### Workflow summary
| ID | Description |
| :--- | :--- |
| [createTinyUrl](./createTinyUrl.xml) | Main workflow for the asset master |
| [createTinyUrlCollections](./createTinyUrlCollections.xml) | Same workflow for Collections only |
| [createTinyUrlTimeline](./createTinyUrlTimeline.xml) | Same workflow for Timelines only |
| [createTinyUrlVideoClip](./createTinyUrlVideoClips.xml) | Same workflow for Video Clips only |

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| workflow.reach.url | `reachUrl` | - | Reach Engine URL |

### Installing

* Log in to Reach Engine as an Administrator
* Create the _shortURL_ metadata field as follow
```
Display Name: shortURL
Type: Link
Show in inspector: Yes 
```
* Import the createTinyUrl.xml workflows in no particular order

## Running the tests

* Select an asset
* From the Action Menu, select the "Create Tiny URL" workflow
* Wait for the in-app notification
* Refresh the page

## Versioning

## Authors

* **Nicolas Lemoine** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

