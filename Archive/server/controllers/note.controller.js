const Note = require('../models/note.model')

module.exports = {
    getAllNotes:(req,res) => {
        Note.find().sort({createdAt: -1})
        .then((results) => {
            res.json(results)
        }).catch((err) => {
            res.status(400).json(err)
        })
    },
    getOneNote:(req,res) => {
        Note.findById(req.params.id)
        .then((results) => {
            res.json(results)
        }).catch((err) => {
            res.status(400).json(err)
        })
    },
    addNote:(req,res) => {
        Note.create(req.body)
        .then((results) => {
            res.json(results)
        }).catch((err) => {
            //Error should be handled here differently when validations used in the model.
            res.status(400).json(err)
        })
    },
    updateNote:(req,res) => {
        Note.updateOne({_id:req.params.id}, req.body, {new:true, runValidators: true} )
        .then((results) => {
            res.json(results)
        }).catch((err) => {
            res.status(400).json(err)
        })
    },
    deleteNote:(req,res) => {
        Note.deleteOne({_id:req.params.id})
        .then((results) => {
            res.json(results)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }
}