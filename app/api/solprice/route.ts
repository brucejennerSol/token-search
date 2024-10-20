import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import type { tokens } from "@prisma/client";

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = searchParams.get('limit')

    const orderByConditions = [
        { daily_volume: Prisma.SortOrder.desc },   // Use Prisma.SortOrder
        { tags_birdeye_trending: Prisma.SortOrder.desc },
        { tags_lst: Prisma.SortOrder.desc },
        { tags_verified: Prisma.SortOrder.desc },
        { tags_community: Prisma.SortOrder.desc },
    ];

    if (query && limit) {
        let token: tokens[];

        if (query.length >= 32) {
            token = await prisma.tokens.findMany({
                where: {
                    OR: [
                        { address: { startsWith: query, mode: 'insensitive' } },
                    ],
                },
                orderBy: orderByConditions,
                take: Number(limit) //TODO change to be handeled on the frontend
            })
        }

        token = await prisma.tokens.findMany({
            where: {
                OR: [
                    { symbol: { startsWith: query, mode: 'insensitive' } },
                    { name:   { startsWith: query, mode: 'insensitive' } }
                ],
            },
            orderBy: orderByConditions,
            take: Number(limit)
        })
    
        return NextResponse.json({ token })
    } 

    return NextResponse.json({ message: "Specify query parameter"})
}