const express = require("express");
const { networkInterfaces } = require("os");
const path = require("path");
const fs = require("fs");

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
const Note = function(title, text, id){
    this.title = title;
    this.text = text;
    this.id = id;
};

const savedNotes = [];

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"))

});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))

});

app.post("/api/notes", function( req, res ) {
    // Create a new note and push it into the saved notes array
    const newNote = req.body;
    savedNotes.push(newNote);

    // Each new note will be assigned a unique id based on its position in the saved notes array
    newNote.id = savedNotes.length+1;

    // Append each new note to db.json file
    fs.appendFile("db.json", `${JSON.stringify(newNote)}\n`, err => {
        err ? console.error(err) : console.log("Success!")
    });
    return res.json(newNote);
});

app.get("/api/notes", function ( req, res ) {
    // Read db.json file and return saved notes
    fs.readFile("db.json", "utf-8", (error, data) => 
    error ? console.error(error) : console.log(data)) 
});

app.delete("/api/notes/:id", function( query ) {
    // Delete the db.json file
    fs.unlink("db.json", (err) =>
    err ? console.error(err) : console.log("File deleted!"))
})
