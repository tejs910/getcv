import { configureStore } from "@reduxjs/toolkit";
import formStore from "./formStore";

const store = configureStore({
  reducer: {
    formStore,
  },
});

export default store;
