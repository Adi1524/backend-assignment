/*
  Warnings:

  - Added the required column `country` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `gender` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pincode` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "country" TEXT NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "pincode" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;
