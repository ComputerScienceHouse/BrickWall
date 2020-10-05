CREATE TABLE "public"."Company" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  website VARCHAR(255) UNIQUE,
  headquarters INT references "public"."City" (id),
  glassdoor VARCHAR(255) UNIQUE
);