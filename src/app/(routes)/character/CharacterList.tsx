'use client'
import { Character } from "@prisma/client"


interface CharacterListProps {
    changeCharacter:  (id: number) => void
    characters: Character[]
}

const CharacterList = async ({characters, changeCharacter}: CharacterListProps) => {
    const handleCharacterChange = async (id: number) => {
        changeCharacter(id)
    }

    return (
        <div>
            {characters.map(character => (
                <div
                    onClick={() => handleCharacterChange(character.id)} 
                    key={character.id} 
                    className="bg-background rounded-xl m-10 p-10 hover:cursor-pointer hover:bg-gray-700">
                    <h1>{character.name} - Level {character.level}</h1>
                    
                </div>
            ))}
        </div>
    )
}

export default CharacterList