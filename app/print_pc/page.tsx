import PDFGenerator from "@/components/pdf/PDFGenerator";

const page = () => {
  console.log("Print pc page render");

  return (
    <div className="h-screen lg:h-[93vh] lg:overflow-y-scroll  px-2 lg:px-5">
      <PDFGenerator />
    </div>
  );
};

export default page;
