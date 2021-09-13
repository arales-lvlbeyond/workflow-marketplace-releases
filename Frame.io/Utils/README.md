# Utility Workflows / Scripts

This folder consists of a set of utility workflows or scripts that can be used to help simplify fetching information or performing configurations necessary for the set of Frame.io workflows.

## Workflows

### clearFrameioMetadata

Simplifies clearing a selected asset of outdated Frame.io information in order to be able resubmit the asset to Frame.io in the event of a previous execution of that asset being sent to an incorrect project or a stall.

#### Steps to Run:
1. Select a target asset master and run the "Clear Frame.io Metadata" workflow.
2. Rerun the "Send Asset to Frame.io" on the selected asset and confirm it has been sent to the correct Frame.io project and updated with the corred Frame.io information for the target project.

### getProjectRootIdsForTeam

Fetches a list of of all Frame.io Project `root_asset_ids` for a specified Frame.io `team_id`. This can be used to help configure the list of project ids the `Pull Assets from Specified Frame.io Projects` workflow will ingest files from Frame.io into Reachengine (`workflows.pullFromFrameIO.rootAssetIds`).

#### Steps to Run:
1. Run the `getProjectRootIdsForTeam` workflow from the UI and enter the required inputs.
2. Check the context data for a successful execution and see the `result` context data for a set of jsons with name and `root_asset_id` for all Projects for the specified `team_id`.
3. Check the `root_asset_ids` context data def for a list of solely the ids for each Project in the specified `team_id`.

#### Example output:
```
{
    "result": [
        {
            "root_asset_id": "6f1df1a5-31d7-4d8e-a052-8b60518abb6d",
            "projectName": "Reach Engine Outbox"
        },
        {
            "root_asset_id": "66b95265-71f6-4050-b9ac-eb99ef4b8979",
            "projectName": "Reach Engine Inbox"
        },
        {
            "root_asset_id": "7ce20ab7-acc7-48b8-8b96-6037c8553b88",
            "projectName": "Oh My Goal - Outbox"
        },
        {
            "root_asset_id": "e22f3022-7406-47a2-9785-8caef2ae567a",
            "projectName": "Laugh Society - Outbox"
        }
    ],
    "root_asset_ids" : [
        "6f1df1a5-31d7-4d8e-a052-8b60518abb6d",
        "66b95265-71f6-4050-b9ac-eb99ef4b8979",
        "7ce20ab7-acc7-48b8-8b96-6037c8553b88",
        "e22f3022-7406-47a2-9785-8caef2ae567a"
    ]
}
```

### getFrameIOTeamMetadataCSV

Fetches an importable picklist csv of all Frame.io Teams that may be added to the `frameioTeam` picklist metadata field.

#### Example result csv:
```
Value,Label
3601b35d2b5743be9c3427cbb5187df6,360 Creators
8e970ae0a24243e7a06f77b8ede270fe,Beauty Studio
6f2dd364f70047b6b3f2895f0818eb55,Binge Society
ac7f3b9846b344008534b69a49ef7ae6,Creators - Arts & Crafts
964dab486ead4bbaa0999ceb1fe1b98c,Creators - Beauty
41aa65e7a04c4536ba8df80b46ba9ebc,Creators - Casual + Best of Social
e0eb09b46e4d4d488dad604dee6a44da,Creators - Certifications
a67b25a9d2c0492cbe18f86be330b142,Creators - Entertainment
be5b2e19b9d34be9a56fe96be0539655,Creators - Food & Learnings
2f0b763121e84792a1bf0e548ac49335,Creators - Gaming
4685255a4b2944b5b8587fd6b8d57e54,Creators Ops
242eb9abfdb6486ab52b1d70f4019fc4,Creators - Sports & Adventure & Auto
aefba75914a14de58373410c969ce16b,Creators - Testing
8e86f7512d414c82b171dcccc679cb8a,Creators - Trendsformers
11494c53c6fd43abaa6de641ca9f6e02,Creators - True Crime
6ba5857875c7477083745e40d9f9a069,Gamology
b196de7c1d96432c8b4084dbb8e9d464,House of Bounce
1b57144677ee4d359cf5df4fdbb215de,Laugh Society
89110f162e6c49ddb1130c8058e4415a,Motion Design Playground
ba558477b9a44633a385e84cf47d4f26,New Jellysmack Creators
573b7d5e76cf4ba685672cdd3b46fc0a,Oh My Goal
c4a4bfe2343e4ac6b7c488c3e5a0f15f,Ops Playgroud
66239071c4e24b43a1aea045cd5f358f,PostProdPlayground
953939f0de5b4770aa4f7fa99ea2a9dc,VIC Production Initiative

```

## Scripts