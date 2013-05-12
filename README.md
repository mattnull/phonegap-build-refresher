# PhoneGap Build Refresher

PhoneGap Build Refresher updates your PGB apps that are linked to a Github repo automatically. The script tells PhoneGap Build to pull your linked Github code every 30 seconds. This way all you have to worry about is committing and syncing your code without having make PhoneGap Build pull your latest code manually.

====================

## Setup

run `npm install`

## Config
Create a config file called phonegapbuildconfig.js.
This file should be kept in the root directory

````javascript
module.exports = {
	username : 'my phonegap build username',
	password : 'my phonegap build password'
}
````

## Run the script

* run `cake dev`

