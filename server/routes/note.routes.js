const NoteController = require('../controllers/note.controller')

module.exports = (app) => {
    //get all authors
    app.get('/api/allNotes', NoteController.getAllNotes)
    //get one author
    app.get('/api/note/:id', NoteController.getOneNote)
    //create new author
    app.post('/api/addNote', NoteController.addNote)
    //update author
    app.put('/api/update/:id', NoteController.updateNote)
    //delete author
    app.delete('/api/delete/:id', NoteController.deleteNote)
}