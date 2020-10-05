CREATE TABLE "public"."City" (
    id SERIAL PRIMARY KEY NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2),
    country VARCHAR(255) NOT NULL
);