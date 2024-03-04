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


| Route | Method | Response |
| --- | --- | --- |
| `/cards/deck/:id` | `GET` | Returns all flashcards in the given deck. |
| `/cards/deck/:id` | `POST` | Creates a new flashcard inside the given deck. |
| `/cards/:id` | `GET` | Returns data of given card. |
| `/cards/:id` | `PATCH` | Updates data of given card. |
| `/cards/:id` | `DELETE` | Deletes given card. |