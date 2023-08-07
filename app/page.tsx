"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Product from "@/components/newSystem/products/Product";
import Button from "@/components/ui/Button";
import { collectData } from "@/lib/utils/fetcher/collectData";
import ProductsLoading from "@/components/loading/ProductsLoading";

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [components, setComponents] = useState<Product[]>([]);
  const { data: newPC } = useSelector((state: RootState) => state.newPC);

  const selectedProducts = async () => {
    setLoading(true);
    const products = await collectData(newPC);
    console.log(products);

    if (products.length > 0) {
      setComponents(products);
    } else {
      setShowBtn(true);
    }
    setLoading(false);
  };

  // => Effect for Fetch Data
  useEffect(() => {
    if (newPC.length > 0) {
      selectedProducts();
    } else {
      setShowBtn(true);
    }
  }, [newPC]);

  console.log("=> Home render", components);

  // => Show this btn when user not select any component
  if (newPC.length === 0 && showBtn) {
    return (
      <div className="h-full  flex justify-center items-center">
        <Link href="/new-system">
          <Button> Add component to build your custom PC</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div
        className={`lg:h-[93vh] overflow-y-auto overflow-x-hidden grid md:grid-cols-2 gap-5 py-5 px-2 lg:px-0`}
      >
        {loading ? (
          <>
            <ProductsLoading />
            <ProductsLoading />
            <ProductsLoading />
            <ProductsLoading />
          </>
        ) : (
          <>
            {/* Print PDF btn */}
            {components.length > 0 && (
              <>
                <div className="fixed lg:absolute right-2 top-12 lg:right-5 lg:top-2">
                  <Link href="/print_pc">
                    <Button>Print PDF</Button>
                  </Link>
                </div>
                {/* User selected components */}
                {components?.map((comp) => {
                  return (
                    <Product key={comp._id} product={comp} currProduct={true} />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
