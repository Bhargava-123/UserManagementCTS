var mongoose = require('mongoose')
var express = require('express')
const apiRoutes = require('./src/router/routes');
const {run} = require("./src/db/connect");
run();

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
PORT = 8080;
app.use("/", apiRoutes);
app.listen(PORT, () => {
    console.log("App Started");
})

