const Note = require('../models/Note')

async function create(req, res){
    const data = req.body
    try {
        const response = await Note.create(data)
        res.status(201).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}
async function getAll(req, res){
    try {
        const response = await Note.getAll()
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getById(req, res){
    const note_id = req.params.id
    try{
        const response = await Note.getById(note_id)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getByCategory(req, res){
    const category = req.body.category
    try{
        const response = await Note.getByCategory(category)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function update(req, res){
    const id = req.params.id
    const data = req.body
    try {
        const note = await Note.getById(id)
        const response = await note.update(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function destroy(req, res){
    const id = req.params.id
    try {
        const note = await Note.getById(id)
        const response = await note.destroy()
        res.status(204).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})       
    }
}

module.exports = { create, getAll, getById, getByCategory, update, destroy }