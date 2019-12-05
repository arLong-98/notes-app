const fs = require('fs');
const chalk = require('chalk');
const getNotes = function(){
    return "your notes...";
};

const addNotes = function(title,body){
    const notes = loadNotes();

    const duplicate = notes.filter(function(note){
            return note.title === title
    });

    if(duplicate.length ===0)
    {
        notes.push({
            title:title,
            body: body
        });

        saveNotes(notes);
    }

    else {
        console.log('Note title taken');
    }
};

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
};

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e){
        return [];
    }
};

const removeNotes = function(title){
    var notes = loadNotes();
    //filterArray has notes that are to be kept
    var filterArray = notes.filter(function(notes){
        return notes.title !== title;
    });

    if(notes.length == filterArray.length)
        console.log(chalk.bgRed('No note found !'));
    else
        console.log(chalk.bgGreen('Note removed !'));

    saveNotes(filterArray);
};

module.exports = {
    getNotes : getNotes,
    addNotes : addNotes,
    removeNotes : removeNotes
};