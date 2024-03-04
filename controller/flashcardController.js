const Flashcard = require('../models/Flashcard')

async function create(req, res){
    const data = req.body
    try {
        const response = await Flashcard.create(data)
        res.status(201).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}
async function getAllByDeckId(req, res){
    const deck_id = req.params.id
    try {
        const response = await Flashcard.getAllByDeckId(deck_id)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getOneByCardId(req, res){
    const card_id = req.params.id
    try{
        const response = await Flashcard.getOneByCardId(card_id)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function update(req, res){
    const data = req.body
    try {
        const response = await Flashcard.update(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function destroy(req, res){
    const data = req.params.id
    try {
        const response = await Flashcard.destroy(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})       
    }
}

module.exports = { create, getAllByDeckId, getOneByCardId, update, destroy }