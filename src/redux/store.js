import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import pinReducer from "./pins/pin.slice"
import boardReducer from "./boards/board.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pins: pinReducer,
    boards: boardReducer
  },
});
