// src/app/api/buildings/[buildingId]/floors/route.ts
import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function GET(req) {
  const { buildingId } = req.query;
  try {
    const response = await axiosInstance.get(`/buildings/${buildingId}/floors`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error fetching floors for building ${buildingId}:`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
