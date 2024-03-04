const db = require('../database/connect.js')

class Flashcard {
    constructor({ id, question, answer, deckid }) {
        this.id = id
        this.question = question
        this.answer = answer
        this.deckid = deckid
    }

    static async getAllByDeckId(data) {
        try {
            const deck_id = data
            const response = await db.query("SELECT * FROM flashcards WHERE deckid = $1", [deck_id])
            return response.rows.map(f => new Flashcard(f))
        } catch (error) {
            throw new Error("Could not get flashcards.")
        }
    }

    static async getOneByCardId(data) {
        try {
            const card_id = data
            const response = await db.query("SELECT * FROM flashcards WHERE id = $1", [card_id])
            return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not get flashcard.")
        }
    }

    static async create(data, id) {
        try {
            const deck_id = id
            const { question, answer } = data
            const response = await db.query("INSERT INTO flashcards (question, answer, deckid) VALUES ($1, $2, $3) RETURNING *", [question, answer, deck_id])
            return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not create flashcard.")
        }
    }

    async update(data) {
        try {
            const { question, answer } = data
            const response = await db.query("UPDATE flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *", [question, answer, this.id])
            return new Flashcard(response.rows[0])
        } catch (error) {
            throw new Error("Could not update flashcard.")
        }
    }

    async destroy() {
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