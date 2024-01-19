'use client'

import Link from "next/link"


interface Props {
    text: string
    action: () => void
    destination?: string
}

const SpaceButton = ({text, action, destination}: Props) => {
    return (
        <>
            { destination ? 
                <Link className="bg-primary text-white rounded-xl px-4 py-2" href={destination}>
                    {text}
                </Link> 
            : 
                <button className="bg-primary text-white rounded-xl px-4 py-2" onClick={action}>
                    { text }
                </button>
            }
        </>
    )
}

export default SpaceButton