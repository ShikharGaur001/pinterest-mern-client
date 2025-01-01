import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pinService from "./pin.service";

const initialState = {
  pins: [],
  selectedPin: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new pin
export const createPin = createAsyncThunk(
  "pin/create",
  async (pinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await pinService.createPin(pinData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch all pins
export const getPins = createAsyncThunk("pin/getPins", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await pinService.getPins(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch a specific pin
export const getPin = createAsyncThunk(
  "pin/getPin",
  async (pinId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await pinService.getPin(pinId, token);
      return response.pin; // Return the pin object directly
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pins = [...state.pins, action.payload];
      })
      .addCase(createPin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pins = action.payload;
      })
      .addCase(getPins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedPin = action.payload; // Directly assign the pin object
      })
      .addCase(getPin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pinSlice.actions;
export default pinSlice.reducer;
