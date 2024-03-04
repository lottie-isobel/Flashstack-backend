const flashcardController = require('../../../controllers/flashcardController')
const Flashcard = require('../../../models/Flashcard')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("flashcardController", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAllByDeckId", () => {
        it("Returns all posts", async () => {
            const mockReq = { params: '1'}
            const cards = ['card 1', 'card 2']

            jest.spyOn(Flashcard, 'getAllByDeckId').mockResolvedValue(cards)

            await flashcardController.getAllByDeckId(mockReq, mockRes)
      
            expect(Flashcard.getAllByDeckId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(cards)
        })

        it("Throws an error", async () => {
            const mockReq = {params: '1'}
            jest.spyOn(Flashcard, 'getAllByDeckId').mockRejectedValue(new Error("Failed to get flashcards."))
            
            await flashcardController.getAllByDeckId(mockReq, mockRes)

            expect(Flashcard.getAllByDeckId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get flashcards.'})
        })
    })

    describe("getOneByCardId", () => {
        it("Returns all posts", async () => {
            const mockReq = { params: '1'}
            const card = ['card 1']

            jest.spyOn(Flashcard, 'getOneByCardId').mockResolvedValue(card)

            await flashcardController.getOneByCardId(mockReq, mockRes)
      
            expect(Flashcard.getOneByCardId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(card)
        })

        it("Throws an error", async () => {
            const mockReq = {params: '1'}
            jest.spyOn(Flashcard, 'getOneByCardId').mockRejectedValue(new Error("Failed to get flashcard."))
            
            await flashcardController.getOneByCardId(mockReq, mockRes)

            expect(Flashcard.getOneByCardId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get flashcard.'})
        })
    })

    describe("create", () => {
        it("Returns the creation data", async () => {
            const testCard = { question: 'q', answer: 'a' }
            const mockReq = { body: { testCard }, params: {id: 1} }

            jest.spyOn(Flashcard, 'create').mockResolvedValue(new Flashcard({...testCard, id: 1}))

            await flashcardController.create(mockReq, mockRes)
      
            expect(Flashcard.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(new Flashcard({ ...testCard, id: 1 }))
        })

        it('Returns an error', async () => {
            const testCard = { question: 'q', answer: 'a' }
            const mockReq = { body: { testCard }, params: { id: 1 } }
      
            jest.spyOn(Flashcard, 'create').mockRejectedValue(new Error('Creation failed.'))
      
            await flashcardController.create(mockReq, mockRes)
            
            expect(Flashcard.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Creation failed.' })
        })
    })

    describe ('update', () => {
        it('Modifies an entry', async () => {
          const testCard = { id: 1, question: 'q', answer: 'a' }
          jest.spyOn(Flashcard, 'getOneByCardId').mockResolvedValue(new Flashcard(testCard))
    
          const mockReq = { params: { id: 1 }, body: { question: 'updated q', answer: 'updated a' } }
    
          jest.spyOn(Flashcard.prototype, 'update').mockResolvedValue({ ...new Flashcard(testCard), question: 'updated q', answer: 'updated a' })
    
          await flashcardController.update(mockReq, mockRes)
    
    
          expect(Flashcard.getOneByCardId).toHaveBeenCalledTimes(1)
          expect(Flashcard.prototype.update).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockJson).toHaveBeenCalledWith({ ...new Flashcard(testCard), question: 'updated q', answer: 'updated a' })
        })
    })

    describe('destroy', () => {
        it('Returns destroyed entry', async () => {
            const testCard = { id: 1, question: 'q', answer: 'a' }
            
            jest.spyOn(Flashcard, 'getOneByCardId').mockResolvedValue(new Flashcard(testCard))
      
            jest.spyOn(Flashcard.prototype, 'destroy').mockResolvedValue(new Flashcard(testCard))
      
            const mockReq = { params: { id: 1 } }
            
            await flashcardController.destroy(mockReq, mockRes)
      
            expect(Flashcard.getOneByCardId).toHaveBeenCalledTimes(1)
            expect(Flashcard.prototype.destroy).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockJson).toHaveBeenCalledWith(new Flashcard(testCard))
          })
    })
})