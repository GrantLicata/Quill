const NoteController = require('../controllers/author.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    //get all authors
    app.get('/api/allNotes', authenticate, NoteController.getAllNotes)
    //get one author
    app.get('/api/author/:id', authenticate, NoteController.getOneNote)
    //create new author
    app.post('/api/addNote', authenticate, NoteController.addNote)
    //update author
    app.put('/api/update/:id', authenticate, NoteController.updateNote)
    //delete author
    app.delete('/api/delete/:id', authenticate, NoteController.deleteNote)
}