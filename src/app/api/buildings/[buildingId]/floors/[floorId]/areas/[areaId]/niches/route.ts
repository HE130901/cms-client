// src/app/api/buildings/[buildingId]/floors/[floorId]/area/[areaId]/niches/route.ts
import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axiosConfig";

export async function GET(req) {
  const { buildingId, floorId, areaId } = req.query;
  try {
    const response = await axiosInstance.get(
      `/buildings/${buildingId}/floors/${floorId}/areas/${areaId}/niches`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      `Error fetching niches for area ${areaId} on floor ${floorId} in building ${buildingId}:`,
      error
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
