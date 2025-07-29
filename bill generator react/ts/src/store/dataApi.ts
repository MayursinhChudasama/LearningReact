import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buyer } from "../Models/buyer";

const tagTypes = {
  Data: "Data",
} as const;

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [tagTypes.Data],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "buyers",
      providesTags: [tagTypes.Data],
    }),
    postData: builder.mutation({
      query: (newBuyer) => ({
        url: "buyers",
        method: "POST",
        body: newBuyer,
      }),
      invalidatesTags: [tagTypes.Data],
    }),
    putData: builder.mutation({
      query: ({ id, editBuyer }: { id: string; editBuyer: buyer }) => ({
        url: `buyers/${id}`,
        method: "PUT",
        body: editBuyer,
      }),
      invalidatesTags: [tagTypes.Data],
    }),
    deleteBuyer: builder.mutation({
      query: (id) => ({
        url: `buyers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Data],
    }),
  }),
});

export const {
  useFetchDataQuery,
  usePostDataMutation,
  usePutDataMutation,
  useDeleteBuyerMutation,
} = dataApi;
