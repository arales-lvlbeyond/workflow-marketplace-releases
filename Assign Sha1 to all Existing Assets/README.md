# Assign Sha1 to all Existing Assets

## Getting Started
1. Run workflow

### Workflow steps

#### Local/Dynamic Props
* queueLimit - workflows.sha1Assign.queueLimit / 11
* batchSize - workflows.sha1Assign.batchSize / 10
* queryPollInterval -  workflows.sha1Assign.queryPollInterval / 60

### Required Metadata Fields
* sha1 - text

### Installation
1. Check the clients system for the metadata field `sha1` 
    * If it is present, proceed, if not, create it
2. Add the subflow to the clients system
3. Add the parent workflow to the clients system
4. Add the dynamic props below.
5. Run workflow

## Steps to Test
Run workflow.  Check for sha1 on assets

## License

## Acknowledgments

