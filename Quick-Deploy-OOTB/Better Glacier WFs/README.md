# Glacier S3 Storage Orchestration for Maker

#NOTE
These can take the place of better OOTB Glacier workflows in some instances such as restore from a collection quickly, etc.

#AWS SH Script
Place run_aws.sh into `/reachengine/cmds/run_aws.sh`

##Instructions to deploy workflows
1. Within Reach, navigate to the Admin tab.
2. Click on 'Workflows' on the left.
3. Click 'Import', then select the 'archiveAssetToGlacier.xml' workflow from the extracted zip.
4. Upload the workflow. 
5. Repeat Steps #3 and #4 for the 'archiveCollectionToGlacier' workflow.
6. Repeat Step #5 for the 'glacierObjectRestore' workflow.
7. Repeat Step #5 for the 'restoreAssetFromGlacier' workflow.
8. Repeat Step #5 for the 'filterDailyArchive' workflow.
9. Repeat Step #5 for the 'cronDailyArchive' workflow.

##Instructions to archive an asset
1. Select a single asset or collection within Reach that is currently available. 
2. Click on the workflows button, then select 'Archive Asset to Glacier' to archive the asset.

##Instructions to restore an asset
1. Select a single asset or collection within Reach that is currently archived.
2. Click on the workflows button, then select 'Restore Asset from Glacier'.
3. Select the restore window for the asset in the modal that comes up.
4. Click 'Submit' to begin the restore of the asset, which will take a variable amount of time based on the restore window selected.

##Instructions to configure automated cron and S3 bucket
1. Navigate to /reachengine/tomcat/lib/local.reach-engine.properties and insert the following properties below the last previously configured cron job:
    workflow.cron.dailyArchive.workflow=cronDailyArchive
    workflow.cron.dailyArchive.schedule=0 0 * * *
2. If not performed already, also insert the following property into local.reach-engine.properties to map the S3 bucket used:
    workflows.archiveAssetToGlacier.s3bucket=bucketName
3. Restart the server.
4. Configure how long the workflow runs for using the 'workflows.cronDailyArchive.numOfMinutes' dynamic property detailed below, which defaults to one minute.

## Workflow Summary
Workflows integrate with AWS S3 Glacier to archive to and restore content from glacier back to the StorNext filesystem.

Glacier functionality consists of 5 workflows.
1. archiveAssetToGlacier
2. archiveCollectionToGlacier
3. restoreAssetFromGlacier
4. glacierObjectRestore
5. cronDailyArchive
6. filterDailyArchive

## User Facing Workflows:
### Archive Asset to Glacier
Allows a user to archive a single asset to Glacier.

### Archive Asset to Glacier
Allows a user to archive a collection to Glacier.

### Restore Asset From Glacier
Allows a user to restore an asset from Glacier.

## Cron Workflows:
### (Cron) Archive Assets - Daily
Gathers unarchived assets not modified in the last 30 days for archival.

## Supporting Workflows
### Filter Daily Archive
- This is called by (Cron) Archive Assets - Daily. It filters assets selected for archival based on the StorNext last accessed date.

### Glacier Object Restore
- This is called by Restore Asset From Glacier. It contains the logic underneath the hood for restoring an asset from Glacier.

##Dynamic Properties
All context data definitions have default values in case any of the dynamic properties below are not set.

###Suggested dynamic properties to be set
"workflows.archiveAssetToGlacier.emails" : "admin@maker.com",
"workflows.archiveAssetToGlacier.s3bucket" : "dpre-wfd",
"workflows.cronDailyArchive.daysInterval" : "30",
"workflows.filterDailyArchive.daysInterval" : "30",
"workflows.cronDailyArchive.numOfMinutes" : "1"

###Other dynamic properties
"workflows.archiveCollectionToGlacier.queuePollInterval" : "5",
"workflows.archiveCollectionToGlacier.queueLimit" : "11",
"workflows.archiveCollectionToGlacier.batchSize" : "10",
"workflows.cronDailyArchive.queryLimit" : "200",
"workflows.glacierObjectRestore.rrsRestoreDays" : "60",
"workflows.glacierObjectRestore.bulkRetrieval.pollRate" : "3600",
"workflows.glacierObjectRestore.standardRetrieval.pollRate" : "1800",
"workflows.glacierObjectRestore.expeditedRetrieval.pollRate" : "900"
"workflows.baseQueueLoop.queryPollInterval" : "10",
"workflows.baseQueueLoop.queueLimit" : "25"