import axios from "axios";

export const collectData = async (components: NewPCComponent[]) => {
  const allProducts = components.map((comp) => {
    return axios.get(`api/products?queryKey=_id&queryValue=${comp.productID}`);
  });

  const result = await Promise.all(allProducts);
  const products = result.map((res) => {
    return res?.data?.product;
  });
  console.log(result);

  return products;
};
