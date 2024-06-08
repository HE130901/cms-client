// src/app/api/buildings/[buildingId]/floors/[floorId]/areas/route.ts
import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function GET(req) {
  const { buildingId, floorId } = req.query;
  try {
    const response = await axiosInstance.get(
      `/buildings/${buildingId}/floors/${floorId}/areas`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      `Error fetching areas for floor ${floorId} in building ${buildingId}:`,
      error
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
