/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryID` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expenseAddedDate` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expenseID` on the `Expense` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmailAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userFullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userWebsite` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_expenseID_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_expenseAuthor_fkey";

-- DropIndex
DROP INDEX "Users_userid_uindex";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "categoryID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_pkey",
DROP COLUMN "expenseAddedDate",
DROP COLUMN "expenseID",
ADD COLUMN     "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pk",
DROP COLUMN "userEmailAddress",
DROP COLUMN "userFullName",
DROP COLUMN "userID",
DROP COLUMN "userPassword",
DROP COLUMN "userPhoneNumber",
DROP COLUMN "userWebsite",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "website" TEXT,
ADD CONSTRAINT "User_pk" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userid_uindex" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseAuthor_fkey" FOREIGN KEY ("expenseAuthor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_expenseID_fkey" FOREIGN KEY ("expenseID") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
