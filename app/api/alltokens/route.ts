import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (query) {
        const token = await prisma.tokens.findMany({
            where: {
                OR: [
                    { symbol: { startsWith: query, mode: 'insensitive' } },
                    { name:   { startsWith: query, mode: 'insensitive' } }
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
// ignore spaces
