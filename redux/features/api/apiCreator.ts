import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//=> API creator for Entire application
const apiCreator = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({}),
});

export default apiCreator;
