const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');


//create add command

yargs.command({
    command:'add',
    describe:'adds a new note',
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body);
    }
});

//create remove command

yargs.command({
    command:'remove',
    describe:'removes a note',
    builder:{
        title:{
            describe:'note title',
            demandOption:'true',
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
});

//create list command

yargs.command({
    command:'list',
    describe:'Gives a list of all notes',
    handler(){
        notes.listNotes();
    }
});

//create read command

yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
});

yargs.parse();
