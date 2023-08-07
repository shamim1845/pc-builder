"use client";
import React from "react";
import Product from "./Product";
import { useGetProductsQuery } from "@/redux/features/api/products/productsAPI";
import { useSelector } from "react-redux";
import ProductsLoading from "@/components/loading/ProductsLoading";

const Products = () => {
  const { query } = useSelector((state: RootState) => state.extra);

  console.log(`=> Products render`);

  const { data, error, isLoading } = useGetProductsQuery(
    {
      queryKey: query.queryKey,
      queryValue: query.queryValue,
    },
    { skip: query.skip, refetchOnMountOrArgChange: true }
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
      {query.queryKey === "_id" && (
        <h2 className="pt-5 text-lg">Your chosen product.</h2>
      )}
      <div className="grid md:grid-cols-2 gap-5 py-5">
        {query.queryKey === "_id" ? (
          <>
            {data?.product && (
              <Product
                key={data?.product?._id}
                product={data?.product}
                currProduct={true}
              />
            )}
          </>
        ) : (
          <>
            {data?.products?.map((product: Product) => (
              <Product
                key={product._id}
                product={product}
                currProduct={false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

export const MemoProducts = React.memo(Products);
