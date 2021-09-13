# Send Video to FTP site

### Objective:
This workflow intends to take a video (VideoAssetMaster) that a user selects and send it to the FTP location.

### Appropriate Use Case:
This workfow is appropriate when a user wants to send an entire video content to ftp website. VideoClips, Timelines, and TimelineClips are not addressed with this workflow.

### Workflow Limitations:
1. This workflow does not instruct ftp website to ingest the content supplied at the FTP location.
2. This workflow assumes the destination location is monitored by some automation to trigger ingestion.
3. This workflow does not send any asset metadata to ftp website about the delivered content, in sidecar file or otherwise.
4. This workflow does not track success/failure of ingestion of content to ftp site. "Success" in terms of this workflow is defined as the creation of a video and delivery to the specified FTP endpoint.

### User Execution:
1. User selects the video they want to send.
2. User then selects "Send video to FTP site" from the workflow pull-down menu.
3. Workflow Modal is presented to user, prompting them to enter a delivery file name for the content.
4. User must enter some delivery filename, omitting any file extension. E.g. "ReallyGreatDeliveryName" is acceptable, "ReallyGreatDeliveryName.mp4" is not.
- The filename a user enters will get sanitized. If a user enters any special characters it will be stripped. Spaces will become underscores (_).

### Workflow Processing
1. Workflow first checks is another execution is running on this same content. If so, workflow fails out gracefully.
2. Workflow checks if content is archived, if so, workflow fails gracefully.
3. Workflow converts the video to a format acceptable for use on ftp site website using Vantage.
4. Delivers the video content to FTP location.

### Tracking
1. On job success or failure the metadata field "Publish Status" will be set.
- Success the field will be set with "Published",
- Failure the field will be set with "Publish Error".
- Subsequent running of the same content will overwrite previous value.

### Notificaitons
1. Upon success or failure an e-mail will be sent to "notifications.emailAddress.contentDelivery"
- Contents of e-mail include relevant information about asset, user who initiated workflow, and job completion status (success/failure).

### Dynamic Properties
Please ensure these dynamic properties are set.
1. notifications.emailAddress.contentDelivery
2. delivery.destination.ftpSite.ftp.password
3. delivery.destination.ftpSite.ftp.host
4. delivery.destination.ftpSite.ftp.user