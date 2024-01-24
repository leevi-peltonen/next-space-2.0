import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { getSessionUserData } from "@/app/layout";
import { getActiveCharacter } from "../character/page";
import prisma from "@/app/utils/db";
import SpaceMap from "./SpaceMap";
import { revalidatePath } from "next/cache";

export default async function ExplorePage() {
    const user = await getSessionUserData()
    if(!user) return <h1>Not logged in</h1>
    const character = await getActiveCharacter(user.id)
    if(!character) return <h1>No active character</h1>
    const planets = await getDiscoveredPlanets()
    if(!planets) return <h1>No Planets</h1>
    
    return (
        <SpaceContainer>
            <SpaceMap planets={planets} character={character} onMoveEnd={onMoveEnd}  />
        </SpaceContainer>
    )
}

export const getDiscoveredPlanets = async () => {
    'use server'

    const user = await getSessionUserData()
    if(!user) return []

    const character = await getActiveCharacter(user.id)
    if(!character) return []

    
    const planets = await prisma.planet.findMany({
        where: {
            characterId: character.id
        },
        orderBy: {
            tier: 'asc'
        }
    })

    return planets

}

export const onMoveEnd = async (position: {x: number, y:number}, planetsInRange: number[]) => {
    'use server'
    console.log(planetsInRange)
    console.log(position)
    const user = await getSessionUserData()
    if(!user) return

    const character = await getActiveCharacter(user.id)
    if(!character) return

    await prisma.character.update({
        where: {
            id: character.id
        },
        data: {
            location: [position.x, position.y]
        }
    })

    await prisma.planet.updateMany({
        where: {
            characterId: character.id
        },
        data: {
            isInRange: false
        }
    })

    await prisma.planet.updateMany({
        where: {
            id: {
                in: planetsInRange
            }
        },
        data: {
            isInRange: true
        }
    })

    revalidatePath('/explore')
}