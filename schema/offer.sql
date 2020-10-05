CREATE TYPE Housing AS ENUM ('corporate', 'stipend');
CREATE TYPE PayType AS ENUM ('salary', 'hourly');
CREATE TABLE "public"."Offer" (
  id SERIAL PRIMARY KEY NOT NULL,
  member VARCHAR(80) NOT NULL,
  companyId INT NOT NULL references "public"."Company" (id),
  pay DECIMAL NOT NULL,
  payType PayType NOT NULL,
  offerDate TIMESTAMP,
  offerDeadline TIMESTAMP,
  housing Housing,
  stipend DECIMAL NOT NULL DEFAULT 0,
  cityId INT references "public"."City" (id)
);