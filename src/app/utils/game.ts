import { Planet } from "@prisma/client";

export const isOnPlanet = (planet: Planet, location: number[]): Boolean => {
    return planet.coordinates[0] === location[0] && planet.coordinates[1] === location[1]
}

export const getDistance = (location1: number[], location2: number[]): number => {
    return Math.floor(Math.sqrt(Math.pow(location1[0] - location2[0], 2) + Math.pow(location1[1] - location2[1], 2)))
}