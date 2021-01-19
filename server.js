const express = require("express");
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
    console.log(`App listening on port ${PORT}!`);
});

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"))

});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))

});

app.post("/api/notes", (req, res) => {
    // Create a new note 
    const newNote = req.body;

    // Read the db.json file and append its contents to the savedNotes array
    fs.readFile("db.json", "utf-8", (error, data) => {
        if (error) throw error
        let allNotes = JSON.parse(data);
        allNotes.push(newNote);
        newNote.id = allNotes.length;

        // Write db.json file with allNotes array
        fs.writeFile("db.json", `${JSON.stringify(allNotes)}`, (error, data) => {
            if (error) throw error
            console.log("Success!");
            res.json(req.body);
        });
    });


});

app.get("/api/notes", (req, res) => {
    // Read db.json file and return saved notes
    fs.readFile("db.json", "utf-8", (error, data) => {
        if (error) throw error
        res.json(JSON.parse(data));
    })
});

app.delete("/api/notes/:id", function (req, res) {
    console.log(`delete request at id ${req.params.id}`);

    fs.readFile("db.json", "utf-8", (error, data) => {
        if(error) throw error
        let savedNotes = JSON.parse(data)

        // console.log(savedNotes);
        
        let newNotesArr = savedNotes.filter((id) => {
            return id !== req.params.id
        });
        console.log(newNotesArr);

        // for(i=0; i>savedNotes.length; i++) {
        // if(savedNotes[i].id === req.params.id) {
        //     savedNotes.splice(i, 1);
        // } else{
        //     console.log("Nothing to delete fam")
        // }
        // };

        fs.writeFile("db.json", `${JSON.stringify(newNotesArr)}`, (error, data) => {
            if(error) throw error
            console.log("Success!");
        })


    })

})
