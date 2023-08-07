"use client";

import { CldImage } from "next-cloudinary";
import { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [featureCount, setFeatureCount] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: 0,
    features: [],
    category: "",
  });
  console.log(product);

  const features = () => {
    let featureList: any = [];
    for (let i = 0; i < featureCount; i++) {
      featureList = [
        ...featureList,
        <input
          key={i}
          id={i.toString()}
          className="py-3 px-2 rounded"
          type="text"
          name="features"
          placeholder="Enter your product feature"
          required
          onChange={handleChange}
        />,
      ];
    }
    return featureList;
  };

  const handleChange = (e: {
    target: { name: any; value: any; id: string };
  }) => {
    const { name, value, id } = e.target;
    setProduct((prev) => {
      if (name === "features") {
        let features: any = product?.features || [];
        features[Number(id)] = value;
        return { ...prev, [name]: features };
      } else if (name === "price") {
        return { ...prev, [name]: Number(value) };
      }

      console.log(name, value);

      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "ut1jioxb");

    axios
      .post("https://api.cloudinary.com/v1_1/dewq5eyuf/image/upload", formData)
      .then((res) => {
        setProduct((prev) => {
          return { ...prev, image: res?.data?.public_id };
        });
        console.log(res);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="my-10 flex flex-col gap-5 w-full max-w-xl mx-auto"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base">
            Name
          </label>
          <input
            id="name"
            className="py-3 px-2 rounded"
            type="text"
            name="name"
            placeholder="Enter your product name."
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-base">
            Price
          </label>
          <input
            className="py-3 px-2 rounded"
            type="number"
            name="price"
            placeholder="Enter your product price"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="features" className="text-base">
            Features
          </label>

          {features()}
          <button
            type="button"
            className="text-[12px] text-teal-500 transition-all border  hover:border-teal-500 w-[6rem] px-2"
            onClick={() => setFeatureCount((pre) => pre + 1)}
          >
            Add feature
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-base">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="py-3 px-2 rounded"
            onChange={handleChange}
          >
            <option value="cpu">Cpu</option>
            <option value=""></option>
          </select>
          {/* <input
            className="py-3 px-2 rounded"
            type="text"
            name="category"
            placeholder="Enter your product category"
            required
            onChange={handleChange}
          /> */}
        </div>
        <div className="flex items-center justify-between">
          <input onChange={handleFileChange} type="file" required />
          {product.image && (
            <CldImage
              width="200"
              height="200"
              src={product.image}
              sizes="100vw"
              alt="Description of my image"
            />
          )}
        </div>

        <br />
        <button
          className="bg-teal-500 text-white py-2 rounded transition-all hover:bg-teal-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
