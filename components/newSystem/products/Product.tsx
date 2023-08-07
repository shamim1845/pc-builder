import Button from "@/components/ui/Button";
import { deleteNewPC, setNewPC } from "@/redux/features/pc/newPCSlice";
import { CldImage } from "next-cloudinary";
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
    <div className="bg-white dark:bg-gray-700  custom_box_shadow rounded-lg p-5 flex flex-col gap-5">
      <h2 className="font-bold  text-gray-700 dark:text-white">
        {product.name}
      </h2>
      <div className="flex items-center justify-center my-2">
        <CldImage
          width={160}
          height={160}
          src={product.image}
          sizes="100vw"
          alt={product.name}
        />
      </div>
      <ul className="list-disc list-inside">
        {product.features.map((feature: string) => (
          <li className="mb-1" key={feature}>
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Button handleClick={handleClick}>
          {currProduct ? "Delete" : "Add"}
        </Button>

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
