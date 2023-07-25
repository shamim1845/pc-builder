import apiCreator from "../apiCreator";

const productsAPI = apiCreator.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        queryKey,
        queryValue,
      }: {
        queryKey: string;
        queryValue: string;
      }) => `products?queryKey=${queryKey}&queryValue=${queryValue}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsAPI;
