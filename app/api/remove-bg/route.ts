import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import RemoveBg from "@/lib/bg-remover";
import { uploadFromBuffer, uploadImage } from "@/lib/cloudinary/upload";

export async function POST(req: NextRequest) {
  const { img_url } = await req.json();
  connectDb();

  const result = await uploadImage(img_url);
  console.log(result);

  return NextResponse.json({
    msg: "Success",
    products: result,
  });
}
