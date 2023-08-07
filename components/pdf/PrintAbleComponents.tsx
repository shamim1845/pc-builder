"use client";
import Image from "next/image";
import React, { useState, forwardRef, useEffect } from "react";
import { sidebarConstant } from "@/lib/constant";
import { useSelector } from "react-redux";
import axios from "axios";
import { currencyFormat } from "@/lib/utils/helpers/currencyFormat";
import { collectData } from "@/lib/utils/fetcher/collectData";

const PrintAbleComponents = forwardRef<HTMLDivElement>((props, ref) => {
  const [total, setTotal] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [components, setComponents] = useState<Product[]>([]);

  const { data: newPC } = useSelector((state: RootState) => state.newPC);

  const selectedProducts = async () => {
    const products = await collectData(newPC);

    if (products.length > 0) {
      setComponents(products);

      // calculate total products price
      let total = products.reduce((acc, currProduct) => {
        return acc + Number(currProduct.price);
      }, 0);

      setTotal(total);
    }
  };

  // => Effect for Fetch Data
  useEffect(() => {
    if (newPC.length > 0) {
      selectedProducts();
    }
  }, [newPC]);

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
              <h1 className="text-2xl text-teal-500 font-bold border-b-2 border-teal-500">
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
                <td className="border custom_border p-2">Component</td>
                <td className="border custom_border p-2">Product Name</td>
                <td className="border custom_border p-2">Price</td>
              </tr>
            </thead>
            <tbody className="">
              {sidebarConstant?.map((comp: SideBar) => {
                return (
                  <TableRow key={comp.id} comp={comp} components={components} />
                );
              })}
              <tr className="border custom_border p-2">
                <td></td>
                <td className="text-right pr-2">Total:</td>
                <td className="border custom_border p-2">
                  {currencyFormat(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
export default PrintAbleComponents;

// => Child component
const TableRow = ({
  comp,
  components,
}: {
  comp: SideBar;
  components: Product[];
}) => {
  console.log("child render");

  const product = components.find((product) => {
    let componentName = comp.name.toLowerCase().split(" ").join("-");
    return product.category === componentName;
  });

  return (
    <tr key={comp.id} className="border custom_border p-2 ">
      <td className="border custom_border p-2 w-[7rem] ">{comp.name}</td>
      <td className="border custom_border p-2 flex-1">{product?.name}</td>
      <td className="border custom_border p-2 w-[5rem] ">
        {product && currencyFormat(product?.price)}
      </td>
    </tr>
  );
};
