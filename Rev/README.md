# Project Title
MarketPlace: Reach Engine and Rev.com Closed Captioning Integration

# Description
This integration between Reach Engine and Rev.com will enable a user, via the RE Web UI, to send an asset to Rev.com for closed captioning formatting. 
Once Rev.com has completed the order, a user can retrieve, using the RE Web UI, the closed caption file/s from Rev.com and automatically ingest them into Reach Engine.

#Environment 
* At this time, this integration supports only AWS Cloud environment with S3 proxies created.
* Supports Reach Engine 2.3+


## Getting Started
The instructions below will guide you through the installation and testing steps

### Installing
* Log into Reach Engine as an Administrator
* Create the metadata fields as described below
* Create the dynamic properties as described below
* Import the workflows in the order described below

### Metadata fields
| Name | Type | Notes |
| :--- | :--- | :--- |
| `mpRevOrderUrl` | Link | URL to Rev.com order | 
| `mpRevOrderNumber` | Text(Small) | Rev.com order number |
| `mpRevOrderStatus` | Picklist (Single) | Rev.com order status. Minimum required values are ["Order Placed - Pending", "Order Complete"] 
| `mpRevCaptionFormats` | Picklist (Multiple) | **Current Caption Formats offered by Rev.com** include: [SubRip,Scc,Mcc,Ttml,QTtext,Transcript,WebVtt,Dfxp,CheetahCap,Stl,AvidDs,AvidDvd,FacebookSubRip]  **See**: https://www.rev.com/api/orderspostcaption for any updates. **Default values** - [SubRip, Dfxp], if none specified.  

### Required Dynamic properties
| Property | Default value | Description |
| :--- | :--- | :--- |
| marketplace.rev.clientApiKey | - | Rev.com client API key |
| marketplace.rev.userApiKey | - | Rev.com user API key |
| marketplace.rev.revUrl | - | Rev.com API URL |
| marketplace.rev.captionAsset.expireTime | - | Length of time (in ms) before the signed url for sent to rev will expire. Default is 3 days| 
| system.curlExecutablePath | - | Required only if Executable path for curl is not located in /usr/bin/curl |


### Optional Dynamic properties  
#####Note: defalut values can be replaced with customer specific values.
| Property | Default value | Description |
| :--- | :--- | :--- |
| marketplace.rev.mpRevIngestOrderCaptionFile.ingestSubflowId |_anyAssetIngest| asset ingest workflow id | 
| marketplace.rev.synchronizeCaptionOrders.queryLimit | 200 | Maximum number of items to include in the Rev.com query |
| marketplace.rev.synchronizeCaptionOrders.batchSize | 4 | Number of assets to process in a batch |
| marketplace.rev.synchronizeCaptionOrders.queuePollInterval | 15 | Delay in seconds between each batch processing |
| marketplace.rev.synchronizeCaptionOrders.queueLimit | 10 | Limit the number of subflows in the queue |


### Workflow summary
| # | ID | Description | 
| :--- | :--- | :--- |
| 1 | [getAssetsByRQL](./getAssetsByRQL.xml) | Subflow to query for all assets to process via RQL search |
| 2 | [mpRevCaptionAsset](./mpRevCaptionAsset.xml) |  Workflow to submit a Rev.com closed caption order for single asset |
| 3 | [mpRevIngestOrderCaptionFile](./mpRevIngestOrderCaptionFile.xml) | Ingest caption files downloaded from Rev.com |
| 4 | [mpRevSynchronizeCaptionOrder](./mpRevSynchronizeCaptionOrder.xml) | Subflow to synchronize caption files for a single asset between Reach and Rev.com |
| 5 | [mpRevSynchronizeCaptionOrders](./mpRevSynchronizeCaptionOrders.xml) | Parent workflow to synchronize all asset caption orders between Reach and Rev.com |

### Workflow steps
**Submit a Rev.com Caption Order**

* The workflow will:
    * Generate a pre-signed URL of the selected Asset's proxy content with an expiration time of 3 days
    * Submit a new Rev.com HTTP POST caption order for the requested caption formats.        
       
* On successful submission to Rev.com, the workflow will:
    * Parse the response header and retrieve the rev order number associated with the Rev.com order
    * Save the Rev Order Number to the selected asset as metadata **(mpRevOrderNumber)**
    * Save the Rev.com orderUrl (link) to the selected asset as metadata **(mpRevOrderUrl)**
    * Update the “Rev.com Status” metadata field **(mpRevOrderStatus)** on the selected asset to **“Order Placed - Pending”**
* Reach Engine will present a visual feedback (log) of your workflow via the Status tab
* Reach Engine will present a visual notification bubble that Rev.com order was submitted successfully

**Retrieve Rev.com Completed Caption Orders**

* The workflow will:
    * Ensure that a previous execution of the workflow is not already running
    * Query all assets that have a “Rev.com Status” metadata value equals to **“Order Placed - Pending”**
    * For each returned asset, retrieve the associated Rev.com mpRevOrderNumber metadata value
    * Using the mpRevOrderNumber, check if the corresponding Rev.com order is “Complete”
        - If the order status is different than “Complete” end the subflow gracefully
        - Present a visual feedback (log) via the workflow Status tab that Asset's order is not yet complete.
    * If an asset's Rev.com order is complete:
        - Download all corresponding Closed Caption files from Rev.com
        - Ingest each caption file using the "mpRevIngestCaptionFile" subflow.
        
        Upon ingest:
        - The closed caption file will be associated to the parent asset's Collections/s 
        - The categories from the parent asset will be applied as categoires to the caption asset
        - The caption asset will have the following Rev metadata applied to it - mpRevOrderNumber, mpRevOrderUrl, mpRevCaptionFormats
        - Update the “Rev.com Status” metadata field on parent asset will be updated to “Order Complete”
    * Reach Engine will present a visual feedback (log) of your workflow via the Status tab

**Retrieve Rev.com Completed Caption Order**
* This workflow will perform similar to the workflow for retrieving multiple caption orders, however, it will only process the rev order number found for the selected asset.
  

## Running the tests
1) Select an asset
2) On the Metadata form, select the desired Closed Caption Formats
3) Set if order should be "Rushed" or not
4) Run the "Submit a Rev.com Caption Order" workflow and monitor the workflow's execution status in the Status UI

5) Validate the following:
    * Notification was given that Rev.com order was submitted successfully 
    * Workflow status bar indicates workflow ran successfully  

    * The following is saved as metadata on the selected asset:
    * **mpRevCaptionFormats** - the caption formats that were selected on the metadata form when submitting the order. 
    * **mpRevOrderNumber** -  the new rev.com order is saved on the asset as metadata  
    * **mpRevOrderStatus** - status of the Rev.com order is set to "Order Placed - Pending"
    * **mpRevOrderUrl** - the url to the rev.com order is saved on the asset


### Check Rev.com for single Completed Order
1) Select an asset with its **mpRevOrderStatus** marked as "Order Placed - Pending"
2) Run the "Check Rev.com for Completed Caption Order" workflow and monitor the workflow's execution status in the Status UI.

3) Validate the following: 
    * **If the REv.com caption order is still in progress:**
        * The workflow should complete but will notify the user via the **Worflow Status UI** page that the order is not yet complete
     
    * **If the job is Rev.com Caption Order is complete:**
    
        * The selected asset's metadata field value for **mpRevOrderStatus** was updated to "Order Complete" 
        * A caption asset was created for each caption format that selected and submited with the order. See "Caption Formats" metadata value on parent asset for all selected formats that were set for order.
        
        Validate for each caption file that was ingested into Reach:
        * Caption file has been associated to the same collection/s as the selected/parent asset.
        * Caption file has inherited the Categories from the selected/parent asset.  
        * The following metadata has been saved to the caption file: 
            * **mpRevOrderUrl** for the rev.com order is saved on the caption asset as metadata
            * **mpRevOrderUrl** for the rev.com order is saved on the caption asset as metadata
            * **mpRevCaptionFormats** the captions formats that were submitted to rev to be created for this order 

### Check Rev.com for all Completed Orders, regardless of asset
1) Make sure no assets in the UI are selected.
2) Run the "Check Rev.com for Completed Caption Orders" workflow and monitor the workflows execution status in the Status UI.
3) For each asset picked up by the workflow with it's **mpRevOrderStatus** value set to "Order Placed - Pending", validate the same items as indicated in the steps to test for the "Check Rev.com for Completed Caption Order" workflow.

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments
