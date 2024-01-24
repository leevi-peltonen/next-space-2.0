/*
  Warnings:

  - You are about to drop the `PlanetResources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlanetResources" DROP CONSTRAINT "PlanetResources_planetId_fkey";

-- DropForeignKey
ALTER TABLE "PlanetResources" DROP CONSTRAINT "PlanetResources_resourceId_fkey";

-- DropTable
DROP TABLE "PlanetResources";

-- CreateTable
CREATE TABLE "_PlanetToResource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlanetToResource_AB_unique" ON "_PlanetToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanetToResource_B_index" ON "_PlanetToResource"("B");

-- AddForeignKey
ALTER TABLE "_PlanetToResource" ADD CONSTRAINT "_PlanetToResource_A_fkey" FOREIGN KEY ("A") REFERENCES "Planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanetToResource" ADD CONSTRAINT "_PlanetToResource_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
