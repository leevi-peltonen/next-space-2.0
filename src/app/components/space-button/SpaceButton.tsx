'use client'

interface Props {
    text: string
    action: () => void
}

const SpaceButton = ({text, action}: Props) => {
    return (
        <button className="bg-primary text-white rounded-xl px-4 py-2" onClick={action}>
            { text }
        </button>
    )
}

export default SpaceButton