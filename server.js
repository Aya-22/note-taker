const express = require('express');
const path = require('path');
let database = require('./db/db.json');
const shortid = require('shortid');
const fs = require('fs');
const { get } = require('http');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// console.log(database);


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.json(database));

app.post('/api/notes', (req,res) => {
    console.log(req.body);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    } 
    console.log(newNote)
    database.push(newNote)
    console.log(database)
    fs.writeFile('./db/db.json', JSON.stringify(database), (err) =>{
        if (err) {
            return console.log(err)
        }; 
        res.json(database)
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const notesId = Number(req.params.id);
    

})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));