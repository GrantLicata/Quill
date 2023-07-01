const NoteController = require('../controllers/note.controller')

module.exports = (app) => {
    //get all notes
    app.get('/api/allNotes', NoteController.getAllNotes)
    //get one note
    app.get('/api/note/:id', NoteController.getOneNote)
    //create new note
    app.post('/api/addNote', NoteController.addNote)
    //update note
    app.put('/api/update/:id', NoteController.updateNote)
    //delete note
    app.delete('/api/delete/:id', NoteController.deleteNote)
}