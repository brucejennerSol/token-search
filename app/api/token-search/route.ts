import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import type { tokens } from "@prisma/client";

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url)
    const query  = searchParams.get('q')
    let   count  = searchParams.get('count') // item count
    let   offset = searchParams.get('offset') //where to start

    const orderByConditions = [
        { daily_volume: Prisma.SortOrder.desc },
        { tags_birdeye_trending: Prisma.SortOrder.desc },
        { tags_lst: Prisma.SortOrder.desc },
        { tags_verified: Prisma.SortOrder.desc },
        { tags_community: Prisma.SortOrder.desc },
    ];

    offset = offset || '0';
    count  = count  || '0';

    if (query) {
        let token: tokens[] = []

        if (query.length >= 32) {
            const singleToken = await prisma.tokens.findFirst({
                where: {
                    address: { startsWith: query, mode: 'insensitive' }
                },
                orderBy: orderByConditions,
                take: 1,
                skip: 0
            })

            if (singleToken) token = [singleToken]

        } else {
            token = await prisma.tokens.findMany({
                where: {
                    OR: [
                        { symbol: { startsWith: query, mode: 'insensitive' } },
                        { name:   { startsWith: query, mode: 'insensitive' } },
                    ],
                },
                orderBy: orderByConditions,
                take: Number(count),
                skip: Number(offset)
            })
        }

        return NextResponse.json({ token })
    }

    const token = await prisma.tokens.findMany({
        orderBy: orderByConditions,
        take: 10,
        skip: 0,
    })

    return NextResponse.json({ token })
}