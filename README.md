# Action App Designer
Designed to build applications using the Action App environment

Important: Install this .. run as administrator when doing so..
npm install --global --production windows-build-tools
and
npm config set python C:\Users\YOURUSERNAME\.windows-build-tools\python27\python.exe

## What is it?
* An application design to run LOCALLY ONLY that will serve as the designer client
* To get started, you will need CouchDB and the following setup

## How to setup your local_security directory
### What is it?
* The local_security directory is a repo ignored folder that can hold local security details that are not pushed up with the code.   
* Other setup details and data are stored in CouchDB locally.
* Also other setup details can be stored in this folder and used directly.

### Before you begin ...
* Couch DB should be setup locally using the defaults and running (runs automatically once installed)
* CORS setting should be set to allow all domains or at least localhost (see the gear icon in the local Couch console for this setting)
* There shouild be an apiadmin user setup with a password you will setup for application access in the next step.

### Initial Setup
See the template_for_local_security folder, this has a sub-folder called local_security
* Copy the local_security folder to the root of the project where it will be ignored in the repo
* Update the one file couch-config.js with your password and optionally a new key if not using "apiadmin" as the admin level CouchDB API username
* In the CouchDB create a database called nosql-design-console-directory
* Copy the app-setup.json contents into that db as a file
* Update the app-setup document in the nosql-design-console-directory database with your password and any account details for other accounts.  This can updated later and new accounts added, etc.
* Note: If the local access changes, update in both the json document and the couch-config.js
* Run npm install

### Initial Setup Done
You can now use npm start to run anytime
