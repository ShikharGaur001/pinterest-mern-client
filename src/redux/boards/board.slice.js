import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "./board.service";

const initialState = {
  boards: [],
  selectedBoard: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new board
export const createBoard = createAsyncThunk(
  "board/create",
  async (boardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await boardService.createBoard(boardData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch a specific board
export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (boardId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await boardService.getBoard(boardId, token);
      return response.board; // Return the board object directly
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

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = [...state.boards, action.payload];
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedBoard = action.payload; // Directly assign the board object
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = boardSlice.actions;
export default boardSlice.reducer;
