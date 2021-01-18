const express = require("express");
const { networkInterfaces } = require("os");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Read front-end files from "public" folder
app.use(express.static("public"));

// Listen on port 3000
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});