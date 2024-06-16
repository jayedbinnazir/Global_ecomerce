import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchUserState, LoggedInUser, User } from "./types/types";
import { createUser, loginUser } from "./authApi";

const initialState: FetchUserState = {
  isLoading: false,
  loggedinUser: null,
  error: "",
};

export const createUserAsync = createAsyncThunk<
  LoggedInUser,
  User,
  { rejectValue: string }
>("user/createUser", async (userData: User, { rejectWithValue }) => {
  try {
    const user: LoggedInUser = await createUser(userData);
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occured");
    }
  }
});

export const loginUserAsync = createAsyncThunk<
  LoggedInUser,
  User,
  { rejectValue: string }
>("user/login", async (userData: User, { rejectWithValue }) => {
  try {
    const user: LoggedInUser = await loginUser(userData);
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occured");
    }
  }
});

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.loggedinUser = null;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedInUser>) => {
          state.isLoading = false;
          state.loggedinUser = action.payload;
          state.error = "";
        }
      )
      .addCase(
        createUserAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.loggedinUser = null;
          state.error = action.payload as string;
        }
      )
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.loggedinUser = null;
        state.error = "";
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedInUser>) => {
          state.isLoading = false;
          state.loggedinUser = action.payload;
          state.error = "";
        }
      )
      .addCase(
        loginUserAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.loggedinUser = null;
          state.error = action.payload as string;
        }
      );
  },
});

export default AuthSlice.reducer;
