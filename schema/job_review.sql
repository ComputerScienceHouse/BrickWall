CREATE TYPE JobType AS ENUM ('co-op', 'full-time');
CREATE TABLE "public"."JobReview" (
    id SERIAL PRIMARY KEY NOT NULL,
    member VARCHAR(80) NOT NULL,
    job_type JobType NOT NULL,
    companyId INT NOT NULL REFERENCES "public"."Company" (id),
    start_date DATE NOT NULL,
    end_date DATE,
    body TEXT
);