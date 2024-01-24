import { redirect } from "next/navigation";
import SpaceHeaderTab from "../space-header/SpaceHeaderTab";
import { getActiveCharacter } from "@/app/(routes)/character/page";
import { getSessionUserData } from "@/app/layout";
import { User } from "@prisma/client";

interface Space2HeaderProps {
    session: User | null
}

interface Tab {
    text: string
    destination: string

}

const HEADER_TABS_SIGNEDIN: Tab[] = [
    {
        text: 'Galaxy',
        destination: '/galaxy',
    },
    {
        text: 'Planet',
        destination: '/planet',
    },
    {
        text: 'Characters',
        destination: '/character',

    },
    {
        text: 'Settings',
        destination: '/settings',

    },
    {
        text: 'Sign out',
        destination: '/logout',
    }
];

const HEADER_TABS_SIGNEDOUT: Tab[] = [
    {
        text: 'Home',
        destination: '/',

    },
    {
        text: 'Sign in',
        destination: '/login',

    },
    {
        text: 'Sign up',
        destination: '/register',

    },
];

const Space2Header = async ({session}: Space2HeaderProps) => {


    if(!session) return (
        <header className="bg-background rounded-xl py-4">
            <div className="container mx-auto flex items-center justify-between p-4 h-20">
                <nav className="flex-grow h-full">
                    <ul className="flex justify-center">
                        {HEADER_TABS_SIGNEDOUT.map(tab => (
                            <SpaceHeaderTab
                                key={tab.text}
                                text={tab.text}
                                destination={tab.destination}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )

    
    const character = await getActiveCharacter(session.id)

    

    return (
        <header className="bg-background rounded-xl py-4">
            <div className="container mx-auto flex items-center  justify-between p-4 h-20">
                <div
                    className="bg-primary rounded-xl px-4 py-2 mr-4"
                >
                    <p
                        className="text-white text-xl"
                    >{character ? `Playing as ${character.name}` : "No active character"}</p>
                    {character &&
                    <p
                        className="text-white text-xl"
                    >Level: {character.level}</p>}
                </div>

                <nav className="flex-grow h-full">
                    <ul className="flex justify-center">
                       

                        {HEADER_TABS_SIGNEDIN.map(tab => 
                            <SpaceHeaderTab
                                key={tab.text}
                                text={tab.text}
                                destination={tab.destination}
                            />
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Space2Header