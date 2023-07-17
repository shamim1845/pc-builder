import Image from "next/image";
import React from "react";

const Product = ({ product }: any) => {
  return (
    <div className="border custom_border rounded-lg p-5 flex flex-col gap-5">
      <h2>{product.name}</h2>
      <div className="flex items-center justify-center">
        <Image
          priority
          className="w-[10rem]"
          src={product.image || ""}
          width={100}
          height={100}
          alt={product.name}
        />
      </div>
      <ul className="list-disc list-inside">
        {product.features.map((feature: string) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button className="bg-teal-500 hover:bg-teal-600 px-8 py-2 text-white rounded">
          Add
        </button>
        <div>
          <span className="text-gray-900 font-bold">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
