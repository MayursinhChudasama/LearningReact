import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagTypes = {
  Data: "Data",
} as const;

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: [tagTypes.Data],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "buyers",
      providesTags: [tagTypes.Data],
    }),
    postData: builder.mutation({
      query: (newBuyer) => ({
        url: "buyers",
        method: "PUT",
        body: JSON.stringify(newBuyer),
      }),
      invalidatesTags: [tagTypes.Data],
    }),
  }),
});
export const { useFetchDataQuery, usePostDataMutation } = dataApi;
