/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `medication` on the `Prescription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slotId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[preferedTimeId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferedTimeId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Made the column `dateOfBirth` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `medicines` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
ADD COLUMN     "slotId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "preferedTimeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "medicalHistory",
ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "medication",
ADD COLUMN     "medicines" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PreferedTime" (
    "id" SERIAL NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "PreferedTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_slotId_key" ON "Appointment"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_preferedTimeId_key" ON "Doctor"("preferedTimeId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_preferedTimeId_fkey" FOREIGN KEY ("preferedTimeId") REFERENCES "PreferedTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
