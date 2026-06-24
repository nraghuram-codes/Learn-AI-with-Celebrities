-- AlterTable
ALTER TABLE "Course" ADD COLUMN "videoUrl" TEXT,
ADD COLUMN "videoScript" TEXT,
ADD COLUMN "videoStatus" TEXT NOT NULL DEFAULT 'not_generated',
ADD COLUMN "selectedLecturerId" TEXT;
