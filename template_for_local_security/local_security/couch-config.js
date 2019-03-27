module.exports = {
    "defaultDatabaseName": "directory",
	"defaultAccountName": "local",
	"defaultDocType": "app-setup",
	"databases": {
		"directory": "nosql-design-console-directory"
    },
	"accounts": {
		"local": {
			"url": "http://localhost:5984/",
			"key": "apiadmin",
			"password": "YOUR-PASSWORD"
		}
	}
}