import apiCreator from "../api/apiCreator";

const ramAPI = apiCreator.injectEndpoints({
  endpoints: (builder) => ({
    getRam: builder.query({
      query: (qry) => `products?component=${qry}`,
    }),
  }),
});

export const { useGetRamQuery } = ramAPI;
