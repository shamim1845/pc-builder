"use client";
import ProductsLoading from "@/components/loading/ProductsLoading";
import Product from "@/components/newSystem/products/Product";
import { useGetProductsQuery } from "@/redux/features/api/products/productsAPI";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { data: newPC } = useSelector((state: RootState) => state.newPC);

  console.log("Home render", newPC);

  // => Show this btn when user not select any component

  if (newPC.length === 0) {
    return (
      <div className="h-full  flex justify-center items-center">
        <Link
          href="/new-system"
          className="flex flex-col items-center border-2 border-teal-500 px-5  py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white"
        >
          Add component to build your custom PC
        </Link>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* Print PDF btn conditional rendering */}
      {newPC.length > 0 && (
        <div className="fixed lg:absolute right-2 top-12 lg:right-5 lg:top-2">
          <Link
            href="/print_pc"
            className="flex flex-col items-center border-2 border-teal-500 px-5  py-2 rounded-lg bg-teal-500 text-white"
          >
            Print PDF
          </Link>
        </div>
      )}

      <div
        className={`lg:h-[93vh] overflow-y-auto overflow-x-hidden grid md:grid-cols-2 gap-5 py-5 px-2`}
      >
        {newPC?.map((comp) => {
          return <ChoosedComponent key={comp.productID} comp={comp} />;
        })}
      </div>
    </div>
  );
}

// => Child component for user selected items
const ChoosedComponent = ({ comp }: { comp: NewPCComponent }) => {
  const { data, isLoading, error } = useGetProductsQuery({
    queryKey: "_id",
    queryValue: comp.productID,
  });

  console.log("Choosed component render", data);

  // => handle loading, error and not-found state
  if (isLoading) {
    return (
      <div className="my-5">
        <ProductsLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[50vh] w-full  flex justify-center items-center">
        <h2 className="text-red-600">There was an error!</h2>
      </div>
    );
  }

  if (data?.products?.length === 0) {
    return (
      <div className="h-[50vh] w-full flex justify-center items-center">
        <h2>No product found!</h2>
      </div>
    );
  }

  return (
    <div className="mb-5">
      {data?.products && (
        <div className="capitalize text-lg text-gray-700 dark:text-white font-semibold mb-3">
          {comp.component.split("-").join(" ")}
        </div>
      )}

      {data?.products[0] && (
        <Product product={data?.products[0]} currProduct={true} />
      )}
    </div>
  );
};
