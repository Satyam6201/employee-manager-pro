import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// Ensure the path to authOptions matches your project structure
import { authOptions } from "../auth/[...nextauth]/route"; 

const prisma = new PrismaClient();

/**
 * POST: Create a new Employee
 * This route links the employee to the currently logged-in user.
 */
export async function POST(req: Request) {
  try {
    // 1. Check user session
    const session = await getServerSession(authOptions);
    
    if (!session || !(session.user as any).id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." }, 
        { status: 401 }
      );
    }

    const body = await req.json();
    const userId = (session.user as any).id;

    // 2. Basic Validation
    if (!body.firstName || !body.email || !body.salary) {
      return NextResponse.json(
        { error: "Missing required fields: First Name, Email, or Salary." }, 
        { status: 400 }
      );
    }

    // 3. Create Employee linked to the User ID
    const employee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName || "",
        email: body.email,
        phone: body.phone || "",
        department: body.department || "IT",
        designation: body.designation || "",
        dateOfJoining: body.dateOfJoining 
          ? String(body.dateOfJoining) 
          : new Date().toISOString().split('T')[0],
        salary: parseInt(body.salary.toString()) || 0,
        address: body.address || "",
        status: body.status || "Active",
        // Linking the employee to the logged-in user
        userId: userId, 
      },
    });

    return NextResponse.json(employee, { status: 201 });

  } catch (error: any) {
    // Handle Prisma unique constraint error (e.g., duplicate email)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "This email is already registered to another employee." }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Database error occurred", details: error.message }, 
      { status: 400 }
    );
  }
}

/**
 * GET: Retrieve employees belonging to the logged-in user only
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !(session.user as any).id) {
      return NextResponse.json(
        { error: "Authentication required." }, 
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    // Filter: Fetch only employees where userId matches the session user
    const employees = await prisma.employee.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate Employee Statistics
    const stats = {
      total: employees.length,
      active: employees.filter(e => e.status === 'Active').length,
      inactive: employees.filter(e => e.status === 'Inactive').length,
    };

    return NextResponse.json({ employees, stats });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employee data." }, 
      { status: 500 }
    );
  }
}