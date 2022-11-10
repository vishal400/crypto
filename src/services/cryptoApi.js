import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url) => {
  console.log(url);
  return { url, headers };
};

export const cryptoApi = createApi({
  reducerPath: "CryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ count, referenceCurrencyUuid }) =>
        createRequest(
          `/coins?referenceCurrencyUuid=${referenceCurrencyUuid}&limit=${count}`
        ),
    }),
    getCryptoDetails: builder.query({
      query: ({ coinId, referenceCurrencyUuid }) =>
        createRequest(`/coin/${coinId}?referenceCurrencyUuid=${referenceCurrencyUuid}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod, referenceCurrencyUuid }) =>
        createRequest(`coin/${coinId}/history?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timeperiod}`),
    }),
    getReferenceCurrency: builder.query({
      query: () => ({
        url: `reference-currencies?limit=100`,
        headers,
        responseHandler: (response) => {
          console.log(response);
        },
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetReferenceCurrencyQuery,
} = cryptoApi;
