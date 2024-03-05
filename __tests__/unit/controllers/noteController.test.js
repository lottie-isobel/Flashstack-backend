const noteController = require('../../../controllers/noteController')
const Note = require('../../../models/Note')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("noteController", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAll", () => {
        it("Returns all notes", async () => {
            mockReq = { params: 1 }
            notes = ['note1', 'note2']
            jest.spyOn(Note, 'getAll').mockResolvedValue(notes)
            await noteController.getAll(mockReq, mockRes)

            expect(Note.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(notes)
        })

        it("Throws an error", async () => {
            const mockReq = { params: '1' }
            jest.spyOn(Note, 'getAll').mockRejectedValue(new Error("No notes found"))

            await noteController.getAll(mockReq, mockRes)

            expect(Note.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No notes found' })
        })
    })

    describe("getById", () => {
        it("Returns a note", async () => {
            const mockReq = { params: '1' }
            const note = ['note1']
            jest.spyOn(Note, 'getById').mockResolvedValue(note)

            await noteController.getById(mockReq, mockRes)

            expect(Note.getById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(note)
        })

        it("Throws an error", async () => {
            const mockReq = { params: '1' }
            jest.spyOn(Note, 'getById').mockRejectedValue(new Error("No Note Found With This Id in the Database"))

            await noteController.getById(mockReq, mockRes)

            expect(Note.getById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No Note Found With This Id in the Database' })
        })

    })

    describe("getByCategory", () => {
        it("Returns notes by category", async () => {
            const testCategory = { 'category': 'test'}
            const mockReq = { params: '1', body: { testCategory } }
            const notes = ['note1', 'note2']
            jest.spyOn(Note, 'getByCategory').mockResolvedValue(notes)

            await noteController.getByCategory(mockReq, mockRes)

            expect(Note.getByCategory).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(notes)
        })

        it("Throws an error", async () => {
            const testCategory = { 'category': 'test'}
            const mockReq = { params: '1' , body: { testCategory } }
            jest.spyOn(Note, 'getByCategory').mockRejectedValue(new Error("No notes found matching this category"))

            await noteController.getByCategory(mockReq, mockRes)

            expect(Note.getByCategory).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No notes found matching this category' })
        })
    })

    describe("create", () => {
        it("Creates a note", async () => {
            const mockReq = { body: { 'user_id': 1, 'category': 'test category', 'content': 'test content' } }
            const note = { 'user_id': 1, 'category': 'test category', 'content': 'test content' }
            jest.spyOn(Note, 'create').mockResolvedValue(note)

            await noteController.create(mockReq, mockRes)

            expect(Note.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(note)
        })

        it("Returns an error", async () => {
            const testNote = { 'user_id': 2, 'category': 'test fail category', 'content': 'test fail content' }
            jest.spyOn(Note, 'create').mockRejectedValue(new Error("Could not create note."))

            await noteController.create(testNote, mockRes)

            expect(Note.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith( { error: "Could not create note." })
        })
    })

    describe("update", () => {
        it("Modifies a note", async () => {
            const note = { 'id': '1', 'user_id': 1, 'category': 'test category', 'content': 'test content' }
            jest.spyOn(Note, 'getById').mockResolvedValue(new Note(note))

            const mockReq = { params : { id: 1 }, body: { 'category': 'test updated category', 'content': 'test updated content' }}
            jest.spyOn(Note.prototype, 'update').mockResolvedValue({...new Note(note), ...mockReq.body})


            await noteController.update(mockReq, mockRes)

            expect(Note.getById).toHaveBeenCalledTimes(1)
            expect(Note.prototype.update).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({...new Note(note), ...mockReq.body})
        }) 
    }) 

    describe("destroy", () => {
        it("Returns a destroyed note", async () => {
            const note = { 'id': '1', 'user_id': 1, 'category': 'test category', 'content': 'test content' }

            jest.spyOn(Note, 'getById').mockResolvedValue(new Note(note))
            jest.spyOn(Note.prototype, 'destroy').mockResolvedValue(new Note(note))

            const mockReq = { params: { id: 1 } }

            await noteController.destroy(mockReq, mockRes)

            expect (Note.getById).toHaveBeenCalledTimes(1)
            expect (Note.prototype.destroy).toHaveBeenCalledTimes(1)
            expect (mockStatus).toHaveBeenCalledWith(204)
            expect (mockJson).toHaveBeenCalledWith(new Note(note))

        })
    })
})