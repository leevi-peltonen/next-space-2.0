'use client'

import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { useCharacterStore } from "@/app/hooks/useStore";
import Link from "next/link";

const Account = () => {

    const { character, allCharacters } = useCharacterStore()

    return (
        <SpaceContainer>
            <Link href="/character/create">Create New Character</Link>
            {allCharacters.map((character) => (
                <p>{character.name}</p>
            ))}
        </SpaceContainer>
    );
};

export default Account;
