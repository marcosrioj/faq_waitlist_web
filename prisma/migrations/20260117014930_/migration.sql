/*
  Warnings:

  - You are about to drop the column `desiredPlan` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyVisitsRange` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `segment` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "desiredPlan",
DROP COLUMN "monthlyVisitsRange",
DROP COLUMN "platform",
DROP COLUMN "segment",
DROP COLUMN "website";
