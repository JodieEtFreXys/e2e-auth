/*
  Warnings:

  - You are about to drop the column `nik` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."user_nik_key";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "nik";
