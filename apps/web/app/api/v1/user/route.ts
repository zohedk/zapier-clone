import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/utils/types";
import { hashPassword } from "@/utils/helpers";
import { prisma } from "@repo/db";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    //
    const parsedBody = signUpSchema.safeParse(reqBody);
    // checking if all the types are correct
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedBody.error.formErrors.fieldErrors,
        },
        { status: 411 }
      );
    }
    // checking if user already present
    const userInDb = await prisma.user.findUnique({
      where: { email: parsedBody.data.email },
    });
    if (userInDb) {
      return NextResponse.json(
        {
          success: false,
          error: {
            type: "email",
            message: "User already exist with this email",
          },
        },
        { status: 409 }
      );
    }

    //hashing password and creating user
    const hashedPassword = await hashPassword(parsedBody.data.password);
    //
    await prisma?.user.create({
      data: {
        firstName: parsedBody.data.firstName,
        lastName: parsedBody.data.lastName,
        email: parsedBody.data.email,
        password: hashedPassword,
        authType: "credentials",
      },
    });
    //TODO: add email sending functionality
    //
    return NextResponse.json(
      {
        success: true,
        message: "Signed up successfully",
      },
      { status: 200 }
    );
    //
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          type: "unknown",
          message: e.message,
        },
      },
      { status: 400 }
    );
  }
};
