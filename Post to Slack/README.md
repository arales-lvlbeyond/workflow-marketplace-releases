# Project Title

Send to Slack

# Description

Sends a link to the asset via Slack with a customized message.

## Getting Started

These instructions will guide you through the installation and testing steps

### Workflow steps
* The workflow will:
    * Prompt the user for a message and a Slack channel
    * Send the message to the Slack channel using webhooks
    * Notify the user if the message could not be sent

### Dynamic properties used

| Property | Context Data Def | Default value | Description |
| :--- | :--- | :--- | :--- |
| slack.webhook.<channelName> | `webhookURL` | - | Slack webhook |
| reachengine.url | `reachUrl` | - | Reach Engine URL |

## Metadata fields

| Name | Type | Notes |
| :--- | :--- | :--- |
| slackChannel | Picklist (single) | ID = camelCase Slack Channel name in step 3. Display name = SLack Channel Name Displayed in Reach Engine. |


### Installing

1. Create a [webhook](https://slack.com/help/articles/115005265063-incoming-webhooks-for-slack) for the destination Slack channels
2. Log in to Reach Engine as an Administrator
3. Add the Slack webhooks to your dynamic properties, this can be done by going to the admin tab in newer versions of Reach, by going to: `https://**your reach url**.reachengine.com/api-docs/#/dynamic_properties/` in older versions, or by using Postman.  
    The name of the dynamic property should follow the following naming convention:
    * `slack.webhook.*****` where `******` is the name of your Slack Channel, camelCase, no spaces
    * EX: 
        * `  "slack.webhook.*****": "https://hooks.slack.com/services/*****/*****/**********"   ` <-- Your webhook from step one goes here
4. Click on the `Admin` tab in Reach Engine and add a new Single Picklist Metadata field called `slackChannel`
5. Add Picklist Items for `slackChannel`.  The `Display Name` is how you want the Slack Channel name to appear in Reach Engine, 
    the `ID` is the name of the last part of the dynamic property in step three.
    * EX: 
        * Display Name: `Demo Slack Channel`
        * ID: `*****`
 6. Import the `postToSlack.xml` workflow

**When using multiple slack channels, multiple dynamic props and picklist items must be configured, but `slackChannel` metadata field only needs to be created once.**

## Running the tests

* Select an asset master (video, audio, image, document)
* From the Action Menu, select the "Post to Slack" workflow
* Enter the required values
* Submit the form

## Versioning

## Authors

* **Levels Beyond** - *Version 1* - [Reach Engine](https://www.reachengine.com)

## License

## Acknowledgments

