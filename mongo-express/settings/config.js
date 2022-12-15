/*
    This is an example config file for mongo-express (https://www.npmjs.com/package/mongo-express)
    Should work without modifying if your mongodb server users are defaults
    
    How to use:
        1. Copy this file in your app/node_modules/mongo_express directory
        2. Rename to config.js
*/

"use strict";

import { parse } from "url";

let mongo;

if (typeof process.env.MONGODB_PORT === "string") {
    const mongoConnection = parse(process.env.MONGODB_PORT);
    process.env.ME_CONFIG_MONGODB_SERVER = mongoConnection.hostname;
    process.env.ME_CONFIG_MONGODB_PORT = mongoConnection.port;
}

// Accesing Bluemix variable to get MongoDB info
if (process.env.VCAP_SERVICES) {
    const dbLabel = "mongodb-2.4";
    const env = JSON.parse(process.env.VCAP_SERVICES);
    if (env[dbLabel]) {
        mongo = env[dbLabel][0].credentials;
    }
} else {
    mongo = {
        db: "admin",
        host: "localhost",
        username: "root",
        password: "password",
        port: 27017,
        url: "mongodb://localhost:27017/admin",
    };
}

export const mongodb = {
    server: process.env.ME_CONFIG_MONGODB_SERVER || mongo.host,
    port: process.env.ME_CONFIG_MONGODB_PORT || mongo.port,

    //autoReconnect: automatically reconnect if connection is lost
    autoReconnect: true,

    //poolSize: size of connection pool (number of connections to use)
    poolSize: 4,

    //set admin to true if you want to turn on admin features
    //if admin is true, the auth list below will be ignored
    //if admin is true, you will need to enter an admin username/password below (if it is needed)
    admin: !!process.env.ME_CONFIG_MONGODB_ENABLE_ADMIN || false,

    // >>>>  If you are using regular accounts, fill out auth details in the section below
    // >>>>  If you have admin auth, leave this section empty and skip to the next section
    auth: [
        /*
         * Add the the name, the username, and the password of the databases you want to connect to
         * Add as many databases as you want!
         */
        {
            database: mongo.db,
            username: mongo.username,
            password: mongo.password,
        },
    ],

    //  >>>>  If you are using an admin mongodb account, or no admin account exists, fill out section below
    //  >>>>  Using an admin account allows you to view and edit all databases, and view stats
    //leave username and password empty if no admin account exists
    adminUsername: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME || "",
    adminPassword: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD || "",

    //whitelist: hide all databases except the ones in this list  (empty list for no whitelist)
    whitelist: [],

    //blacklist: hide databases listed in the blacklist (empty list for no blacklist)
    blacklist: [],
};
export const site = {
    // baseUrl: the URL that mongo express will be located at - Remember to add the forward slash at the stard and end!
    baseUrl: process.env.ME_CONFIG_SITE_BASEURL || "/mongo-express/",
    cookieKeyName: "mongo-express",
    cookieSecret: process.env.ME_CONFIG_SITE_COOKIESECRET || "cookiesecret",
    host: process.env.VCAP_APP_HOST || "localhost",
    port: process.env.VCAP_APP_PORT || 8081,
    requestSizeLimit: process.env.ME_CONFIG_REQUEST_SIZE || "50mb",
    sessionSecret: process.env.ME_CONFIG_SITE_SESSIONSECRET || "sessionsecret",
    sslCert: process.env.ME_CONFIG_SITE_SSL_CRT_PATH || "",
    sslEnabled: process.env.ME_CONFIG_SITE_SSL_ENABLED || false,
    sslKey: process.env.ME_CONFIG_SITE_SSL_KEY_PATH || "",
};
export const useBasicAuth = process.env.ME_CONFIG_BASICAUTH_USERNAME !== "";
export const basicAuth = {
    username: process.env.ME_CONFIG_BASICAUTH_USERNAME || "root",
    password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || "password",
};
export const options = {
    //documentsPerPage: how many documents you want to see at once in collection view
    documentsPerPage: 10,

    //editorTheme: Name of the theme you want to use for displaying documents
    //See http://codemirror.net/demo/theme.html for all examples
    editorTheme: process.env.ME_CONFIG_OPTIONS_EDITORTHEME || "rubyblue",

    // Maximum size of a single property & single row
    // Reduces the risk of sending a huge amount of data when viewing collections
    maxPropSize: 100 * 1000,
    maxRowSize: 1000 * 1000,

    //The options below aren't being used yet
    //cmdType: the type of command line you want mongo express to run
    //values: eval, subprocess
    //  eval - uses db.eval. commands block, so only use this if you have to
    //  subprocess - spawns a mongo command line as a subprocess and pipes output to mongo express
    cmdType: "eval",

    //subprocessTimeout: number of seconds of non-interaction before a subprocess is shut down
    subprocessTimeout: 300,

    //readOnly: if readOnly is true, components of writing are not visible.
    readOnly: false,
};
export const defaultKeyNames = {};
