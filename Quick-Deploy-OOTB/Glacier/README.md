# Glacier Archive and Restore

These workflows can be used as standalone to Archive or Restore assets to Glacier while remaining in their same location in the default S3 bucket. May also be used as subflows
 and will return a fail/success result.


## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
Workflow will by default restore an asset for 365 days unless the`workflows.glacier.glacierRestoreDays` datadef specifies otherwise. This length was chosen so that a cron
 will pick up the asset and re-archive before this date is hit ideally, thus preventing RE from thinking an asset is available when it is not.


### Workflow summary
| ID | Description |
| :--- | :--- |
| [glacierObjectArchive](./glacierObjectArchive.xml) | Archive an S3 object to Glacier-tier while retaining it's filepath. |
| [glacierObjectRestore](./glacierObjectRestore.xml) | Restore an S3 object in Glacier-tier back to S3-tier for a specified amount of time. |

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| workflows.glacier.bulkRetrieval.pollRate | Integer | `3600` | Number of seconds to wait while Restore WF loops to check if file is finished being restored when BULK restore is chosen |
| workflows.glacier.standardRetrieval.pollRate | Integer | `900` | Number of seconds to wait while Restore WF loops to check if file is finished being restored when STANDARD restore is chosen |
| workflows.glacier.expeditedRetrieval.pollRate | Integer | `180` | Number of seconds to wait while Restore WF loops to check if file is finished being restored when EXPEDITED restore is chosen |
| workflows.glacier.glacierRestoreDays | Integer | `365` |  Number of days to keep the restored object in active S3 storage |

## Versioning

*Version 1* - 6/23/2020 Commit

## Authors

* **Levels Beyond - Charlie Auer** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

