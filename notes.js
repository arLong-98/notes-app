const fs = require('fs');
const chalk = require('chalk');



//add a note
const addNotes = (title,body) => {
    const notes = loadNotes();

    const duplicate = notes.find((note) => note.title === title);

    
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

//list all note titles
const listNotes = ()=>{
    const notes = loadNotes();
    console.log("YOUR NOTES : ");
    notes.forEach(element => {
        console.log(element.title);
    });
    
}
//display a particular note
const readNotes =(title)=>{
    const notes = loadNotes();
    const found = notes.find((note)=>note.title === title);

    if(found)
    {
        console.log(chalk.green.bold(found.title));
        console.log(found.body);
    }
    else
    {
        console.log(chalk.red('Note not found !'));
        
    }


};


//delete a particular note
const removeNotes = (title) => {
    const notes = loadNotes();
    //filterArray has notes that are to be kept
    const filterArray = notes.filter((note) => note.title !== title);

    if(notes.length > filterArray.length)
    { 
        console.log(chalk.bgGreen('Note removed !'));
        saveNotes(filterArray);
    }
    else
        console.log(chalk.bgGreen('No note found !'));
};


//utility function
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
};
//utility function
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e){
        return [];
    }
};







module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
};