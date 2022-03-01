/*
  Warnings:

  - You are about to drop the column `addedDate` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expenseAmount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expenseDateDue` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expenseName` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateDue` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "addedDate",
DROP COLUMN "expenseAmount",
DROP COLUMN "expenseDateDue",
DROP COLUMN "expenseName",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateDue" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" RENAME CONSTRAINT "User_pkey" TO "User_pk";

-- RenameIndex
ALTER INDEX "User_id_key" RENAME TO "Users_userid_uindex";
