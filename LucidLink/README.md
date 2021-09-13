# Project Title

MarketPlace: Reach Engine and LucidLink Integration

# Description
This integration between Reach Engine and LucidLink will allow the quick and easy 
sharing and unsharing of assets between Reach Engine and a desktop folder using LucidLink 
technology.  This asset sharing can be set to automatically expire after a set
period of time, reducing expenses.

## Prerequisites
A checkbox list of all requirements that must be satisfied prior to installation of the set of workflows

* [ ] Lucid Link must be installed and configured 
* [ ] A directory folder (on prem or cloud), where files will be shared via Lucid Link, must be created and mounted on all Reach engine Servers (front end and workflow runtime/s)
* [ ] In Reach, create a Storage Directory that points to the Lucid Link directory folder (created above) path location where the assets will be shared. See **Directories** section below.
* [ ] Set the 'marketplace.lucidlink.basepath' dynamic property with the location of the directory created above. See **Dynamic Properties** section below. 
* [ ] Create the necessary Reach Path Mapping for Lucid Link. See **Path Mapping** section below.
 

## Installation
1. Create all metadata fields in **Metadata Fields** section below.
2. Configure all required dyanamic properties listed in **Dynamic Properties** section below. 
3. Configure a Reach Engine Lucid Link Directory as listed in **Directories** section.
4. Configure a Reach Engine Path Mapping as listed in **Path Mapping** section.
5. Import all workflows in the correct import order as specified in the **Workflow Import Order** section
6. Run the tests below and validate everything is working as expected


## Metadata fields
| id | Type | Description |
| :--- | :--- | :--- |
| lucidLinkExpiration | date | Number of days the asset share stays active before expiring (no longer shared) |
| lucidLinkPath | date | Path to the folder for which the assets will be placed for sharing via Lucid Link |


## Dynamic properties
| Property | Required (y/n) | Description | Default |
| :--- | :--- | :--- | :--- |
| `marketplace.lucidlink.expirationDays` | N | Sets the expiration date for which the asset sharing will expire | 7 days
| `marketplace.lucidlink.basepath` | Y | File location for which the assets will be placed for sharing via Lucide Link | root.filesystem.lucidlink | 
| `marketplace.lucidlink.lucidLinkPathMapName` | N | The name used for the path mapping set up in Reach for Lucid Link | LucidLink | 
| `lucidLink.maxFileExecutions` | N | Max number of sublows that will run at a time to delete a shared file.   | 10 days
| `lucidLink.maxCronExpiredAssetCount` | N | Max number of assets the search will return when retrieving the expired assets from the Reach Database  | 100


## Directories
Create a Reach Engine Storage directory that points to the directory you created that will be used for Reach to share files via Lucid Link. 
Depending on your env, this directory will be created as either a local or AWS directory.

| Name | File System | Path | Description |
| :--- | :--- | :--- | :--- |
| `lucidlink` | LOCAL | `/path/to/directory` | If using on prem for Lucid Link Sharing - Create a local directory for lucid link that maps to the directory folder you created for Lucid Link |
| `lucidlink` | AWS | `bucketName:path/to/directory` |  If using AWS for Lucid Link Sharing - Create an AWS directory for lucid link that maps to the bucket directory you created for Lucid Link |

Examples of a storage Directory for both Local and AWS :

| Name | File System | Path | Description |
| :--- | :--- | :--- | :--- |
| `lucidlink` | LOCAL | `/mnt/lucid` | example Local directory path  |
| `lucidlink` | AWS | `S3:lucid` |  example S3 directory path |


## Create Reach Path Mappings
Follow the steps below to create the necessary Reach Engine Path Mapping for Lucid Link.

Steps:
1. Name = 'LucidLink' - (this is the recommended name, but can be whatever you choose so long as you set the dynamic property, 'marketplace.lucidlink.lucidLinkPathMapName', with the name you've chosen.)
2. Local Separator = '/' - (This is the file path location separator for the Lucid Link path location.  This value will depend on your specific path, for example a local path is usually = '/' and an AWS bucket location = ':')
3. Remote Separator = '/' - (Again, as above, this is the file path location separator for the Lucid Link path location.)  

4. Add a "Path Mapping Entry" that will map the Reach Engine Media file path prefix TO the Lucid Link file path prefix: 
   (Note: Actual Values and path formatting you'll use for this step below will match the customer's specific name, setup and whether it's cloud or on prem. Values below are sample values.)

    Example Values for this Path Mapping Entry for AWS Stored Reach Media Content:
    * Local Path Prefix =  's3:customer-reach-repo:'  - (this is the Path Location Prefix to Reach Engine Media Content)
    * Remote Path Prefix =  '/mnt/lucid/customer_media/' - (this is the Path Location Prefix to Content being shared via Lucid Link)
    
    Example Values for this Path Mapping Entry for Local Stored Reach Media Content:
    * Local Path Prefix =  '/reachengine/media'  - (this is the Path Location Prefix to Reach Engine Media Content)
    * Remote Path Prefix =  '/mnt/lucid/customer_media' - (this is the Path Location Prefix to Content being shared via Lucid Link)
 
5. Next, add another "Path Mapping Entry" to allow Reach Engine to access the Customer's Directory on Mac:

    Example Values for this Path Mapping Entry:
    * Local Path Prefix =  '/mnt/lucid/customer_media'  - (this is the Path Location Prefix for Lucid Link Shared files.)
    * Remote Path Prefix =  '/Volumes/customer'  -  (this is the Customer's Directory Location Prefix on Mac)
 

## Workflow summary
| ID |  Subflows | Shown in UI | Description |
| :--- | :--- | :--- | :--- |
| [exportToLucidLink](./LucidLink/exportToLucidLink) | - | false | Subflow to export files out of Reach to be shared via Lucid Link |
| [exportToLucidLinkAssetMaster](./LucidLink/exportToLucidLinkAssetMaster) | exportToLucidLink  | true | Parent Workflow to export a selected Asset's content file via Lucid Link |
| [exportCollectionToLucidLink](./LucidLink/exportCollectionToLucidLink) | exportToLucidLink | true | Parent Workflow to export a selected Collections Asset's content files via Lucid Link  |
| [exportToLucidLinkClip](./LucidLink/exportToLucidLinkClip) | exportToLucidLink | true | Parent Workflow to export a selected Clip's content file via Lucid Link  |
| [getAssetsByRQL](./LucidLink/getAssetsByRQL) | - | false | Sublow to retrieve expired Lucid Link shared Assets from the Reach database |
| [cleanEmptyDirectoryTree](./LucidLink/cleanEmptyDirectoryTree) | -| false | Subflow to delete an empty directory after cleanup of expired shared files |
| [expireLucidLink](./LucidLink/expireLucidLink) | cleanEmptyDirectoryTree | false | Subflow to delete a file so it is no longer shared with Lucid Link |
| [expireLucidLinkAssetMaster](./LucidLink/expireLucidLinkAssetMaster) | expireLucidLink  | false | Workflow to manually delete a specific Asset from being shared via Lucid Link.  |
| [expireCollectionLucidLink](./LucidLink/expireCollectionLucidLink) | exportToLucidLink  | true | Workflow to manually delete all Assets within a Collection from being shared via Lucid Link.  |
| [expireLucidLinkClip](./LucidLink/expireLucidLinkClip) | expireLucidLink | true | Workflow to manually delete a specific Clip from being shared via Lucid Link.   |
| [cleanExpiredLucidLinkExports](./LucidLink/cleanExpiredLucidLinkExports) | getAssetsByRQL, expireLucidLink | true | Workflow that can be run manually (or via Cron) to delete any files that are expired from being shared via Lucid Link. |
| ... | ... | ... | ... |


## Workflow Import Order
Import order of all workflows in top-down order to import. 
can use the following script to auto import workflows in a specified directory: [Import Workflows Script](https://github.com/levelsbeyond/workflow-development/tree/master/scripts/importWorkflows)
1. `exportToLucidLink`
2. `exportToLucidLinkAssetMaster`
3. `exportCollectionToLucidLink`
4. `exportToLucidLinkClip`
5. `getAssetsByRQL`
6. `cleanEmptyDirectoryTree`
7. `expireLucidLink`
8. `expireLucidLinkAssetMaster`
9. `expireCollectionLucidLink` 
10. `expireLucidLinkClip` 
11. `cleanExpiredLucidLinkExports` 


## Steps to Test Workflows:

All **Prerequisites** and workflows should be completely installed as directed in the **Installation** section must be complete.

### Lucid Link - Export File
1. Select a target asset in the Reach UI 
2. From the "Lucid Link Group" Select the "Export File"
3. Enter the prompted inputs:
    * `Choose File to Sent` : Select which content type to send for the file (e.g Source, Mezz, Proxy)
4. Validate the file you chose to export is now in the Lucid Link file path location.
5. End

** NOTE: You can repeat test steps above for a selected Clip or Collection of Assets, by using their specific Export to Lucid Link Workflows.  For a Collection, all assets within collection will be shared via lucid link.  


### Lucid Link - Expire File 
1. Select a target asset in the Reach UI 
2. From the "Lucid Link Group" Select the "Expire file"
3. Workflow does not have any inputs and will run upon selecting it
4. Validate the file you chose to Expire has been deleted from its Lucid Link Sharing folder.
5. End

** NOTE: Again, you can repeat test steps above for a selected Clip or Collection of Assets by using their specific Expire Workflow under the Lucid Link Group. The associated clip or collection's assets will be deleted.  
