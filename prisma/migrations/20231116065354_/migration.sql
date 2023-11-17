-- CreateTable
CREATE TABLE "Student" (
    "roll_no" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("roll_no")
);
