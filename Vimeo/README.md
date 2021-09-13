# Vimeo 
Workflows created for publishing videos to Vimeo

## Create Vimeo Folder From Collection
This workflow will create a Vimeo Project folder from the selected collection with the same name of the folder.
Saves link tpo folder and folder ID to metadata of collection

#### Inputs:
* Collection - subject

#### Subflows
* createVimeoFolder.xml

#### Local/Dynamic Props
    * marketplace.vimeo.access.token

 #### Metadata Fields
* vimeoProjectLink - Link to Vimeo Project Folder
* vimeoProjectId - Vimeo Project Folder ID


## Create Vimeo Folder
This workflow will create a Vimeo Project folder

#### Inputs:
* folderName - name of folder to create in Vimeo

#### Subflows
N/A

#### Local/Dynamic Props
    * marketplace.vimeo.access.token

 #### Metadata Fields
N/A


## Send To Vimeo
This workflow will send a video to Vimeo

#### Inputs:
* confirmation - yes/no
* contentUse
    - Source
    - Mezzanine
    - Proxy
* videoName - name of video
* videoDescription - Description
* project - Vimeo Project Folder ID
* privacy - Vimep Privacy Settings

#### Subflows
N/A

#### Local/Dynamic Props
    * marketplace.vimeo.access.token

 #### Metadata Fields
* vimeoProjectLink - Link to Vimeo Project Folder
* vimeoProjectId - Vimeo Project Folder ID

