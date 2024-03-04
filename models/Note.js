const db = require("../database/connect")

class Note {
    constructor({
        id,
        userid,
        content,
        category
    }) {
        this.id = id
        this.userid = userid
        this.content = content
        this.category = category
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM notes"
        )
        if (response.rows.length === 0) {
            throw new Error("No notes found");
        }

        return response.rows.map(n => new Note(n));
    }

    static async getByCategory(category) {
        const response = await db.query(
            "SELECT * FROM notes WHERE category LIKE $1", [category]
        )
        if (response.rows.length === 0) {
            throw new Error("No notes found matching this category");
        }
        return response.rows.map(n => new Note(n));
    }

    static async getByd(id){
        const response = await db.query(
            "SELECT * FROM notes WHERE id = $1", [id]
        )
        if (response.rows.length === 0) {
            throw new Error("No Note Found With This Id in the Database");
        }
        return response.rows.map(n => new Note(n));
    }
}

module.exports = Note