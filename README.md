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
| `/` | `GET` | Returns a welcome message to the API. | None
| --- | --- | --- | --- |
| `/card/deck/:id` | `GET` | Returns all flashcards in the given deck. | None
| `/card/deck/:id` | `POST` | Creates a new flashcard inside the given deck. | question (str), answer (str)
| `/card/:id` | `GET` | Returns data of given card. | None
| `/card/:id` | `PATCH` | Updates data of given card. | question (str), answer (str)
| `/card/:id` | `DELETE` | Deletes given card. | None
| --- | --- | --- | --- |
| `/deck` | `GET` | Returns all decks belonging to given user. | userid (int)
| `/deck/:id` | `GET` | Returns data of given deck. | None
| `/deck` | `POST` | Creates a new deck belonging to given user. | name (str), userid (int)
| `/deck/:id` | `PATCH` | Updates data of given deck. | name (str)
| `/deck/:id` | `DELETE` | Deletes given deck. | None
| --- | --- | --- | --- |
| `/note/all` | `GET` | Returns all notes of given user. | userid (int)
| `/note/category` | `GET` | Returns all notes of a given user in a given category. | userid (int), category (str)
| `/note/:id` | `GET` | Returns the data of a given note. | None
| `/note/:id` | `PATCH` | Updates the data of a given note. | content (str), category (str)
| `/note` | `POST` | Creates a new note for a given user. | userid (int), content (str), category (str)
| --- | --- | --- | --- |
| `/user` | `GET` | Gets user data linked to given token. | token (str)
| `/user/register` | `POST` | Creates a new user. | first_name (str), last_name (str), email (str), password (str)
| `/user/login` | `POST` | Creates a new token. | email (str), password (str)
| `/user/logout` | `DELETE` | Deletes the current token. | token (str)


