import { connectDb } from "@/lib/db/connectDB";
import { Product } from "@/lib/db/schema/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  connectDb();

  console.log(data);

  return NextResponse.json({
    msg: "Success",
    products: "response",
  });
}
