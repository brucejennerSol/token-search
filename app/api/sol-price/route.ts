import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { SOL_ADDRESS } from "@/app/lib/const";

export async function GET(): Promise<NextResponse> {

        const token = await prisma.token_price.findFirst({
            where: {
                address: SOL_ADDRESS
            },
        })

        if (token) {
            return NextResponse.json({ token }) 
        }

    return NextResponse.json({ message: "Specify query parameter"})
}

// 1. User perfroms swap 
// 2. After done, post info to the server and write to the db
// 3. 