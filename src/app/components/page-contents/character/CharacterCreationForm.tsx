'use client'
import { Character } from "@prisma/client"
import { navigate } from "@/app/utils/actions";
import { useUserStore, useCharacterStore } from "@/app/hooks/useStore";
import { defaultStats } from "@/app/models/character";
import toast from "react-hot-toast";

const CharacterCreationForm = () => {
    const { user } = useUserStore()
    const { addCharacter } = useCharacterStore()
    if (!user) {
        return <></>
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const characterName = e.currentTarget.character.value
        const response = await fetch('/api/character/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ character: {name: characterName, userId: user.id, ...defaultStats, createdAt: new Date().toISOString()} })
        })



        if(response.status === 201) {
            toast.success('Character created')
        } else {
            console.log(response)
            return
        }
  
        const character: Character = await response.json()
        addCharacter(character)
        navigate('/character')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-secondary min-h-full flex flex-col items-center justify-center shadow-md rounded-xl px-8 py-8 w-96"
        >
            <h1 className="text-2xl mb-4">Name your character</h1>
            <input type="text" placeholder="Character Name" className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full" name="character" />
            <button type="submit" className="bg-primary text-white rounded-xl px-4 py-2 w-full">Create Character</button>
        </form>
    )
}

export default CharacterCreationForm