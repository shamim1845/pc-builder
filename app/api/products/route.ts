import { uploadImage } from "@/lib/cloudinary/upload";
import { connectDb } from "@/lib/db/connectDB";
import { Product } from "@/lib/db/schema/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const queryKey = url.searchParams.get("queryKey") || "";
  const queryValue = url.searchParams.get("queryValue") || "";

  connectDb();

  let response;
  if (queryKey === "_id") {
    response = await Product.findById({ [queryKey]: queryValue });

    return NextResponse.json({
      msg: "Success",
      product: response,
    });
  }

  response = await Product.find({ [queryKey]: queryValue });

  return NextResponse.json({
    msg: "Success",
    products: response,
  });
}

// => Create product
export async function POST(req: NextRequest) {
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

  const result: any = await uploadImage(image);
  console.log("Upload result: => ", result);

  if (!result) {
    return NextResponse.json({
      msg: "failed",
      products: "Product create failed.",
    });
  }

  // const response = await Product.create({
  //   name,
  //   image: result?.public_id,
  //   price,
  //   features,
  //   category,
  // });

  // return NextResponse.json({
  //   msg: "Success",
  //   products: response,
  // });
}
