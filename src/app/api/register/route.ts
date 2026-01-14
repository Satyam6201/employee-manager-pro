import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. Basic validation: Ensure fields are not empty
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    // 2. Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 400 }
      );
    }

    // 3. Secure the password using hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new User to the database
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword 
      },
    });

    return NextResponse.json(
      { message: "User created successfully!" }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." }, 
      { status: 500 }
    );
  }
}