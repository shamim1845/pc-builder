"use client";
import Image from "next/image";
import React, { useState, forwardRef, useEffect } from "react";
import { sidebarConstant } from "@/lib/constant";
import { useGetProductsQuery } from "@/redux/features/api/products/productsAPI";
import { useSelector } from "react-redux";

const PrintAbleComponents = forwardRef<HTMLDivElement>((props, ref) => {
  const [total, setTotal] = useState(0);
  const [dateTime, setDateTime] = useState("");

  // => Effect for Format date and time in client side
  useEffect(() => {
    const date = new Date();
    const dt = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    setDateTime(dt);
  }, []);
  console.log("parent render");

  return (
    <div ref={ref} className=" w-full  px-5 py-5 text-black dark:text-white">
      <div className="w-full flex flex-col items-center justify-center ">
        <div className="w-full">
          <div className="w-full text-left">
            <span>{dateTime}</span>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="logo"
              priority
            />
            <div>
              <h1 className="text-xl text-teal-500 font-semibold border-b-2 border-teal-500">
                PC Craft Ltd
              </h1>
              <div className="">
                <strong>Phone: </strong>16793, <strong>Email: </strong>
                hi@pc-craft.vercel.app
              </div>
              <div>https://pc-craft.vercel.app/print_pc</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full ">
            <thead className="bg-teal-500">
              <tr className="">
                <td className="border border-gray-500 p-2">Component</td>
                <td className="border border-gray-500 p-2">Product Name</td>
                <td className="border border-gray-500 p-2">Price</td>
              </tr>
            </thead>
            <tbody className="">
              {sidebarConstant?.map((comp: SideBar) => {
                return (
                  <TableRow
                    key={comp.id}
                    comp={comp}
                    setTotal={(price: number) =>
                      setTotal((prev) => prev + price)
                    }
                  />
                );
              })}
              <tr className="border border-gray-500 p-2">
                <td></td>
                <td className="text-right pr-2">Total:</td>
                <td className="border border-gray-500 p-2">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
export default PrintAbleComponents;

const TableRow = ({
  comp,
  setTotal,
}: {
  comp: SideBar;
  setTotal: (price: number) => void;
}) => {
  const { data: newPC } = useSelector((state: RootState) => state.newPC);
  const [queryValue, setQueryValue] = useState("");
  const [skip, setSkip] = useState(true);

  // => Effect for find current component selected or not if selected set it on local state
  useEffect(() => {
    const currProduct = newPC?.find(
      (item) =>
        item.component === comp.name.toLocaleLowerCase().split(" ").join("-")
    );
    if (currProduct) {
      setQueryValue(currProduct?.productID || "");
      setSkip(false);
    }
    console.log(`currProduct: (${comp.name}) => `, currProduct);
  }, [newPC]);

  // => fetch data for current product
  const { data } = useGetProductsQuery(
    {
      queryKey: "_id",
      queryValue,
    },
    {
      skip,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data?.products[0].price) {
      setTotal(data?.products[0].price);
    }
    console.log(`data: (${comp.name}) => `, data);
  }, [data]);

  console.log("child render");

  return (
    <tr key={comp.id} className="border border-gray-500 p-2 ">
      <td className="border border-gray-500 p-2 w-[7rem] ">{comp.name}</td>
      <td className="border border-gray-500 p-2 flex-1">
        {data?.products[0].name}
      </td>
      <td className="border border-gray-500 p-2 w-[5rem] ">
        {data?.products[0].price}
        {data?.products[0].price && "৳"}
      </td>
    </tr>
  );
};
