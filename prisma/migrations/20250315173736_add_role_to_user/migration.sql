-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'member';
