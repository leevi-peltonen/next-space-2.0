-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "location" INTEGER[] DEFAULT ARRAY[0, 0, 0]::INTEGER[];

-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "coordinates" INTEGER[];
