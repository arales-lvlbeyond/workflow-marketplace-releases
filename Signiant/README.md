# Project Title
Signiant Media Shuttle integration

# Description
**1. Transfer via MediaShuttle**

Share an asset with an external user using Signiant MediaShuttle. The workflow will send an email to the selected recipient(s) with the transfer link.

**2. Request Asset via MediaShuttle**

Request an asset from an external user using Signiant MediaShuttle. The requestor can add a target Collection and Metadata, saved as a JSON side-car file, to the incoming files. The workflow will send an email to the selected recipient(s) with the transfer link.

Note: these workflows require a valid Signiant MediaShuttle license.

# Getting Started

## Prerequisite
In order to use these workflows, the storage location Signiant picks up the files at must be available to Reach Engine.
If running on an external server, that servers storage will have to be mounted to Reach Engine.  
Test this by moving files into the location using a `cp` after ssh'ing into Reach engine.


These instructions will guide you through the installation and testing steps

## Installing
1. Log in to Reach Engine as an Administrator
2. Create the [metadata fields](./README.md#metadata-fields) as described below
3. Create the [dynamic properties](./README.md#dynamic-properties) as described below
4. Update the required dynamic properties with your personal settings
5. [Import the workflows](./README.md#workflow-summary) in the order described below
10. (Optional) Configure an AWS S3 event for automated ingest

## Metadata fields
| Name | Type | Notes |
| :--- | :--- | :--- |

## Dynamic properties
| Property | Type | Required (y/n) | Description |
| :--- | :--- | :--- | :--- |
| `media.shuttle.api.key` | String | Y | The media shuttle api key |
| `media.shuttle.portal.url` | String | Y | The API endpoint for Media Shuttle portals (e.g.: https://api.mediashuttle.com/v1) |
| `media.shuttle.audit.email` | String | N | The email to be used for media shuttle package auditing for packages that failed to be synchronized and ingested in to Reach. |
| `media.shuttle.import.path` | String | N | Path on filesystem for incoming files (only for local storage). E.g.: `media/signiant/import` |
| `media.shuttle.export.path` | String | N | Path on filesystem for shared files (only for local storage). E.g.: `media/signiant/export` |
| `media.shuttle.repository.path` | String | N | Root directory on filesystem as entered in Signiant (only for local storage). E.g.: `/mnt/reachengine` |
| `media.shuttle.portal.name` | String | Y | Signiant portal name. E.g.: `lbre-send.mediashuttle.com` |
| `workflows.awsExePath` | String | N | Location of AWS CLI exe- only needed if exe is not located in '/usr/bin/aws' |


## Workflow summary
### Utilities
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [exportMetadataAsJson](./Utility/exportMetadataAsJson.xml) | Creates a metadata JSON sidecar file based on the object metadata and/or the input form |
| 2 | [ingestNormalizeMetadata](./Utility/ingestNormalizeMetadata.xml) | Combines metadata form and object metadata, collections and categories into a single JSON |
| 3 | [sendSigniantEmail](./Utility/sendSigniantEmail.xml) | Formats the Reach Engine email in HTML |

### Common
#### Create empty Media Shuttle package
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [createEmptyMediaShuttlePackage](./Common/createEmptyMediaShuttlePackage.xml) | This workflow is responsible for creating a Media Shuttle package |

**Required inputs:**
+ `mediaShuttleApiKey` - the API key for the Signiant Media Shuttle Account
+ `baseMediaShuttlePortalsUrl` - The Media Shuttle Portals URL including /portals

**Return Value:**
+ `portalAndPackage` - JSON containing portalId and packageId

First, the workflow will request the portalId that we will be using for the package
[List Portals](https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/1.13.3#/Portals/getPortals)
The retrieved portalId is stored in the JSON data def `portalAndPackage`

Then a package is created within the specified portal
[Create a New Package](https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/1.13.3#/System-to-Person/post_portals__portalId__packages)
The Id of the new package is also retrieved and stored in `portalAndPackage`

On Success the `portalId` and `packageId` are returned via the contextDataDef `portalAndPackage`

#### Add content to Media Shuttle package
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [addContentToMediaShuttlePackage](./Common/addContentToMediaShuttlePackage.xml) | This Workflow is responsible for adding content files to a package for transfer. |

**Required inputs:**
+ `targetContent` - A list of all AssetContent Data Objects containing files to be transferred
+ `portalId` - The Id of the portal in which the target Package exists
+ `packageId` - The Id of the Package to which we will add content
+ `mediaShuttleApiKey` - the API key for the Signiant Media Shuttle Account
+ `baseMediaShuttlePortalsUrl` - The Media Shuttle Portals URL including /portals

The workflow will first request the storage repos that are configured for the Portal in which the package resides
[List the storage locations assigned to a portal](https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/1.13.3#/Portals/getPortalStorage)
Storage repos will be stored in the data def `storageRepos`

All content paths provided via `targetContents` will then be mapped to be relative to the portal repo path. E.g. If the portal storage path is `/mnt/joestar` and the file to be transfered is located at `/mnt/joestar/source/file.jpg` then the file path that is sent to media shuttle will be `source/file.jpg`. The resultant paths will be added to a post body for the next request.
[Add files to a package](https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/1.13.3#/System-to-Person/putPackages)


#### Create package transfer token
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [createPackageTransferToken](./Common/createPackageTransferToken.xml) | This workflow is responsible for generating a transfer link to be sent to any recipients |

**Required inputs:**
+ `expirationDate` - The date on which the transfer link will expire
+ `portalId` - The Id of the portal in which the target Package exists
+ `packageId` - The Id of the Package to which we will add content
+ `grantToken` - The token (download or upload) to be used when creating the package transfer
+ `mediaShuttleApiKey` - the API key for the Signiant Media Shuttle Account
+ `baseMediaShuttlePortalsUrl` - The Media Shuttle Portals URL including /portals
+ `destinationPath` - The repo where files should be copied to (defaults to system temp folder if no export path is set)

**Return value:**
+ `transferLink` - The link which will grant access to the MediaShuttle Transfer

The workflow will create a transfer link with the provided inputted packageId and the resultant link will be returned in the data def `transferLink`
[Create a transfer link](https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/1.13.3#/System-to-Person/createToken)

### Share via Signiant
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [transferViaMediaShuttle](./Common/transferViaMediaShuttle.xml) | This workflow will make use of all Media Shuttle subflows to orchestrate the creation of a transfer package for a single selected AssetMaster, and will send the generated transfer link to all provided recipients |

**User Inputs:**
+ `expirationDate` - The date on which the transfer link will expire
+ `emailAddresses` - List of emails to receive the transfer link
+ `contentUse` - type of content to transfer

First and empty transfer package is created via `createEmptyMediaShuttlePackage`
Portal and Package Ids will be stored and then used for subsequent calls.

The workflow will then add content to the newly created package with `addContentToMediaShuttlePackage`.
Source content for the selected asset will be sent to the subflow for processing.

With content added successfully a transfer link will be generated with `createPackageTransferToken`

The resultant transfer link will then be sent out to all email recipients.

### Request via Media Shuttle
| ID | Name | Description |
| :--- | :--- | :--- |
| 1 | [requestViaMediaShuttle](./Common/requestViaMediaShuttle.xml) | This workflow will make use of all Media Shuttle subflows to orchestrate the creation of an upload token and will send a transfer link to the provided recipients |

**User Inputs:**
+ `expirationDate` - The date on which the transfer link will expire
+ `emailAddresses` - List of emails to receive the transfer link
+ `collections` - List of Collections to associate the content with
+ `metadataForm` - Categories and metadata properties to associate the content with

First and empty transfer package is created via `createEmptyMediaShuttlePackage`
Portal and Package Ids will be stored and then used for subsequent calls.

The workflow will create the destination folder based on the portal and package ID.
The selected collections, categories and metadata will be saved to a `metadata.json` file under this destination path.

An upload token and a transfer link will be generated with `createPackageTransferToken`

The resultant transfer link will then be sent out to all email recipients.

### S3 automatic ingest
This folder contains the Lambda function Node.js source code to automatically ingest the files uploaded to S3 via Media Shuttle

**Important note:** 

1. This Node.js code is offered as a working example and is not required for the workflows to work. 
2. Our customers are encouraged to take full ownership of this Lambda function and modify the code as they see fit.
3. Levels Beyond is not responsible for maintaining or supporting source code outside of the Reach Engine software or customized workflows developed by Levels Beyond within the agreed scope.  
4. In its current state, this Lambda function does not support nested (sub)folders within a Media Shuttle package. 
 
**Installation Steps:**

From the AWS Console
+ Create a new Lambda function called `reachengine-signiant-ingest`
+ Go to "function code" and copy-paste the `index.js` source code
+ Edit the `REACHENGINE_ENDPOINT` (line 5) and `REACHENGINE_API_KEY` (line 6) with your own values
+ Save the Lambda function
+ Go to the S3 bucket as defined in your Signiant configuration (storage repo)
+ Go to Properties > Event and add a notification
+ Add a new event "All object create events" | Prefix: same as defined in your Signiant configuration (e.g.: media/signiant/) | Send to: Lambda Function | Lambda: reachengine-signiant-ingest
+ Save your event
