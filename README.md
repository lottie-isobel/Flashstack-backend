# Flashstack - Backend

## Instructions for local use

1. Run `npm install` in `/`.
2. Create a file in `/` named `.env`.
3. Inside `.env`, add the following lines:
    ```
    DB_URL=<the URL of your postgres database>
    PORT=<the port you want the API to run on>
    ```
4. Run `npm run setup-db` to prepare the database.
5. Run `npm run start` to start the API.

## Routes


| Route | Method | Response | Body Input Parameters
| --- | --- | --- | --- |
| `/card/deck/:id` | `GET` | Returns all flashcards in the given deck. | None
| `/card/deck/:id` | `POST` | Creates a new flashcard inside the given deck. | question (str), answer (str)
| `/card/:id` | `GET` | Returns data of given card. | None
| `/card/:id` | `PATCH` | Updates data of given card. | question (str), answer (str)
| `/card/:id` | `DELETE` | Deletes given card. | None
| `/deck` | `GET` | Returns all decks belonging to given user. | userid (int)
| `/deck/:id` | `GET` | Returns data of given deck. | None
| `/deck` | `POST` | Creates a new deck belonging to given user. | name (str), userid (int)
| `/deck/:id` | `PATCH` | Updates data of given deck. | name (str)
| `/deck/:id` | `DELETE` | Deletes given deck. | None

