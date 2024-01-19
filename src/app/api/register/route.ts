import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client"
import prisma from "@/app/utils/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const { username, password } = await request.json()

    if (!username || !password) {
        return new NextResponse('Username and password are required', { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (user) {
        return new NextResponse('User already exists', { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const createdUser: User = await prisma.user.create({
        data: {
            username,
            password: passwordHash
        }
    })
    createdUser.password = ''
    return new NextResponse(JSON.stringify(createdUser), { status: 201 })
}