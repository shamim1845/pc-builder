import PDFGenerator from "@/components/pdf/PDFGenerator";

const page = () => {
  return (
    <div className="h-screen lg:h-[93vh] lg:overflow-y-scroll">
      <PDFGenerator />
    </div>
  );
};

export default page;
