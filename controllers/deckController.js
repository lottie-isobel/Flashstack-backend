const Deck = require("../models/Deck")

async function getAllByUserId(req, res){
    const data = req.params.userid
    try {
        const response = await Deck.getAllByUserId(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getOneByDeckId(req, res){
    const id = req.params.id
    try {
        const response = await Deck.getOneByDeckId(id)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function create(req, res){
    const data = req.body
    try {
        const response = await Deck.create(data)
        res.status(201).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

async function update(req, res){
    const deckid = req.params.id
    const data = req.body
    try {
        const deck = await Deck.getOneByDeckId(deckid)
        const response = await deck.update(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

async function destroy(req, res){
    const id = req.params.id
    try {
        const deck = await Deck.getOneByDeckId(id)
        const response = await deck.destroy()
        res.status(204).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})       
    }
}

module.exports = { getAllByUserId, getOneByDeckId, create, update, destroy }