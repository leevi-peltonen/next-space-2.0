import Link from "next/link"
import { useUserStore } from "@/app/hooks/useStore"
import toast from "react-hot-toast"
interface Props {
    expanded: boolean
    handleNavItemClick: (navItem: string) => void
    destination: string
    text: string
    action?: () => void
    icon: React.ReactNode
}

const SpaceHeaderTab = ({text, destination, expanded, handleNavItemClick, action, icon}: Props) => {

    const { user, logout } = useUserStore()

    return (
        <li className={`mr-4 transition-all duration-300 ${expanded ? 'flex-grow text-4xl' : 'flex-shrink'}`}>
            {!!action ? (
                <button
                    className="text-white hover:text-gray-300"
                    onClick={() => {
                        toast.success(`User ${user?.username} logged out`)
                        logout()
                        action()
                    }}
                >
                    {text}
                </button>
            ) : 
            (
                <Link
                    href={destination}
                    className="text-neutral hover:text-highlight"
                    onClick={() => handleNavItemClick(text)}
                >
                    {text} 
                </Link>
            )}
        </li>
    )
}

export default SpaceHeaderTab