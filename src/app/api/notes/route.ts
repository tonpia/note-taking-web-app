import { NextResponse } from "next/server";
import data from "@/../public/assets/data/data.json";  // import JSON directly

export async function GET() {
  return NextResponse.json(data);
}