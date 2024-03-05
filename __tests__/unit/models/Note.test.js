const Note = require('../../../models/Note')
const db = require('../../../database/connect')

describe('Note', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAll", () => {
        it("should return all notes", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' }, { 'id': 2, 'userid': 1, 'content': 'content2', 'category': 'category2' }, { 'id': 3, 'userid': 1, 'content': 'content3', 'category': 'category3' }] })
            const notes = await Note.getAll()
            expect(notes).toHaveLength(3)
            expect(notes[0]).toHaveProperty('id')
            expect(notes[1].content).toBe('content2')
            expect(notes[2].category).toBe('category3')
        })

        it("Throws an error if there are no notes in the db", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [] })
            try {
                await Note.getAll()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No notes found')
            }
        })
    })

    describe("getById", () => {
        it("should return a note", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' }] })
            const note = await Note.getById(1)
            expect(note).toBeTruthy()
            expect(note).toHaveProperty('id')
            expect(note.content).toBe('content1')
            expect(note.category).toBe('category1')
        })

        it("Throws an error if the note is not found", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [] })
            try {
                await Note.getById()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No Note Found With This Id in the Database')
            }

        })
    })

    describe("getByCategory", () => {
        it("should return all notes in a category", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' }, { 'id': 2, 'userid': 1, 'content': 'content2', 'category': 'category2' }, { 'id': 3, 'userid': 1, 'content': 'content3', 'category': 'category3' }] })
            const notes = await Note.getByCategory('category1', 1)
            expect(notes).toHaveLength(3)
            expect(notes[0]).toHaveProperty('id')
            expect(notes[1].content).toBe('content2')
            expect(notes[2].userid).toBe(1)
        })

        it("Throws an error when there are no notes in the category", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [] })
            try {
                await Note.getByCategory()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No notes found matching this category')
            }
        })
    })

    describe("create", () => {
        it("Adds a new entry to the database", async () => {
            let note = {
                userid: 1,
                content: 'content1',
                category: 'category1'
            }
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ ...note, id: 1 }] })

            const newNote = await Note.create(note)
            expect(newNote).toBeTruthy()
            expect(newNote).toHaveProperty('id')
            expect(newNote.content).toBe('content1')
            expect(newNote.category).toBe('category1')
        })

        it("Throws an error if the data is missing", async () => {
            try {
                await Note.create({})
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe("Could not create note.")
            }
        })
    })

    describe("update", () => {
        it("Updates a note with new data", async () => {
            const note = new Note({
                userid: 1,
                content: 'content1',
                category: 'category1'
            })
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content updated', 'category': 'category updated' }] })

            const updatedNote = await note.update({
                content: 'content updated',
                category: 'category updated'
            })
            expect(updatedNote).toBeInstanceOf(Note)
            expect(updatedNote.id).toBe(1)
            expect(updatedNote.content).toBe('content updated')
            expect(updatedNote.category).toBe('category updated')
        })

        it("Throws an error when update data is missing", async () => {
            try {
                const note = new Note({
                    userid: 1,
                    content: 'content1',
                    category: 'category1'
                })
                await note.update({ content: 'content updated' })
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe("Could not update note.")
            }
        })
    })

    describe("destroy", () => {
        it("Deletes a note from the database", async () => {
            const note = new Note({})
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' }] }) 

            const deletedNote = await note.destroy()
            expect(deletedNote).toBeInstanceOf(Note)
            expect(deletedNote.id).toBe(1)
            expect(deletedNote).not.toEqual(note)
        })

        it('Throws an error if the deletion was unsuccessful', async () => {
            jest.spyOn(db, 'query').mockRejectedValue()
            try{
                const note = new Note({ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' })
                await note.destroy()
            } catch(error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not delete note.')
            }
        })
    })
})
