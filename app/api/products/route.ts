import { connectDb } from "@/lib/db/connectDB";
import { Product } from "@/lib/db/schema/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const queryKey = url.searchParams.get("queryKey") || "";
  const queryValue = url.searchParams.get("queryValue") || "";

  connectDb();
  const response = await Product.find({ [queryKey]: queryValue });

  return NextResponse.json({
    msg: "Success",
    products: response,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, image, price, features, category } = await req.json();

  if (
    !name ||
    !image ||
    !price ||
    !features ||
    features.length < 1 ||
    !category
  ) {
    return NextResponse.json(
      {
        msg: "name, image, price, features and category  is required!",
      },
      { status: 400 }
    );
  }

  connectDb();
  const response = await Product.create({
    name,
    image,
    price,
    features,
    category,
  });

  return NextResponse.json({
    msg: "Success",
    products: response,
  });
}
