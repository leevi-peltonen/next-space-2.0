import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import prisma from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken'
import { generateToken } from "@/app/utils/actions";
import { cookies } from 'next/headers'

export default async function LoginPage() {
    return (
    <SpaceContainer>
        
        <form
            className="bg-secondary min-h-full flex flex-col items-center justify-center shadow-md rounded-xl px-8 py-8 w-96"
            action={login}
        >
            <h1 className="text-2xl mb-4 ">Sign in</h1>
            <input
                name="username"
                type="text"
                placeholder="Username"
                className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
            />
            <input
                autoComplete="off"
                name="password"
                type="password"
                placeholder="Password"
                className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
            />
           
            <div className="flex flex-row items-start mb-4 w-full">
                <button
                    className="bg-primary text-white rounded-xl px-4 py-2 w-full"
                    type="submit"
                >
                    Login
                </button>    
            </div>
        </form>

    </SpaceContainer>
  )
}

const login = async (formData: FormData) => {
    'use server'
    
    const username = formData.get('username') as string
    const password = formData.get('password') as string


    
    if (!username || !password) {
        throw new Error('Invalid credentials')
    }
    
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        throw new Error(`User with name ${username} not found`)
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('Invalid credentials')
    }

    const token = generateToken(user)

    cookies().set('token', token)
    
    redirect('/')
    
}