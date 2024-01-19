'use client'
import SpaceContainer from "@/app/components/space-container/SpaceContainer"
import SpaceForm from "@/app/components/space-form/SpaceForm"
import '../styles.css'
import SpaceButton from "@/app/components/space-button/SpaceButton"
import { Credentials } from "@/app/models/auth"
import toast from "react-hot-toast"
import { useUserStore } from "@/app/hooks/useStore"
import { navigate } from "@/app/utils/actions"

const LoginPage = () => {

    const { login } = useUserStore()


    const handleLogin = async (creds: Credentials) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 404) {
            toast.error(`User '${creds.username}' does not exist`)
            return
        }
        if(response.status === 401) {
            toast.error(`Incorrect password`)
            return
        }
        const user = await response.json()
        console.log(user)
        toast.success(`User '${creds.username}' logged in`)
        login(user)
        navigate('/')
    }


    return (
        <SpaceContainer
            classes="grid custom-grid justify-items-center"
        >
            
            <SpaceForm
                isRegister={false}
                submitText="Sign in"
                submitAction={handleLogin}
            />
            <div className="vertical-line"></div>
            <SpaceButton 
                text="Sign Up"
                action={() => {}}
                destination="/register"
            />
        </SpaceContainer>
    )
}
export default LoginPage