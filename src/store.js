import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./components/Character/characterReducer";

export default configureStore({
  reducer: {
    character: characterReducer,
  },
});
