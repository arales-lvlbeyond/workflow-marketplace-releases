# Reach to Frame.io integration

### References
- https://docs.frame.io/docs/uploading-assets
- https://docs.frame.io/docs/managing-version-stacks

### Workflow steps
- The workflow will:
    - Require input from the User
        - Format: Selection of the asset content format to be sent; proxy, mezzanine or source
        - Frame.io Team: Selection of the Frame.io Team that will receive the upload
    - Confirm input is valid and the selected asset content is present
    - Upload asset to Frame.io via HTTP call for Cloud files or Python for on-prem files.
    - Specify the new upload as a Frame.io Asset version if a previous upload (frameioID) exists
    - Save Metadata to the Reach Asset
        - frameioStatus - In Review
        - deliveredToFrameio - True
        - frameioURL 
        - frameIOParentID
        - frameioID
        
### Limitations
- Currently we do not support uploading a single asset to multiple teams.
In order to support this we would need a reliable way to store a frameioID per team.
If an upload is attempted with an asset that is already assigned to a team (via frameIOParentID), if the Frame.io Team selection does not match the existing assigned team, the workflow will fail.
If the user wishes to upload to a new team, the existing values for frameIOParentID and frameioID need to be cleared.

### Workflow summary
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [getUuidForVersioning](getUuidForVersioning.xml) | Subflow to determine the parent container for which the upload should be registered as a version |
| 2 | [sendCloudFileToFrameIO](sendCloudFileToFrameIO.xml) | Subflow for files in Object Store filesystems. Upload via HTTPS call with an authenticated url. |
| 2 | [uploadOnPremFileToFrameIO](uploadOnPremFileToFrameIO.xml) | Subflow for multipart upload of local files to Frame.io |
| 3 | [sendOnPremFileToFrameIO](./sendOnPremFileToFrameIO.xml) | Coming soon |
| 4 | [sendToFrameIO](sendToFrameIO.xml) | Parent flow to collect input and save metadata as a result of upload operations |

##Prerequisites
For On-Prem configurations you will need Python 2.7 installed along with the frameioclient python sdk and the requests package.
### Metadata properties

| Name | Type | Notes |
| :--- | :--- | :--- |
| frameioTeam | Picklist (single) | This needs to be filled out with all valid Frame.io Teams, where the ID corresponds to the upload folder Root Asset ID for the team, without dashes. |
| frameioProject | Picklist (single) | This needs to be filled out with all valid Frame.io Project Inbox, where the ID corresponds to the upload folder Root Asset ID for the team, without dashes. |
| frameioStatus | Picklist (single) | In Review or Approved
| deliveredToFrameio | Picklist (single) | True or False
| frameioURL | Small Text | URL to accessing the Frame.io Asset
| frameIOParentID | Small Text | Root Asset Id where the Asset was uploaded
| frameioID | Small Text | Corresponds to the ID in Frame.io

### Dynamic properties

| Property | Type | Description |
| :--- | :--- | :--- |
| workflow.frameio.bearerToken | String | bearerToken for Frame.io Auth |
| scripts.python.frameio.upload.path | String | Path to the uploadAsset.py script |
| scripts.python.path | String | Path to Python executable |
### Installing

- Log in to Reach Engine as an Administrator
- Create the metadata fields as above
- Fill in values for frameioTeam
- Create and specify values for dynamic properties
- Import the workflows in the order above
- For On-Prem Only:
    - Install Python2.7
    - Place uploadAsset.py in a location on the Reach server (e.g. /reachengine/scripts/python/)
    - python2.7 -m pip install frameioclient
    - python2.7 -m pip install requests
    - Enter dynamic properties for scripts.python.frameio.upload.path and scripts.python.path

## Execution

- Select an asset in the UI to upload
- Fill in required inputs in the resulting modal
- Click Submit

## License

## Acknowledgments
