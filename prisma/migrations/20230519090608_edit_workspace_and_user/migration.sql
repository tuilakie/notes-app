/*
  Warnings:

  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `_WorkspaceUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "_WorkspaceUser" DROP CONSTRAINT "_WorkspaceUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkspaceUser" DROP CONSTRAINT "_WorkspaceUser_B_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "title",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW';

-- DropTable
DROP TABLE "_WorkspaceUser";
