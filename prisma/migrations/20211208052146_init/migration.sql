-- CreateTable
CREATE TABLE "users" (
    "userID" SERIAL NOT NULL,
    "userFullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userPassword" TEXT,
    "userEmailAddress" TEXT NOT NULL,
    "userWebsite" TEXT,

    CONSTRAINT "users_pk" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userid_uindex" ON "users"("userID");
