import { configureStore, createSlice } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";

const initialCurrencyState = {
  currencyUuid: "yhjMzLPhuIDl",
  sign: "$",
  name: "USD",
};

const currencySlice = createSlice({
  name: "currency",
  initialState: initialCurrencyState,
  reducers: {
    updateCurrency(state, action) {
      state.currencyUuid = action.payload.key;
      state.sign = action.payload.sign;
      state.name = action.payload.name;
    },
  },
});

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    currency: currencySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
export const currencyActions = currencySlice.actions;
export default store;
