"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useGetProductsQuery } from "@/redux/features/api/products/productsAPI";
import { useSelector } from "react-redux";
import ProductsLoading from "@/components/loading/ProductsLoading";

const Products = ({ category }: { category: string }) => {
  const [queryKey, setQueryKey] = useState("category");
  const [queryValue, setQueryValue] = useState(category);
  const [skip, setSkip] = useState(true);

  const { data: newPC } = useSelector((state: RootState) => state.newPC);

  console.log(`Products render newPC:`, newPC);

  // => Effect for set set queryKey, queryValue and skip
  useEffect(() => {
    if (newPC.length > 0) {
      const comp = newPC.find((item) => item.component === category);
      if (comp?.productID) {
        setQueryKey("_id");
        setQueryValue(comp?.productID || "");
        setSkip(false);
        return;
      }
    }

    setQueryKey("category");
    setQueryValue(category);
    if (skip) {
      setSkip(false);
    }
  }, [category, newPC]);

  const { data, error, isLoading } = useGetProductsQuery(
    {
      queryKey,
      queryValue,
    },
    {
      skip: skip,
      refetchOnMountOrArgChange: true,
    }
  );

  // => handle loading, error state
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-5 py-5">
        <ProductsLoading />
        <ProductsLoading />
        <ProductsLoading />
        <ProductsLoading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <h2 className="text-red-600">There was an error!</h2>
      </div>
    );
  }
  if (data?.products?.length === 0) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <h2>No product found!</h2>
      </div>
    );
  }

  return (
    <div className="h-full">
      {queryKey === "_id" && (
        <h2 className="pt-5 text-lg">Your chosen product.</h2>
      )}
      <div className="grid md:grid-cols-2 gap-5 py-5">
        {data?.products.map((product: Product) => (
          <Product
            key={product._id}
            product={product}
            currProduct={queryKey === "category" ? false : true}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
