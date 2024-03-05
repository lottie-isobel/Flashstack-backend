const deckController= require('../../../controllers/deckController')
const Deck = require('../../../models/Deck')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("deckController", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAllByUserId", () => {
        it("Returns all decks", async () => {
            const mockReq = { params: '1'}
            const decks = ['deck 1', 'deck 2']

            jest.spyOn(Deck, 'getAllByUserId').mockResolvedValue(decks)

            await deckController.getAllByUserId(mockReq, mockRes)
      
            expect(Deck.getAllByUserId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(decks)
        })

        it("Throws an error", async () => {
            const mockReq = {params: '1'}
            jest.spyOn(Deck, 'getAllByUserId').mockRejectedValue(new Error("Failed to get decks."))
            
            await deckController.getAllByUserId(mockReq, mockRes)

            expect(Deck.getAllByUserId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get decks.'})
        })
    })

    describe("getOneByDeckId", () => {
        it("Returns a deck", async () => {
            const mockReq = { params: '1'}
            const deck = ['deck 1']

            jest.spyOn(Deck, 'getOneByDeckId').mockResolvedValue(deck)

            await deckController.getOneByDeckId(mockReq, mockRes)
      
            expect(Deck.getOneByDeckId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(deck)
        })

        it("Throws an error", async () => {
            const mockReq = {params: '1'}
            jest.spyOn(Deck, 'getOneByDeckId').mockRejectedValue(new Error("Failed to get Deck."))
            
            await deckController.getOneByDeckId(mockReq, mockRes)

            expect(Deck.getOneByDeckId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get Deck.'})
        })
    })

    describe("create", () => {
        it("Returns the creation data", async () => {
            const testDeck = { name: 'n' }
            const mockReq = { body: { testDeck }, params: {id: 1} }

            jest.spyOn(Deck, 'create').mockResolvedValue(new Deck({...testDeck, deckid: 1}))

            await deckController.create(mockReq, mockRes)
      
            expect(Deck.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(new Deck({ ...testDeck, deckid: 1 }))
        })

        it('Returns an error', async () => {
            const testDeck = { name: 'n' }
            const mockReq = { body: { testDeck }, params: { deckid: 1 } }
      
            jest.spyOn(Deck, 'create').mockRejectedValue(new Error('Creation failed.'))
      
            await deckController.create(mockReq, mockRes)
            
            expect(Deck.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Creation failed.' })
        })
    })

    describe ('update', () => {
        it('Modifies an entry', async () => {
          const testDeck = { deckid: 1, name: 'n' }
          jest.spyOn(Deck, 'getOneByDeckId').mockResolvedValue(new Deck(testDeck))
    
          const mockReq = { params: { id: 1 }, body: { name: 'updated n' } }
    
          jest.spyOn(Deck.prototype, 'update').mockResolvedValue({ ...new Deck(testDeck), name: 'updated n' })
    
          await deckController.update(mockReq, mockRes)
    
          expect(Deck.getOneByDeckId).toHaveBeenCalledTimes(1)
          expect(Deck.prototype.update).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockJson).toHaveBeenCalledWith({ ...new Deck(testDeck), name: 'updated n' })
        })
    })

    describe('destroy', () => {
        it('Returns destroyed entry', async () => {
            const testDeck = { deckid: 1, name: 'n' }
            
            jest.spyOn(Deck, 'getOneByDeckId').mockResolvedValue(new Deck(testDeck))
      
            jest.spyOn(Deck.prototype, 'destroy').mockResolvedValue(new Deck(testDeck))
      
            const mockReq = { params: { id: 1 } }
            
            await deckController.destroy(mockReq, mockRes)
      
            expect(Deck.getOneByDeckId).toHaveBeenCalledTimes(1)
            expect(Deck.prototype.destroy).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockJson).toHaveBeenCalledWith(new Deck(testDeck))
          })
    })
})