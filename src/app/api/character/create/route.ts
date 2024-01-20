import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";


export async function POST(request: NextRequest): Promise<NextResponse> {
    const data = await request.json()

    if (!data) {
        return new NextResponse('Character is required', { status: 400 })
    }

    const characterExists = await prisma.character.findFirst({
        where:  { 
                    name: data.character.name
                }
    })

    if (characterExists) {
        return new NextResponse('Character already exists', { status: 409 })
    }

    const characterCount = await prisma.character.count({
        where:  { 
                    userId: data.character.userId
                }
    })

    if(characterCount >= 3) {
        return new NextResponse('Maximum number of characters reached', { status: 418 })
    }

    const character = await prisma.character.create({
        data: data.character
    })

    return new NextResponse(JSON.stringify(character), { status: 201 })

}