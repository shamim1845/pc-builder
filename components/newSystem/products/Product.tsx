import { deleteNewPC, setNewPC } from "@/redux/features/pc/newPCSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const Product = ({
  product,
  currProduct,
}: {
  product: Product;
  currProduct?: boolean;
}) => {
  const dispatch = useDispatch();

  console.log("Product render");

  // => btn handler
  const handleClick = () => {
    if (currProduct) {
      dispatch(deleteNewPC({ category: product.category }));
    } else
      dispatch(
        setNewPC({ category: product.category, productID: product._id })
      );
  };

  return (
    <div className="border custom_border rounded-lg p-5 flex flex-col gap-5">
      <h2 className="font-bold  text-gray-700 dark:text-white">
        {product.name}
      </h2>
      <div className="flex items-center justify-center">
        <Image
          priority
          className="w-[10rem]"
          src={product.image || ""}
          width={100}
          height={100}
          alt={product.name}
        />
      </div>
      <ul className="list-disc list-inside">
        {product.features.map((feature: string) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={handleClick}
          className="bg-teal-500 hover:bg-teal-600 px-8 py-2 text-white font-semibold rounded"
        >
          {currProduct ? "Delete" : "Add"}
        </button>
        <div>
          <span className="text-gray-900 dark:text-white font-bold">
            {product.price}৳
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
