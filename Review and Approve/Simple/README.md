# Simple Review and Approve

## Summary
The Simple Review and Approve workflows provide a simple means of configuring user and manager type roles with the ability to request assets to be reviewed, and reject or approve respectively. The workflows will send notification emails as well as transition the asset between best practice lifecycle states accordingly.

## Files
<pre>
Review and Approve/Simple/requestReview.xml
Review and Approve/Simple/approveAsset.xml
Review and Approve/Simple/rejectAsset.xml
</pre>

##Getting Started

## Deployment
### Create required metadata fields
#### Lifecycle States
`lifecycleState`
<table>
	<tr><th style="text-align:left;">Display Name</th><td>Lifecycle State</td></tr>
	<tr><th style="text-align:left;">Show in Inspector</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Type</th><td>Picklist</td></tr>
	<tr><th style="text-align:left;">Metadata Groups</th><td>Status</td></tr>
	<tr><th style="text-align:left;">Metadata Forms</th><td></td></tr>
	<tr><th style="text-align:left;">Configuration</th><td>Single</td></tr>
	<tr><th style="text-align:left;">Picklist items</th><td>Import<pre>Review and Approve/Simple/lifecycleState.csv</pre></td></tr>
</table>

#### Review Requester Email
##### for storing and distributing review response email back to review requester
`reviewRequesterEmail`
<table>
	<tr><th style="text-align:left;">Display Name</th><td>Review Requester Email</td></tr>
	<tr><th style="text-align:left;">Type</th><td>Text</td></tr>
	<tr><th style="text-align:left;">Metadata Groups</th><td>Status</td></tr>
</table>

### Add dynamic properties
<pre>
"reach.engine.url": "{{reachURL}}",
"workflow.review.email": "{{Manager Email}}"
</pre>

### Import workflows
Import request review workflow
<pre>
Review and Approve/Simple/requestReview.xml
</pre>
<table>
	<tr><th style="text-align:left;">Enabled</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Visible</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Right-Click</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Group</th><td>Review and Approve</td></tr>
	<tr><th style="text-align:left;">Roles</th><td>User</td></tr>
</table>

Import approve and reject workflows
<pre>
Review and Approve/Simple/approveAsset.xml
Review and Approve/Simple/rejectAsset.xml
</pre>
<table>
	<tr><th style="text-align:left;">Enabled</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Visible</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Right-Click</th><td>✓</td></tr>
	<tr><th style="text-align:left;">Group</th><td>Review and Approve</td></tr>
	<tr><th style="text-align:left;">Roles</th><td>Manager</td></tr>
</table>
