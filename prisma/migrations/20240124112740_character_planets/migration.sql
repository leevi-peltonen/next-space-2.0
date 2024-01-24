-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "characterId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
