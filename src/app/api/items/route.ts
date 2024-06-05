// app/api/items/route.ts
import { NextResponse } from "next/server";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

export async function GET() {
  return NextResponse.json(items);
}
