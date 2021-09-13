
## Configure Workflow's License Validation 
Before configuring and running this marketplace workflow, you must first configure workflow authorization.  
Without authorization setup, the workflow will not run.  Please follow the steps below.

#### 1) Create required dynamic properties for authorization
| Property Name | Context Data Def | Description | Value |
| :--- | :--- | :--- | :--- |
| marketplace.<TODO UPDATE WITH YOUR WORKFLOW MP IDENTIFIER>.licenseKey | `payhipWorkflowLicenseKey` | Payhip License Key for this workflow.  | Enter the License Key found in the email received from Payhip upon purchase of this workflow
| marketplace.<TODO UPDATE WITH YOUR WORKFLOW MP IDENTIFIER>.productLink | `payhipWorkflowProductLink` | Payhip Product Key for this workflow.  | Enter the Product Key found in the email received from Payhip upon purchase of this workflow

#### 2) Create optional dynamic property for authorization (optional step)
| Property Name | Context Data Def | Description | Value |
| :--- | :--- | :--- | :--- |
| system.curlExecutablePath | `curlExecutablePath` | location of curl shell | Only required if curl shell install location is not /user/bin/curl. Also note, this property may already exist if other workflows in your system use curl

#### 3) Import the Authorization workflow
The Authorization workflow is packaged with the purchased workflow product. 

* Import ./Workflow Authentication/mpAuthorizeWorkflow.xml 

Note: This workflow is used by every Marketplace workflow, so it may already be found within your system.  Please re-import this specific authorization workflow to pickup any changes that may have been applied.

#### 4) Authorization Configuration Complete
You can now continue using the steps below to setup your workflow.
##
