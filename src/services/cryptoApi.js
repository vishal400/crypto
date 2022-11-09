import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const headers = {
  "X-RapidAPI-Key": "36f237bc0fmsh96af0517be4c887p1d433fjsnda0e161b6068",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url) => {
    console.log(url)
    return ({ url, headers });
}

export const cryptoApi = createApi({
  reducerPath: "CryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinid) => createRequest(`/coin/${coinid}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
