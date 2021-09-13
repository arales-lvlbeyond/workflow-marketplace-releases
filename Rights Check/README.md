## Project Title

Simple rights expiration date verification workflow. 

## Description

Generates an email containing a list of assets for which the rights have expired.

## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Check for all expired asset master based on the `rightsEnd` metadata property
    * Send an email in HTML format to the current user with the list of expired assets

### Installing

* Log in to Reach Engine as an Administrator
* Create the metadata properties as described below
* Create the dynamic properties as described below
* Import the workflows in the following order

### Workflow summary
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [rightsCheck.xml](./rightsCheck.xml) | Parent workflow |

### Dynamic properties

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| workflow.reachengine.url | `reachUrl` | - | Reach Engine URL |

### Metadata properties

| Name | Type | Notes |
| :--- | :--- | :--- |
| rightsEnd | Calendar | Asset expiration date |

## Running the tests

* Log in to Reach Engine with your personal credentials
* Make sure **no asset** is selected
* Run the workflow called "_Rights Check_"
* Check your mailbox. The email subject is "_[REACH ENGINE] Your list of expired assets_"
* If you haven't received any email, check the Status tab for more information

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
