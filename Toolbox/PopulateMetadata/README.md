# Create Metadata Fields From CSV
Id: createMetadataFieldsFromCSV

## Workflow Summary:
This workflow will auto create metadata fields on the Reach Engine system it is run on using a given CSV with all entries of metadata fields to create and their information required to be able to utilize Reach Engine's API to create the field.

## Client specific customizations
* N/A

## Pre-requisites:
* The properties listed in the **Required Properties** section have been configured as dynamic properties 
* All subflows listed in **Subflows** section must be imported prior to this parent workflow. 
* Workflows must be able to successfully send requests to Reach Engine API.
* Must configure workflow license validation

## Getting Started

## Expected Inputs / Outputs
* Inputs:
    * A csv that matches format shown in the **MetadataTemplate.csv** file provided in `/resources`.
    
* Outputs:
    * The workflow will create metadata fields for each entry row in the given csv. 
    * If the field to create is a **picklist** (type == 'lookup''), and there is a list of of picklist items (separated by commas) to add in it's respective "picklistItems" column, each picklist item will be added to the picklist.

## Steps to Test:
1) Run workflow with a test and input a csv with a set of metadata fields to create.
2) If none of the fields in the csv existed prior to running the workflow, validate the given expected outputs above and verify they have been created in the Admin UI page. 
3) If any of the fields already exist and the `workflow.createMetadataField.createDuplicate` is set to `false`, validate no duplicate metadata fields have been created.
   * If `workflow.createMetadataField.createDuplicate` is set to `true`: validate a duplicate field name with the same id + the_number_of_copy is created (e.g. someDuplicateField1, someDuplicateField2, etc.)

## Required Metadata Fields:
* N/A

# Required Properties:
* workflow.createMetadataField.createDuplicate (defaults to false)
* workflow.reachUrl
    * url to access Reach UI
* workflow.apiKey
    * Generated apiKey for a reach admin user capable of making requests to Reach Engine's API. Can generate one by visiting: `{reach_url}/apikey.html`
    
## Subflows (in import order):
1. addItemToPicklist
2. createMetadataField
