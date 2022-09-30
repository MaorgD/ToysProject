const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const {routesInit} = require("./api/routes/config_routes")
require("./api/db/mongoconnect");

const app = express();

// Gives access to all domains to access our server
app.use(cors());
// So that we can get in the body
app.use(express.json());
// Set the public folder as the primary folder
app.use(express.static(path.join(__dirname,"public")))

routesInit(app);

const server = http.createServer(app);

// console.log("env",process.env.TEST, process.env.USER_DB)

let port = process.env.PORT 
server.listen(port);