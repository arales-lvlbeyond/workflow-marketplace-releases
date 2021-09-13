# Frame.io to Reach integration

### References
- https://docs.frame.io/docs/welcome

### Workflow steps
- The workflow will:
    - Download all assets in the specified Frame.io Project Folders
        - Specified via comma separated list of Root Asset IDs saved to the property "workflows.pullFromFrameIO.rootAssetIds"
    - Any nested folders will be processed recursively
    - If the Frame.io ID on an incoming asset already exists on a Reach Engine asset then the Reach Engine asset will be versioned with a the new file
    - Upon successful ingest the Frame.io ID will be saved to frameioID metadata field and frameioStatus will be saved as 'Approved'
    - Upon successful ingest the Frame.io Asset will be deleted from the Frame.io Project Folder

### Workflow summary
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [processFrameioAsset](processFrameioAsset.xml) | Subflow to process an individual asset record, performing download, ingest and metadata update |
| 2 | [pullFromFrameIO](pullFromFrameIO.xml) | Subflow to process an individual Root Asset ID, or Folder ID |
| 3 | [pullFromMultipleFrameIOProjects](pullFromMultipleFrameIOProjects.xml) | Parent flow which will read the "workflows.pullFromFrameIO.rootAssetIds" property and delegate a subflow for each ID found. |
| 4 | [frameIOWebhookListener](frameIOWebhookListener.xml) | Listener to standard webhooks or Zapier integration |

##Prerequisites
### Metadata properties

| Name | Type | Notes |
| :--- | :--- | :--- |
| frameioStatus | Picklist (single) | In Review or Approved
| frameioID | Small Text | Corresponds to the ID in Frame.io

### Dynamic properties

| Property | Type | Description |
| :--- | :--- | :--- |
| workflows.pullFromFrameIO.rootAssetIds | String | Comma separated string of Root Asset Ids. Each ID should correspond to a download folder. |
| workflow.frameio.default.categories | String | Comma separated string of category names to be associated with the asset on ingest. |

### Installing

- Specify all desired Root Asset IDs in the property listed
- Log in to Reach Engine as an Administrator
- Create the metadata fields as above
- Import the workflows in the order:
    - processFrameioAssetNonRecursive
    - pullFromFrameIO
    - processFrameioAsset
    - pullFromMultipleFrameIOProjects

## Execution

- Run the workflow: Pull Assets from Specified Frame.IO Projects
- If the Zapier integration is activated, simply right click on an asset in Frame.io and change the status to "Approved"
- Parent workflow requires no selection in the UI and no user input

## License

## Acknowledgments
