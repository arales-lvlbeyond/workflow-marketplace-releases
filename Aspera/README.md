# Aspera Transfers

These workflows should be called as subflows to initiate Aspera transfers. There are two workflows which can be used here based on whether the authentication is token based or uses a password.


## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Take an asset passed in as a File to datadef `fileToUpload` and transfer to `${asperaDestination}${packageName}`
        * After transferring asset, the asset will be removed from source system
            * ENSURE THAT THE FILE IS STAGED IN A TEMP LOCATION PRIOR TO TRANSFERING AS THE FILE WILL BE REMOVED UNLESS THE `--remove-after-transfer` ARG IS REMOVED

### Data Defs as Subflow

Context Data Def | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| fileToUpload | File | - | File to transfer |
| asperaDestination | String | - | Root Aspera Destination |
| packageName | String | - | Extension of asperaDestination location |
| asperaPassword | String | - | Aspera Password when transfering with transferAsperaWithPassword |
| credsFile | String | - | Aspera Credential filepath when transfering with transferAsperaAuthToken |
| authToken | String | - | Aspera Auth Token when transfering with transferAsperaAuthToken |

### Workflow summary
| ID | Description |
| :--- | :--- |
| [transferAsperaAuthToken](./transferAsperaAuthToken.xml) | Sends a file using Aspera authorized with token. |
| [transferAsperaWithPassword](./transferAsperaWithPassword.xml) | Sends a file using Aspera authorized with password. |

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| workflows.transferAspera.ascpLocation | `/reachengine/utilities/aspera/bin/linux-64/ascp` | - | Location of ASCP utility |

## Versioning

*Version 1* - 1/3/2020 Commit

## Authors

* **Levels Beyond - Charlie Auer** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

