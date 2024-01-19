'use client'

import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { useCharacterStore } from "@/app/hooks/useStore";

const Account = () => {

    const { character, allCharacters } = useCharacterStore()

    return (
        <SpaceContainer>
            {allCharacters.map((character) => (
                <p>{character.name}</p>
            ))}
        </SpaceContainer>
    );
};

export default Account;
