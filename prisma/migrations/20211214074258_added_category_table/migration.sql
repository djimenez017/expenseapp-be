/*
  Warnings:

  - Added the required column `expenseAmount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseDateDue` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseName` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "expenseAddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expenseAmount" INTEGER NOT NULL,
ADD COLUMN     "expenseDateDue" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expenseName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "categoryID" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "expenseID" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryID")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_expenseID_fkey" FOREIGN KEY ("expenseID") REFERENCES "Expense"("expenseID") ON DELETE RESTRICT ON UPDATE CASCADE;
