#!/usr/bin/env node
require("dotenv").config()

var dbHost = process.env.DB_HOST || "localhost"
var dbName = process.env.DB_NAME
var dbUser = process.env.DB_USERNAME
var dbPass = process.env.DB_PASSWORD

let mongoURI

if(dbName && dbUser && dbPass){
	mongoURI = "" + dbHost + "://"+ dbUser + ":" + dbPass + "@ds239055.mlab.com:39055/" + dbName
}
else{
	mongoURI = "mongodb://travis:test@localhost:27017/mydb_test"
}

module.exports = {
	mongoURI: mongoURI
}