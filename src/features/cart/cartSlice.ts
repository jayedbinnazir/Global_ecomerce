import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemsByUSerId } from "./cartApi";
import { CartProduct, InitialStateCart } from "./cartTypes";

const initialState: InitialStateCart = {
  isLoading: false,
  items: [],
  error: "",
};

export const addToCartAsync = createAsyncThunk<
  CartProduct,
  CartProduct,
  { rejectValue: string }
>("cart/addToCart", async (item: CartProduct, { rejectWithValue }) => {
  try {
    const cartItem: CartProduct = await addToCart(item);
    return cartItem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occured");
    }
  }
});

export const fetchItemByUserIdAsync = createAsyncThunk<
  CartProduct[],
  string,
  { rejectValue: string }
>("cart/fetchItemById", async (userId: string, { rejectWithValue }) => {
  try {
    const items: CartProduct[] = await fetchItemsByUSerId(userId);
    return items;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("an unknown error occured");
    }
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.items = [];
      })
      .addCase(
        addToCartAsync.fulfilled,
        (state, action: PayloadAction<CartProduct>) => {
          state.isLoading = false;
          state.items.push({ ...action.payload });
          state.error = "";
        }
      )
      .addCase(
        addToCartAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      )
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.isLoading = true;
        (state.items = []), (state.error = "");
      })
      .addCase(
        fetchItemByUserIdAsync.fulfilled,
        (state, action: PayloadAction<CartProduct[]>) => {
          state.isLoading = false;
          state.items = [...action.payload];
        }
      )
      .addCase(
        fetchItemByUserIdAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default cartSlice.reducer;
