import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import SignOutAction from "./SignOutAction"

const Logout = async () => {

    const clearCookies = async () => {
        'use server'
        cookies().delete('token')
        redirect('/')
    }

    return <SignOutAction deleteTokens={clearCookies}/>
}



export default Logout