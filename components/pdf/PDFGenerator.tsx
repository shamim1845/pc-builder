"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintAbleComponents from "./PrintAbleComponents";
import { PrinterIcon } from "@heroicons/react/24/outline";

const PDFGenerator = () => {
  const componentRef = useRef(null);

  console.log("PDF generator rander");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="relative  ">
      {/* Print Button */}
      <div className="fixed lg:absolute right-5 lg:right-5 top-12 lg:top-5">
        <button
          className="flex gap-2 items-center border-2 border-teal-500 px-4  py-2 rounded-lg bg-teal-500 text-white"
          onClick={handlePrint}
        >
          <PrinterIcon className="w-4 h-4" />
          <span> Print</span>
        </button>
      </div>

      {/* PrintAble Component */}
      <div className="mt-5">
        <PrintAbleComponents ref={componentRef} />
      </div>
    </div>
  );
};

export default PDFGenerator;
