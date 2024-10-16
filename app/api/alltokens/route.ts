import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const searchArr = search?.split("%20")
    const searchString = searchArr?.join(" ")

    if (search) {
        const token = await prisma.token_list.findMany({
            where: {
                OR: [
                    { symbol: { startsWith: searchString } },
                    { name:   { startsWith: searchString } }
                ],
            },
            orderBy: [
                { daily_volume: 'desc' },
                { tags_birdeye_trending: 'desc' },
                { tags_lst: 'desc' },
                { tags_verified: 'desc'},
                { tags_community: 'desc' },
            ],
            take: 10
        })
    
        return NextResponse.json({ token })
    }

    return NextResponse.json({ message: "Specify query parameter"})
}

// search first & second word
