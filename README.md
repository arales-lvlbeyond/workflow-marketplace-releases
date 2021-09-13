# workflow-marketplace
Best-practice workflows and connectors.

## Guidelines
1. No customer/client specific information is contained in any workflow. The workflow must use generic metadata field names, etc.
2. Every workflow must have it's own readme per the template below
3. Every marketplace workflow should log how many times it was run on the system.
4. Don't forget to have a good time.


# README template

# Project Title
These instructions will guide you through the installation and testing steps

## Description
A clear description of the general process of the workflow or set of workflows and a summary of the business process it aims to solve or simplify.
 
## Prerequisites
A checkbox list of all requirements that must be satisfied prior to installation of the set of workflows

* [ ] requirement 1
* [ ] requirement 2
* [ ] ...

## Installation
1. Create all metadata fields in **Metadata Fields** section below.
2. Configure all required dyanamic properties listed in **Dynamic Properties** section below. 
3. Configure all Directories listed in **Directories** section.
4. Import all workflows in the correct import order as specified in the **Workflow Import Order** section
5. ...


## Metadata fields
| id | Type | Description |
| :--- | :--- | :--- |
| fieldId1 | text-small | description 1 |
| fieldId2 | text-large | description 2 |
| fieldId3 | number | description 3 |
| fieldId4 | calendar | description 4 |
| fieldId5 | picklist-single | description 5 |
| fieldId6 | picklist-multiple | description 6 |
| fieldId7 | link | description 7 |

## Dynamic properties
| Property | Required (y/n) | Description |
| :--- | :--- | :--- |
| `dynamicPropertyName1` | Y | description 1 |
| `dynamicPropertyName2` | Y | description 2 |
| ... | ... | ... |

## Directories
| Name | File System | Path | Description |
| :--- | :--- | :--- | :--- |
| `localDirectoryName` | LOCAL | `/path/to/directory` | description |
| `s3DirectoryName` | AWS | `bucketName:path/to/directory` | description |

## Path Mappings
| Name | Local Separator | Remote Separator | Local Prefix | Remote Prefix |
| :--- | :--- | :--- | :--- | :--- |
| `pathMapping1` | `/` | `/` | EXAMPLE: `/reachengine/media` | EXAMPLE: `/mnt/stornext/reachengine` | 


## Workflow summary
| ID |  Subflows | Shown in UI | Description |
| :--- | :--- | :--- | :--- |
| [workflowId1](./path/to/workflowId1.xml) | `workflowIdSubflowId1` <br> `workflowSubflowId2` | true | description |
| [workflowIdSubflowId1](./path/to/workflowIdSubflowId1.xml) | - | false | description |
| [workflowIdSubflowId2](./path/to/workflowIdSubflowId2.xml) | - | false | description |
| ... | ... | ... | ... |

## Workflow Import Order
Import order of all workflows in top-down order to import. 
can use the following script to auto import workflows in a specified directory: [Import Workflows Script](https://github.com/levelsbeyond/workflow-development/tree/master/scripts/importWorkflows)

1. `workflowSubflowId2`
2. `workflowSubflowId1`
3. `workflowId1`
4. `...`

## Steps to Test Workflows:

All **Prerequisites** and workflows should be completely installed as directed in the **Installation** section must be complete.

### Name of `workflowId1`
1. Select a target asset in UI and enter the prompted inputs:
    * `input1` : description of input
    * `input2` : description of input
2. Validate AC 1
2. Validate AC 2
2. Validate ...
3. End
