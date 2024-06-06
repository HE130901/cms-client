import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function GET(req) {
  try {
    const response = await axiosInstance.get("/buildings");

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json(
        { message: response.data.message },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching buildings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
