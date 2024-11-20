import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const emails = await prisma.user.findMany();
    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { email },
    });

    return NextResponse.json({ message: "Email added successfully", email: newUser.email }, { status: 201 });
  } catch (error) {
    console.error("Error inserting email:", error);
    return NextResponse.json({ error: "Failed to insert email" }, { status: 500 });
  }
}
