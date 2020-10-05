CREATE TABLE "public"."Interview" (
    id SERIAL PRIMARY KEY NOT NULL,
    member VARCHAR(80) NOT NULL,
    companyId INT NOT NULL REFERENCES "public"."Company" (id),
    interviewCount INT NOT NULL DEFAULT 1,
    codingChallenge BOOLEAN DEFAULT FALSE,
    onSite BOOLEAN DEFAULT FALSE,
    body TEXT
)