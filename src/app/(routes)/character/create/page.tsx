import SpaceContainer from "@/app/components/space-container/SpaceContainer"
import CharacterCreationForm from "@/app/components/page-contents/character/CharacterCreationForm"
export default async function CreateCharacterPage() {
    return (
        <SpaceContainer>
            <CharacterCreationForm />
        </SpaceContainer>
    )
}