import { Enemy } from "@prisma/client"
export const defaultStats = {
    health: 100,
    maxhealth: 100,
    energy: 10,
    maxenergy: 10,
    strength: 1,
    agility: 1,
    intelligence: 1,
    level: 1
}

export const defaultEnemy: Enemy = {
    name: 'Goblin',
    id: 0,
    health: 0,
    maxhealth: 0,
    energy: 0,
    maxenergy: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    level: 0
}

