const fs = require('fs');
const chalk = require('chalk');


const getNotes = () => {
    return "your notes...";
};

const addNotes = (title,body) => {
    const notes = loadNotes();

    const duplicate = notes.find((note) => {
        note.title === title;
    });

    if(!duplicate)
    {
        notes.push({
            title:title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.bgGreen('Note added !'))
    }

    else {
        console.log(chalk.bgRed('Note title taken'));
    }
};


const listNotes = ()=>{
    const notes = loadNotes();
    console.log("YOUR NOTES : ");
    notes.forEach(element => {
        console.log(element.title);
    });
    
}

const readNotes =(title)=>{

}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e){
        return [];
    }
};

const removeNotes = (title) => {
    var notes = loadNotes();
    //filterArray has notes that are to be kept
    var filterArray = notes.filter((notes) => {
         notes.title !== title;
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
    removeNotes : removeNotes,
    listNotes : listNotes
};