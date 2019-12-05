const fs = require('fs');

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

module.exports = {
    getNotes : getNotes,
    addNotes : addNotes
};