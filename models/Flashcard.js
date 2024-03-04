const db = require('../database/connect.js')

class Flashcard {
    constructor(id, question, answer, deck_id){
        id = this.id
        question = this.question
        answer = this.answer
        deck_id = this.deckid
    }

    static async getAllByDeckId(data) {
        try {
            const deck_id = data
            const response = await db.query("SELECT * FROM flashcards WHERE deckid = $1", [deck_id])
            if(response.rows.length === 0){
                return new Error("No flashcards found in this Flashstack.")
            }
        return response.rows.map(f => new Flashcard(f))
        } catch (error) {
            throw new Error("Could not get flashcards.")
        }
    }
    
    static async getOneByCardId(data){
        try {
            const card_id = data
            const response = await db.query("SELECT * FROM flashcards WHERE id = $1", [card_id])
            if(response.rows.length === 0){
                return new Error("No flashcard found by that ID.")
            }
        return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not get flashcard.")
        }
    }

    static async create(data){
        try {
            const {card_id, question, answer, deck_id} = data
            const response = await db.query("INSERT INTO flashcards (id, question, answer, deckid) VALUES ($1, $2, $3, $4) RETURNING *", [card_id, question, answer, deck_id])
        return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not create flashcard.")
        }
    }

    async update(data){
        try {
            const {question, answer} = data
            const response = await db.query("UPDATE flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *", [question, answer, this.id])
            return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not update flashcard.")
        }
    }

    async destroy(){
        try {
            const card_id = this.id
            const response = await db.query("DELETE FROM flashcards WHERE id = $1 RETURNING *", [card_id])
            return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not delete flashcard.")
        }
    }
}

module.exports = Flashcard