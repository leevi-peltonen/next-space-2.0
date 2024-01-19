import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest): Promise<NextResponse> {
    const { username, password } = await request.json()

    if (!username || !password) {
        return new NextResponse('Username and password are required', { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        return new NextResponse('User does not exist', { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return new NextResponse('Invalid credentials', { status: 401 })
    }

    user.password = ''
    return new NextResponse(JSON.stringify(user), { status: 200 })
}