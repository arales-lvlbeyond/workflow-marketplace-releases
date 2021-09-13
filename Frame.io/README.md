# Project Title

Push video content directly from Reach Engine to Frame.io for sharing and review.
Ingest approved content version from Frame.io to Reach Engine.

# Description

Reach Engine is a media asset management and dynamic orchestration platform that enables production teams to easily organize, find, share, and produce digital media. The power of Reach Engine lies within its workflows, which enable users to find content with metadata tagging, assign projects, produce packages and distribute finished pieces to multiple channels in an automated fashion.

Now Reach can also push video content directly to Frame.io. Workflows can be designed around Frame.io from content sharing, to review and approval processes. Delivering from Reach Engine to a project in Frame.io can now be accomplished out of the box.

# Getting Started

These instructions will guide you through the installation and testing steps

## Installing

1. Log in to Reach Engine as an Administrator
2. Create the [metadata fields](./README.md#metadata-fields) as described below. See the [dynamic properties](./README.md#dynamic-properties) to bring your own metadata fields.
3. Create the [dynamic properties](./README.md#dynamic-properties) as described below
4. Update the `workflow.frameio.bearerToken` dynamic property with the customer Frame.io bearer token
5. Retrieve the Frame.io Teams IDs and update the `frameioTeam` metadata property
6. Create the "Reach Engine Inbox" and "Reach Engine Outbox" Frame.io projects and retrieve the `root_asset_id` for both projects
7. Update the `frameioProject` metadata property with the "Reach Engine Inbox" `root_asset_id`
8. Update the `workflows.pullFromFrameIO.rootAssetIds` dynamic property with the "Reach Engine Outbox" `root_asset_id` 
9. [Import the workflows](./README.md#workflow-summary) in the order described below
10. (Optional) [Configure Webhooks](./README.md#configure-webhooks) for automated ingest on approval as described below
11. For On-Prem Only:
  - Install Python2.7
  - Place uploadAsset.py in a location on the Reach server (e.g. /reachengine/scripts/python/)
  - python2.7 -m pip install frameioclient
  - python2.7 -m pip install requests
  - Enter dynamic properties for `scripts.python.frameio.upload.path` and `scripts.python.path`


## Metadata fields

| Name | Type | Notes |
| :--- | :--- | :--- |
| frameioTeam | Picklist (single) | This needs to be filled out with all valid Frame.io Teams, where the ID corresponds to the `id` for each team, without dashes. [How to get your Frame.io team ID?](https://docs.frame.io/docs/root-asset-ids#2-get-your-team-id) |
| frameioStatus | Picklist (single) | Required items (labels only): ["In Review", "Approved"] |
| deliveredToFrameio | Picklist (single) | Required items (labels only): ["True", "False"] |
| frameioURL | Link | URL to accessing the Frame.io Asset |
| frameIOParentID | Small Text | Root Asset Id where the Asset was uploaded |
| frameioID | Small Text | Corresponds to the ID in Frame.io |
| frameioProject | Picklist (single) | This needs to be filled out with all valid Frame.io Project Inbox, where the ID corresponds to the upload folder Root Asset ID for the team, without dashes. |
| frameioProjectID | Small Text | Corresponds to the project ID in Frame.io |
| frameioComment | Large Text | Text box to save the Frame.io comments upon ingest (comma separated) |

## Dynamic properties

| Property | Type | Required (y/n) | Description |
| :--- | :--- | :--- | :--- |
| workflow.frameio.bearerToken | String | Y | bearerToken for Frame.io Auth |
| workflows.pullFromFrameIO.rootAssetIds | String | Y | Comma separated string of Root Asset Ids. Each ID should correspond to the `root_asset_id` of the "Outbox" projects. [How to get your Frame.io project root_asset_id?](https://docs.frame.io/docs/root-asset-ids#3-get-the-root-asset-id-for-your-projects) |
| scripts.python.frameio.upload.path | String | N | Path to the uploadAsset.py script (only for on-premise storage) |
| scripts.python.path | String | N | Path to Python executable (only for on-premise storage) |
| workflow.field.names.frameioComment | String | N | Bring your own (Frame.io) "Comment" metadata field (default: frameioComment) |
| workflow.field.names.frameioStatus | String | N | Bring your own "Frame.io Status" metadata field (see `frameioStatus` above for default values) |
| workflow.field.names.deliveredToFrameio | String | N | Bring your own "Delivered to Frame.io?" metadata field (see `deliveredToFrameio` above for default values |
| workflows.frameio.pagesize | String | N | Number of items per Frame.io page on retrieval (default: 20) |
| workflows.default.sourceIngest.versionDuplicate | Boolean | N | Check for duplicate asset on ingest (default: false) |
| workflows.default.ingestAssetWorkflow | String | N | Default Reach Engine ingest workflow (default: _anyAssetIngest) |
| workflows.frameIO.collection.subflowLimit | String | N | Number of concurrent subflows when uploading a Collection to Frame.io (default: 10) |
| workflow.frameio.default.categories | String | N | Comma separated list of category names to be applied automatically to ingested assets on approval |
| workflow.frameio.project.name | String | N | Collection metadata field to be mapped to the Frame.io project name (default: name) |
| workflow.frameio.getComments | Boolean | N | Option to retrieve the comments automatically upon ingest (default: false) |


## Workflow summary

### Create Frame.io Project Collection
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [getAccountId](./Frame.io%20Projects/getAccountId.xml) | Subflow to retrieve the Frame.io account ID for a given organization (based on API Bearer token) |
| 2 | [getOrCreateProject](./Frame.io%20Projects/getOrCreateProject.xml) | Subflow to retrieve or create a Frame.io project based on the Reach Engine Collection |
| 3 | [getFrameioProjectUrl](./Frame.io%20Projects/getFrameioProjectUrl.xml) | Subflow to retrieve the Frame.io project URL and map it to the Collection |
| 4 | [createFrameIOProject](./Frame.io%20Projects/createFrameIOProject.xml) | Workflow to create the Frame.io project based on user input. Can be used as a parent workflow, or a subflow of `createProjectCollection` |
| 5 | [createProjectCollection](./Frame.io%20Projects/createProjectCollection.xml) | Parent flow to create a Collection and map it to a new or existing Frame.io project |
| 6 | [createFrameIOProjectFromCollection](./Frame.io%20Projects/createFrameIOProjectFromCollection.xml) | Parent flow to create a Frame.io Project based on an existing, un-mapped, Reach Engine Collection |

### Reach Engine to Frame.io
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [getUuidForVersioning](./ReachToFrame.io/getUuidForVersioning.xml) | Subflow to determine the parent container for which the upload should be registered as a version |
| 2 | [sendCloudFileToFrameIO](./ReachToFrame.io/sendCloudFileToFrameIO.xml) | Subflow for files in Object Store filesystems. Upload via HTTPS call with an authenticated url. |
| 3 | [uploadOnPremFileToFrameIO](./ReachToFrame.io/uploadOnPremFileToFrameIO.xml) | Subflow for multipart upload of local files to Frame.io |
| 4 | [sendOnPremFileToFrameIO](./ReachToFrame.io/sendOnPremFileToFrameIO.xml) | Coming soon |
| 5 | [sendToFrameIO](./ReachToFrame.io/sendToFrameIO.xml) | Parent flow to collect input and save metadata as a result of upload operations |
| 6 | [sendCollectionToFrameIO](./ReachToFrame.io/sendCollectionToFrameIO) | Parent flow to send the Collection content to Frame.io in bulk | 

### Frame.io to Reach Engine
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [processFrameioAssetNonRecursive](./Frame.ioToReach/processFrameioAssetNonRecursive.xml) | Subflow to process an individual asset record, performing download, ingest and metadata update |
| 2 | [pullFromFrameIO](./Frame.ioToReach/pullFromFrameIO.xml) | Subflow to process an individual Root Asset ID, or Folder ID |
| 3 | [getFrameioComments](./Frame.ioToReach/getFrameioComments.xml) | Subflow to retrieve Frame.io comments for the processed asset |
| 4 | [processFrameioAsset](./Frame.ioToReach/processFrameioAsset.xml) | Subflow to process an individual asset record, performing download, ingest and metadata update |
| 5 | [pullFromMultipleFrameIOProjects](./Frame.ioToReach/pullFromMultipleFrameIOProjects.xml) | Parent flow which will read the "workflows.pullFromFrameIO.rootAssetIds" property and delegate a subflow for each ID found. |

## Webhook Listeners
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [updateFrameIOCollection](./Webhook%20Listeners/updateFrameIOCollection.xml) | Subflow to update the Collection metadata on Frame.io project deletion |
| 2 | [updateFrameIOAsset](./Webhook%20Listeners/updateFrameIOAsset.xml) | Subflow to update the Asset metadata on Frame.io asset deletion |
| 3 | [updateFrameIOAssetStatus](./Webhook%20Listeners/updateFrameIOAssetStatus.xml) | Subflow to process the Frame.io asset on approval (asset label update) | 
| 4 | [frameIOWebhookListener](./Webhook%20Listeners/frameIOWebhookListener.xml) | Parent flow to start the `processFrameioAsset` workflow based on external API request (webhooks) |

## Configure Webhooks
"Webhooks provide a way to leverage events that occur inside of Frame.io into notifications that can be sent to external systems for processing, API callback, and ultimately, workflow automation." - [Frame.io Documentation](https://docs.frame.io/docs/webhooks)

Frame.io Webhooks can be leveraged in Reach Engine to trigger events such as: ingest an asset on approval, update metadata ("Frame.io Status") on status change, unlink a Reach Engine asset or collection on project or asset deletion in Frame.io, etc...

Reach Engine does not support Webhook events natively. Instead, we recommend to use a 3rd party application such as Zapier to receive the Webhook event and trigger a Reach Engine workflow (with original payload). Below is an example of configuration using Zapier. For other configurations such as AWS API Gateway, please contact your Levels Beyond technical representative.

### Zapier Configuration
1. Create a new Zap:
  - Choose app: Webhook by Zapier
  - Choose Trigger Event: Catch Hook
2. Click on Continue and add a step:
  - Choose app: Webhook by Zapier
  - Choose Trigger Event: POST
  - URL: https://<reachengine_url>/reachengine/api/workflows/frameIOWebhookListener/start
  - Payload Type: Json
  - Headers > Content-Type: application/json
  - Headers > apiKey: <api_key> (contact your Reach Engine support representative)
3. Test and save your Zap
4. Copy the Custom Webhook URL
5. Create a new webhook in Frame.io
6. Enter the copied webhook URL
7. Select the following Events:
  - Project: Deleted
  - Asset: Deleted
  - Asset Labels: Updated
8. Click create


### AWS API Gateway Configuration
Documentation for internal purposes only. Please contact your Levels Beyond representative for more information.
[https://levelsbeyond.atlassian.net/wiki/spaces/OPS/pages/1318780929/How+to+create+a+Webhook+in+AWS](https://levelsbeyond.atlassian.net/wiki/spaces/OPS/pages/1318780929/How+to+create+a+Webhook+in+AWS)

# External Links
* Frame.io developer tools (API token and Webhooks): [https://developer.frame.io/](https://developer.frame.io/)
* Frame.io documentation: [https://docs.frame.io/docs](https://docs.frame.io/docs)
* Frame.io API reference: [https://docs.frame.io/reference](https://docs.frame.io/reference)

# Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

# License

# Acknowledgments
