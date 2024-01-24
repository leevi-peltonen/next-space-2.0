import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { Enemy, Resource } from "@prisma/client";
import prisma from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { getSessionUserData } from "@/app/layout";
import ModelForm from "./ModelForm";
import { defaultEnemy } from "@/app/models/character";

export default async function AdminPage() {

    const user = await getSessionUserData()
    if(user?.username !== 'Stetu') return <h1>Not authorized</h1>
    const planets = await getAllPlanets()
    const resources = await getAllResources()
    const enemies = await getAllEnemies()
    return (
        <SpaceContainer
            classes="grid grid-cols-2"
        >
            <ModelForm<Enemy>
                title="Enemy"
                model={defaultEnemy}
                onSubmit={addEnemy}
            />
            <ModelForm<Resource>
                title="Resource"
                model={{name: '', tier: 0, id: 0}}
                onSubmit={addResourceToPlanet}
            />

            <form action={connectEnemyToPlanet} className="text-black flex flex-col m-10">
                <h1 className="text-2xl mb-4 text-white">Connect Enemies to planets</h1>
                <select name="planetId" className="my-10">
                    {planets.map(planet => {
                        return (
                            <option key={planet.id} value={planet.id}>{planet.name}</option>
                        )
                    })}
                </select>
                <select name="enemyId">
                    {enemies.map(enemy => {
                        return (
                            <option key={enemy.id} value={enemy.id}>{enemy.name}</option>
                        )
                    })}
                </select>
                <button className="bg-primary text-white rounded-xl px-4 py-2 w-full" type="submit">Connect</button>
            </form>

            <form action={connectResourceToPlanet} className="text-black flex flex-col m-10">
                <h1 className="text-2xl mb-4 text-white">Connect Resources to planets</h1>
                <select name="planetId" className="my-10">
                    {planets.map(planet => {
                        return (
                            <option key={planet.id} value={planet.id}>{planet.name}</option>
                        )
                    })}
                </select>
                <select name="resourceId" >
                    {resources.map(resource => {
                        return (
                            <option key={resource.id} value={resource.id}>{resource.name}</option>
                        )
                    })}
                </select>
                <button className="bg-primary text-white rounded-xl px-4 py-2 w-full" type="submit">Connect</button>
            </form>

        </SpaceContainer>
    )
}

export const addEnemy = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')
    const maxhealth = formData.get('maxhealth')
    const maxenergy = formData.get('maxenergy')
    const strength = formData.get('strength')
    const agility = formData.get('agility')
    const intelligence = formData.get('intelligence')
    const level = formData.get('level')


    if(!name || !maxhealth || !maxenergy || !strength || !agility || !intelligence || !level) throw new Error('Missing data')

    await prisma.enemy.create({
        
        data: {
            name: name as string,
            health: Number(maxhealth),
            maxhealth: Number(maxhealth),
            energy: Number(maxenergy),
            maxenergy: Number(maxenergy),
            strength: Number(strength),
            agility: Number(agility),
            intelligence: Number(intelligence),
            level: Number(level)
        },
        
    })
    revalidatePath('/admin')
}

export const addResourceToPlanet = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')
    const tier = formData.get('tier')


    if(!name || !tier) throw new Error('Missing data')

    await prisma.resource.create({
        
        data: {
            name: name as string,
            tier: Number(tier),
        },
        
    })
    revalidatePath('/admin')
}

export const getAllPlanets = async () => {
    'use server'
    const planets = await prisma.planet.findMany({
        include: {
            resources: true,
            enemies: true
        }
    })
    return planets
}

export const getAllResources = async () => {
    'use server'
    const resources = await prisma.resource.findMany()
    return resources
}

export const getAllEnemies = async () => {
    'use server'
    const enemies = await prisma.enemy.findMany()
    return enemies
}

export const connectEnemyToPlanet = async (formData: FormData) => {
    'use server'

    const planetId = formData.get('planetId')
    const enemyId = formData.get('enemyId')

    if(!planetId || !enemyId) throw new Error('Missing data')

    await prisma.planet.update({
        where: {
            id: Number(planetId)
        },
        data: {
            enemies: {
                connect: {
                    id: Number(enemyId)
                }
            }
        }
    })
    revalidatePath('/admin')
}

export const connectResourceToPlanet = async (formData: FormData) => {
    'use server'

    const planetId = formData.get('planetId')
    const resourceId = formData.get('resourceId')

    if(!planetId || !resourceId) throw new Error('Missing data')

    await prisma.planet.update({
        where: {
            id: Number(planetId)
        },
        data: {
            resources: {
                connect: {
                    id: Number(resourceId)
                }
            }
        }
    })
    revalidatePath('/admin')
}