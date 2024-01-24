import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { Planet } from "@prisma/client";
import prisma from "@/app/utils/db";
import { getSessionUserData } from "@/app/layout";
import { getActiveCharacter } from "../character/page";

export default async function PlanetPage() {

    const user = await getSessionUserData()
    if(!user) return <h1>Not logged in</h1>

    const character = await getActiveCharacter(user.id)

    if(!character) return <h1>No active character</h1>
    const planet = await getPlanet(character.location)
    if(!planet) return <h1>Planet not found</h1>

    return (
        <SpaceContainer>
            <h1 
                className="text-4xl text-white text-center"
            >{planet.name}</h1>
            {planet.resources.map(resource => {
                return (
                    <div key={resource.id} className="bg-background rounded-xl m-10 p-10 hover:cursor-pointer hover:bg-gray-700">
                        <h1>{resource.name} - Tier {resource.tier}</h1>
                    </div>
                )
            })}

        </SpaceContainer>
    )
}

export const getPlanet = async (location: number[]) => {
    'use server'

    const user = await getSessionUserData()
    if(!user) return null

    const character = await getActiveCharacter(user.id)
    if(!character) return null

    const planet = await prisma.planet.findFirst({
        include: {
            resources: true
        },
        where: {
            coordinates: {
                equals: location
            }
        }
    })

    return planet
}