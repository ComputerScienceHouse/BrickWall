# Migration `20201006032053-adding-position`

This migration has been generated by Devin Matte at 10/5/2020, 11:20:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Interview" ADD COLUMN "positionId" integer   NOT NULL 

ALTER TABLE "public"."JobReview" DROP COLUMN "job_type",
ADD COLUMN "positionId" integer   NOT NULL 

ALTER TABLE "public"."Offer" ADD COLUMN "body" text   ,
ADD COLUMN "positionId" integer   NOT NULL 

CREATE TABLE "public"."Position" (
"id" SERIAL,
"title" text   NOT NULL ,
"job_type" "jobtype"  NOT NULL ,
"companyId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Position" ADD FOREIGN KEY ("companyId")REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Interview" ADD FOREIGN KEY ("positionId")REFERENCES "public"."Position"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."JobReview" ADD FOREIGN KEY ("positionId")REFERENCES "public"."Position"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Offer" ADD FOREIGN KEY ("positionId")REFERENCES "public"."Position"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201005193035-initial..20201006032053-adding-position
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model City {
   id       Int       @id @default(autoincrement())
@@ -24,14 +24,23 @@
   glassdoor    String?     @unique
   Interviews   Interview[]
   JobReviews   JobReview[]
   Offers       Offer[]
+  Positions    Position[]
 }
+model Position {
+  id              Int      @id @default(autoincrement())
+  company         Company
+  title           String
+  job_type        jobtype
+}
+
 model Interview {
   id              Int      @id @default(autoincrement())
   member          String
   company         Company
+  position        Position
   interviewcount  Int      @default(1)
   codingchallenge Boolean? @default(false)
   onsite          Boolean? @default(false)
   body            String?
@@ -39,9 +48,9 @@
 model JobReview {
   id         Int       @id @default(autoincrement())
   member     String
-  job_type   jobtype
+  position   Position
   company    Company
   start_date DateTime
   end_date   DateTime?
   body       String?
@@ -51,14 +60,16 @@
   id            Int       @id @default(autoincrement())
   member        String
   pay           Float
   paytype       paytype
+  position      Position
   offerdate     DateTime?
   offerdeadline DateTime?
   housing       housing?
   stipend       Float     @default(0)
   city          City?
   company       Company
+  body          String?
 }
 enum housing {
   corporate
```


