const express = require("express");
const { networkInterfaces } = require("os");
const path = require("path");

// Creates express server
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

// New note object
const Note = function(id, title, text){
    this.id = id;
    this.title = title;
    this.text = text;
};

const savedNotes = [];

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"))

});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))

});
