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
            try{
                await Note.getById()
            } catch(error){
                expect(error).toBeTruthy()
                expect(error.message).toBe('No Note Found With This Id in the Database')
            }

        })
    })

    describe("getByCategory", () => {
        it("should return all notes in a category", async () => {
            jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ 'id': 1, 'userid': 1, 'content': 'content1', 'category': 'category1' }, { 'id': 2, 'userid': 1, 'content': 'content2', 'category': 'category2' }, { 'id': 3, 'userid': 1, 'content': 'content3', 'category': 'category3' }] })
            const notes = await Note.getByCategory('category1', 1)
            expect(notes).toHaveLength(1)
            expect(notes[0]).toHaveProperty('id')
            expect(notes[0].content).toBe('content1')
            expect(notes[0].userid).toBe(1)
        })
    })
})