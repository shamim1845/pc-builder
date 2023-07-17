import { connectDb } from "@/lib/db/connectDB";
import { Ram } from "@/lib/db/schema/ramSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const queryStr = url.searchParams.get("component");
  console.log(queryStr);

  connectDb();
  const response = await Ram.find({ category: queryStr });

  return NextResponse.json({
    msg: "Success",
    data: response,
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
  const response = await Ram.create({ name, image, price, features, category });

  return NextResponse.json({
    msg: "Success",
    data: response,
  });
}
