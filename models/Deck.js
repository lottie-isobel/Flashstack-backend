const db = require('../database/connect.js')

class Deck {
    constructor({deckid, name, userid}){
        this.deckid = deckid
        this.name = name
        this.userid = userid
    }

    static async getAllByUserId(data) {
        try {
            const userid = data
            const response = await db.query("SELECT * FROM decks WHERE userid = $1", [userid])
            return(response.rows.map(d => new Deck(d)))
        } catch (error) {
            throw new Error("Could not get decks.")
        }
    }

    static async getOneByDeckId(data){
        try {
            const deckid = data
            const response = await db.query("SELECT * FROM decks WHERE deckid = $1", [deckid])
            return new Deck(response.rows[0])
        } catch (error) {
            throw new Error("Could not get deck.")
        }
    }

    static async create(data){
        try {
            const { name, userid } = data
            const response = await db.query("INSERT INTO decks (name, userid) VALUES ($1, $2) RETURNING *", [name, userid])
            return new Deck(response.rows[0])
        } catch (error) {
            throw new Error("Could not create deck.")
        }
    }

    async update(data){
        try {
            const { name } = data
            const response = await db.query("UPDATE decks SET name = $1 WHERE deckid = $2 RETURNING *", [name, this.deckid])
            return new Deck(response.rows[0])
        } catch (error) {
            throw new Error("Could not update deck.")
        }
    }
    
    async destroy(){
        try {
            const deckid = this.deckid
            const response = await db.query("DELETE FROM decks WHERE deckid = $1 RETURNING *", [deckid])
            return new Deck(response.rows[0])
        } catch (error) {
            throw new Error("Could not delete deck.")
        }
    }
}

module.exports = Deck