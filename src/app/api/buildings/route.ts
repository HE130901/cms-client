// src/app/api/buildings/route.ts
import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function GET() {
  try {
    const response = await axiosInstance.get("/buildings");
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
