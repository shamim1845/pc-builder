"use client";

import { useGetRamQuery } from "@/redux/features/ram/ramAPI";
import React from "react";
import Product from "./Product";

const Products = ({ queryString }: { queryString: string }) => {
  const currComponent = queryString.toLocaleLowerCase().split(" ").join("-");
  const { data, error, isLoading } = useGetRamQuery(currComponent);
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-5 py-5">
      {data.data.map((product: any) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
