import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import type { tokens } from "@prisma/client";

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url)
    const query  = searchParams.get('q')
    const count  = searchParams.get('count') // item count 
    let   offset = searchParams.get('offset') //where to start

    const orderByConditions = [
        { daily_volume: Prisma.SortOrder.desc },   
        { tags_birdeye_trending: Prisma.SortOrder.desc },
        { tags_lst: Prisma.SortOrder.desc },
        { tags_verified: Prisma.SortOrder.desc },
        { tags_community: Prisma.SortOrder.desc },
    ];

    if (!offset) {
        offset = '0'
    }

    if (query && count) {
        let token: tokens[];

        if (query.length >= 32) {
            token = await prisma.tokens.findMany({
                where: {
                    OR: [
                        { address: { startsWith: query, mode: 'insensitive' } },
                    ],
                },
                orderBy: orderByConditions,
                take: Number(count), 
                skip: Number(offset)
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
            take: Number(count),
            skip: Number(offset)
        })
    
        return NextResponse.json({ token })
    } 

    return NextResponse.json({ message: "Specify query parameter"})
}