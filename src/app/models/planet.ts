import { Planet } from "@prisma/client";

export const defaultPlanet: Planet = {
    id: 0,
    name: "Alpha Earth",
    tier: 1,
    coordinates: [0, 0],
    characterId: 0
}