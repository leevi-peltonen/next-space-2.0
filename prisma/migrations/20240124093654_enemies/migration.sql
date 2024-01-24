-- CreateTable
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "maxhealth" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "maxenergy" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnemyToPlanet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_name_key" ON "Enemy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyToPlanet_AB_unique" ON "_EnemyToPlanet"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyToPlanet_B_index" ON "_EnemyToPlanet"("B");

-- AddForeignKey
ALTER TABLE "_EnemyToPlanet" ADD CONSTRAINT "_EnemyToPlanet_A_fkey" FOREIGN KEY ("A") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyToPlanet" ADD CONSTRAINT "_EnemyToPlanet_B_fkey" FOREIGN KEY ("B") REFERENCES "Planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
