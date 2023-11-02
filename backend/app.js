var express = require('express')
const apiRoutes = require('./src/router/routes');
const { connectDB } = require("./src/db/connect");
var bodyParser = require('body-parser');
connectDB();

const app = express()
app.use(express.json())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

PORT = 8080;
app.use(apiRoutes);
app.listen(PORT, () => {
    console.log("App Started");
})

