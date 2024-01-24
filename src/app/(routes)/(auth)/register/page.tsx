import SpaceContainer from "@/app/components/space-container/SpaceContainer";
import { generateToken } from "@/app/utils/actions";
import prisma from "@/app/utils/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    return (
        <SpaceContainer>
            <form
                className="bg-secondary min-h-full flex flex-col items-center justify-center shadow-md rounded-xl px-8 py-8 w-96"
                action={register}
            >
                <h1 className="text-2xl mb-4 ">Sign Up</h1>
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

                <input
                    autoComplete="off"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
                />

                <div className="flex flex-row items-start mb-4 w-full">
                    <button
                        className="bg-primary text-white rounded-xl px-4 py-2 w-full"
                        type="submit"
                    >
                        Sign Up
                    </button>    
                </div>
            </form>
        </SpaceContainer>
    )
}

const register = async (formData: FormData) => {
    "use server"
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    if (!username || !password) {
        throw new Error('Invalid credentials')
    }

    if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
    }

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (user) {
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const createdUser: User = await prisma.user.create({
        data: {
            username,
            password: passwordHash
        }
    })
    
    const token = generateToken(createdUser)
    
    cookies().set('token', token)

    redirect('/')
}