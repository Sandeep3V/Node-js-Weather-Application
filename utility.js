const fs = require('fs');
const ch = require('chalk');
const readingNotes = function(title) {
    const notes = loadNotes()
    const read = notes.filter(note => {
        return note.title === title
    })
}
const removeNote = (title) => {
    const notes = loadNotes()
    const removeNode = notes.filter(note => {
        return note.title !== title

    })
    if (notes.length > removeNode.length) {
        saveFiles(removeNode)
        console.log(ch.green("Task removed successfuly"))
    } else {
        console.log(ch.red.inverse("Task not found!"))
    }
}
const addNotes = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveFiles(notes)
        console.log("Added to notes")
    } else {
        console.log("Notes Itemm already taken")
    }
}

const readNotes = function(title) {
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(element.title)
    });
}

const saveFiles = function(notes) {
    const s = JSON.stringify(notes)
    fs.writeFileSync('notes.json', s)
}
const loadNotes = function() {
    try {
        const dataBuffered = fs.readFileSync('notes.json');
        const dataJSON = dataBuffered.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (e) {
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    readNotes: readNotes,
    readingNotes: readingNotes

}
