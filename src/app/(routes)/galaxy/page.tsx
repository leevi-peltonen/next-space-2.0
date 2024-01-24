import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { getSessionUserData } from "@/app/layout";
import { getActiveCharacter } from "../character/page";
import prisma from "@/app/utils/db";
import PlanetBox from "./PlanetBox";
import { revalidatePath } from "next/cache";


export default async function GalaxyPage() {
    
    const planets = await getAllAvailablePlanets()
    const user = await getSessionUserData()
    if(!user) return <h1>Not logged in</h1>
    const character = await getActiveCharacter(user.id)
    if(!character) return <h1>No active character</h1>
    return (
        <SpaceContainer
            classes="grid grid-cols-4 gap-10"
        >
            {planets.map(planet => {
                return (
                    <PlanetBox planet={planet} key={planet.id} travelToPlanet={travelToPlanet} currentLocation={character.location} speed={character.travelSpeed} />
                )
            })}
        </SpaceContainer>
    )
}

export const getAllAvailablePlanets = async () => {
    'use server'

    const user = await getSessionUserData()
    if(!user) return []

    const character = await getActiveCharacter(user.id)
    if(!character) return []


    const planets = prisma.planet.findMany({
        where: {
            isInRange: true
        },
        orderBy: {
            tier: 'asc'
        }

    })

    return planets
}

export const travelToPlanet = async (planetId: number) => {
    'use server'

    const user = await getSessionUserData()
    if(!user) throw new Error('Not logged in')

    const character = await getActiveCharacter(user.id)
    if(!character) throw new Error('No active character')

    const planet = await prisma.planet.findFirst({
        where: {
            id: planetId
        }
    })

    if(!planet) throw new Error('Planet not found')

    const newLocation = planet.coordinates

    const updatedCharacter = await prisma.character.update({
        where: {
            id: character.id
        },
        data: {
            location: newLocation
        }
    })
    revalidatePath('/galaxy')
    return updatedCharacter
}