'use client'
import SpaceContainer from "@/app/components/space-container/SpaceContainer"
import SpaceForm from "@/app/components/space-form/SpaceForm"
import SpaceButton from "@/app/components/space-button/SpaceButton"
import { Credentials } from "@/app/models/auth"
import toast from "react-hot-toast"

import '../styles.css'

const Register = () => {
    

    const handleRegister = async (creds: Credentials) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 400) {
            toast.error(`User '${creds.username}' already exists`)
            return
        }
        const data = await response.json()
        console.log(data)
        toast.success(`User '${creds.username}' created`)
    }

    return (
        <SpaceContainer
            classes="grid custom-grid justify-items-center"
        >
            <SpaceButton 
                text="Log in" 
                action={() => {}}
                destination="/login"
            />
            <div className="vertical-line"></div>
            <SpaceForm
                isRegister={true}
                submitText="Sign Up"
                submitAction={handleRegister}
            />
        </SpaceContainer>
    )
}
export default Register