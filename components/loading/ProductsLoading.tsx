import React from "react";

const ProductsLoading = () => {
  return (
    <div className="border custom_border rounded-lg p-5 flex flex-col gap-5 ">
      <h2 className="w-full h-4 bg-gray-300 dark:bg-gray-500 rounded animate-pulse">
        {/* {product.name} */}
      </h2>
      <div className="flex items-center justify-center ">
        <div className="bg-gray-300 dark:bg-gray-500 w-[10rem] h-[10rem] rounded animate-pulse">
          {/*  image */}
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="w-[10rem] h-2 bg-gray-300 dark:bg-gray-500 rounded animate-pulse">
          {/* list */}
        </li>
        <li className="w-[10rem] h-2 bg-gray-300 dark:bg-gray-500 rounded animate-pulse">
          {/* list */}
        </li>
        <li className="w-[10rem] h-2 bg-gray-300 dark:bg-gray-500 rounded animate-pulse">
          {/* list */}
        </li>
        <li className="w-[10rem] h-2 bg-gray-300 dark:bg-gray-500 rounded animate-pulse">
          {/* list */}
        </li>
      </ul>
      <div className="flex justify-between">
        <button className="bg-gray-300 dark:bg-gray-500 px-8 py-2 rounded animate-pulse">
          {/* {currProduct ? "Delete" : "Add"} */}
        </button>
        <div className="bg-gray-300 dark:bg-gray-500 w-20 h-4 rounded animate-pulse">
          <span>{/* {product.price}৳ */}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsLoading;
