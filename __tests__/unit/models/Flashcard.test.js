const Flashcard = require('../../../models/Flashcard')
const db = require('../../../database/connect')

describe("Flashcard", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAllByDeckId", () => {
        it("Returns all flashcards in a deck", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ question: 'q1', answer: 'a1' }, { question: 'q2', answer: 'a2' }, { question: 'q3', answer: 'a3' }] })
            const cards = await Flashcard.getAllByDeckId()
            expect(cards).toHaveLength(3)
            expect(cards[0]).toHaveProperty('id')
            expect(cards[1].answer).toBe('a2')
        })

        it("Errors out if there aren't any cards", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
            try {
                await Flashcard.getAllByDeckId()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not get flashcards.')
            }
        })
    })

    describe("getOneByCardId", () => {
        it("Returns the card with a given ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, question: 'q', answer: 'a' }] })
            const card = await Flashcard.getOneByCardId(1)
            expect(card).toBeTruthy()
            expect(card).toHaveProperty('id')
            expect(card.answer).toBe('a')
        })

        it("Errors out if there isn't a card", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
            try {
                await Flashcard.getOneByCardId()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not get flashcard.')
            }
        })
    })

    describe("create", () => {
        it("Adds a new entry to the flashcards table", async () => {
            let cardData = { deckid: 1, question: "q", answer: "a" }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...cardData, id: 1 }] })

            const card = await Flashcard.create(cardData)

            expect(card).toBeTruthy()
            expect(card).toHaveProperty('id')
            expect(card).toHaveProperty('question')
            expect(card).toHaveProperty('answer')
        })

        it("Errors out if there's data missing", async () => {
            try {
                await Flashcard.create({})
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Could not create flashcard.')
            }
        })
    })

    describe("update", () => {
        it("Updates a card with new data", async () => {
            const card = new Flashcard({ question: 'q', answer: 'a' })
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, question: 'updated q', answer: 'updated a' }] })

            const updatedCard = await card.update({ question: 'updated q', answer: 'updated a' })

            expect(updatedCard).toBeInstanceOf(Flashcard)
            expect(updatedCard.id).toBe(1)
            expect(updatedCard.question).toBe('updated q')
            expect(updatedCard).not.toEqual(card)
        })

        it('Errors out if update data is missing', async () => {
            try {
              const card = new Flashcard({ question: 'q', answer: 'a' })
              await card.update({ question: 'updated q' });
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toBe('Could not update flashcard.')
            }
        })
    })

    describe ('destroy', () => {
        it('Returns the deleted card', async () => {
          const card = new Flashcard({})
          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, question: 'q', answer: 'a' }] })
    
          const deletedCard = await card.destroy()

          expect(deletedCard).toBeInstanceOf(Flashcard)
          expect(deletedCard.id).toBe(1)
          expect(deletedCard).not.toEqual(card)
        })
    
        it('Errors out if deletion is unsuccessful', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
          try {
            const card = new Flashcard({ question: 'q', answer: 'a' })
            await card.destroy()
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toContain('Could not delete flashcard.')
          }
        })
    })
})