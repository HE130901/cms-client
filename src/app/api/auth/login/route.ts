import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axiosInstance.post("/api/auth/login", {
      username,
      password,
    });

    if (response.status === 200) {
      const { token } = response.data;
      return NextResponse.json({ message: "Login successful", token });
    } else {
      return NextResponse.json(
        { message: response.data.message },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
