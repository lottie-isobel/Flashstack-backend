const Deck = require('../../../models/Deck')
const db = require('../../../database/connect')

describe("Deck", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAllByUserId", () => {
        it("Returns all decks belonging to a user", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }] })
            const decks = await Deck.getAllByUserId(1)
            expect(decks).toHaveLength(3)
            expect(decks[0]).toHaveProperty('deckid')
            expect(decks[1].name).toBe('n2')
        })

        it("Errors out if there aren't any cards", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
            try {
                await Deck.getAllByUserId()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not get decks.')
            }
        })
    })

    describe("getOneByDeckId", () => {
        it("Returns the deck with a given ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ deckid: 1, name: 'n1' }] })
            const deck = await Deck.getOneByDeckId(1)
            expect(deck).toBeTruthy()
            expect(deck).toHaveProperty('deckid')
            expect(deck.name).toBe('n1')
        })
    
        it("Errors out if there isn't a card", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
            try {
                await Deck.getOneByDeckId(1)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not get deck.')
            }
        })
    })

    describe("create", () => {
        it("Adds a new entry to the decks table", async () => {
            let deckData = { name: 'n', userid: 1 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...deckData, deckid: 1 }] })

            const deck = await Deck.create(deckData)

            expect(deck).toBeTruthy()
            expect(deck).toHaveProperty('deckid')
            expect(deck).toHaveProperty('name')
        })

        it("Errors out if there's data missing", async () => {
            try {
                await Deck.create({})
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not create deck.')
            }
        })
    })

    describe("update", () => {
        it("Updates a deck with new data", async () => {
            const deck = new Deck({ name: 'n' })
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ deckid: 1, name: 'updated n' }] })

            const updatedDeck = await deck.update({ name: 'updated n' })

            expect(updatedDeck).toBeInstanceOf(Deck)
            expect(updatedDeck.deckid).toBe(1)
            expect(updatedDeck.name).toBe('updated n')
            expect(updatedDeck).not.toEqual(deck)
        })

        it('Errors out if update data is missing', async () => {
            try {
              const deck = new Deck({ name: 'n' })
              await deck.update({ name: 'updated n' });
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toBe('Could not update deck.')
            }
        })
    })

    describe ('destroy', () => {
        it('Returns the deleted deck', async () => {
          const deck = new Deck({})
          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ deckid: 1, name: 'n' }] })
    
          const deletedDeck = await deck.destroy()

          expect(deletedDeck).toBeInstanceOf(Deck)
          expect(deletedDeck.deckid).toBe(1)
          expect(deletedDeck).not.toEqual(deck)
        })
    
        it('Errors out if deletion is unsuccessful', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
          try {
            const deck = new Deck({ name: 'n' })
            await deck.destroy()
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toContain('Could not delete deck.')
          }
        })
    })
})