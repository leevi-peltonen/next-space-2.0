'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
interface Props {
    destination: string
    text: string
}

const SpaceHeaderTab = ({text, destination }: Props) => {

    
    const pathname = usePathname()

    return (
        <li className={`mr-4 text-white transition-all duration-300 ${pathname.includes(destination) ? 'flex-grow text-4xl' : 'flex-shrink'}`}>
                <Link href={destination}>
                    {text}
                </Link>
        </li>
    )
}

export default SpaceHeaderTab