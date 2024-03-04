DROP TABLE IF EXISTS "flashcards";
DROP TABLE IF EXISTS "decks";
DROP TABLE IF EXISTS "notes";
DROP TABLE IF EXISTS "tokens";
DROP TABLE IF EXISTS "users";

CREATE TABLE "tokens"(
    "tokenid" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "userid" INTEGER NOT NULL
);

ALTER TABLE
    "tokens" ADD PRIMARY KEY("tokenid");

CREATE TABLE "users"(
    "userid" INTEGER NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "users" ADD PRIMARY KEY("userid");

CREATE TABLE "notes"(
    "id" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "notes" ADD PRIMARY KEY("id");

CREATE TABLE "flashcards"(
    "id" INTEGER NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "deckid" INTEGER NOT NULL
);

ALTER TABLE
    "flashcards" ADD PRIMARY KEY("id");

CREATE TABLE "decks"(
    "deckid" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userid" INTEGER NOT NULL
);

ALTER TABLE
    "decks" ADD PRIMARY KEY("deckid");

ALTER TABLE
    "flashcards" ADD CONSTRAINT "flashcards_deckid_foreign" FOREIGN KEY("deckid") REFERENCES "decks"("deckid");
ALTER TABLE
    "notes" ADD CONSTRAINT "notes_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid");
ALTER TABLE
    "decks" ADD CONSTRAINT "decks_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid");
ALTER TABLE
    "tokens" ADD CONSTRAINT "tokens_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid");