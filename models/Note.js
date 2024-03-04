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

    static async getByd(id) {
        const response = await db.query(
            "SELECT * FROM notes WHERE id = $1", [id]
        )
        if (response.rows.length === 0) {
            throw new Error("No Note Found With This Id in the Database");
        }
        return response.rows.map(n => new Note(n));
    }

    static async create(data) {
        try {
            const { userid, content, category } = data
            const response = await db.query("INSERT INTO notes (userid, content, category) VALUES ($1, $2, $3) RETURNING *", [userid, content, category])
            return new Note(response.rows[0])
        } catch (error) {
            throw new Error("Could not create note.")
        }
    }

    async update(data) {
        try {
            const { content, category } = data
            const response = await db.query("UPDATE notes SET content = $1, category = $2 WHERE id = $3 RETURNING *", [content, category, this.id])
            return new Note(response.rows[0])
        } catch (error) {
            throw new Error("Could not update note.")
        }
    }

    async destroy() {
        try {
            const note_id = this.id
            const response = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [note_id])
            return new Note(response.rows[0])
        } catch (error) {
            throw new Error("Could not delete note.")
        }
    }
}

module.exports = Note