/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "userFullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userPassword" TEXT,
    "userEmailAddress" TEXT NOT NULL,
    "userWebsite" TEXT,
    "userPhoneNumber" TEXT,

    CONSTRAINT "User_pk" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "expenseID" SERIAL NOT NULL,
    "expenseAuthor" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expenseID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userid_uindex" ON "User"("userID");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseAuthor_fkey" FOREIGN KEY ("expenseAuthor") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
