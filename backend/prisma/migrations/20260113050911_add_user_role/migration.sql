/*
 Warnings:
 
 - The `provider` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 
 */
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'admin');
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('local', 'google');
-- AlterTable
ALTER TABLE "User"
ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'student',
  DROP COLUMN "provider",
  ADD COLUMN "provider" "AuthProvider" NOT NULL DEFAULT 'local';