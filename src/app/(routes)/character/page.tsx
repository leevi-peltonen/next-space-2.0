
import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { Character } from "@prisma/client";
import prisma from "@/app/utils/db";
import { getSessionUserData } from "@/app/layout";
import CharacterList from "./CharacterList";
import { defaultStats } from "@/app/models/character";
import { revalidatePath } from 'next/cache'

export default async function CharacterPage() {

    const user = await getSessionUserData()
    if(!user) return <h1>Not logged in</h1>
    const characters = await getAllCharacters(user.id)

    return (
        <SpaceContainer>
            <section>
                <CharacterList characters={characters} changeCharacter={changeActiveCharacter} />
            </section>
            <section>
                <form action={createCharacter}>
                    <p>{characters.length} / 3 characters created</p>
                    <input type="text" name="charactername" className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"/>
                    <button type="submit" className="bg-primary text-white rounded-xl px-4 py-2 w-full">Create Character</button>
                </form>
            </section>
        </SpaceContainer>
    )
}

export const getAllCharacters = async (id: number) => {
    'use server'
    const characters: Character[] = await prisma.character.findMany({
        where: {
            userId: id
        },
        orderBy: {
            id: 'asc'
        }
    })
    return characters
}

export const getActiveCharacter = async (id: number) => {
    'use server'
    const character = await prisma.character.findFirst({
        where: {
            userId: id,
            isActive: true
        }
    })
    return character
}

export const createCharacter = async (formData: FormData) => {
    'use server'

    const user = await getSessionUserData()
    if(!user) throw new Error('Not logged in')
    const characterName = formData.get('charactername') as string
    if(!characterName) throw new Error('Invalid character name')

    const characters = await getAllCharacters(user.id)
    if(characters.length >= 3) throw new Error('Max characters reached')

    const character = await prisma.character.create({
        data: {
            ...defaultStats,
            name: characterName,
            userId: user.id
        }
    })

    await prisma.planet.create({
        data: {
            name: 'Alpha Earth',
            tier: 1,
            coordinates: [600, 400],
            characterId: character.id,
        }
    })

    revalidatePath('/character')
}

export const changeActiveCharacter = async (id: number) => {
    'use server'
    const user = await getSessionUserData()
    if(!user) throw new Error('Not logged in')

    await prisma.character.updateMany({
        where: {
            userId: user.id
        },
        data: {
            isActive: false
        }
    })

    await prisma.character.update({
        where: {
            id
        },
        data: {
            isActive: true
        }
    })
    revalidatePath('/character')
}