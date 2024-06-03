import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Paginated_Products } from "../../types/productTypes";
import {
  fetchAllProducts,
  fetchProductsByFilter,
  // fetchSortedProducts,
} from "./productApi";

type State = {
  isLoading: boolean;
  products: Paginated_Products | null;
  error: string;
};

const initialState: State = {
  isLoading: false,
  products: null,
  error: "",
};

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  fetchAllProducts
);

export type Filter = {
  category?: string[];
  brand?: string[];
  sort?: string[];
};
export type FetchFilteredProductsParams = {
  filter: Filter;
  lastKey: string;
  checked?: boolean;
  pagination: {
    _page: number;
    _per_page: number;
  };
};

export type Sort = {
  sort: string;
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "product/fetchFilteredProducts",
  async ({
    filter,
    lastKey,
    checked,
    pagination,
  }: FetchFilteredProductsParams) => {
    const response = await fetchProductsByFilter({
      filter,
      lastKey,
      checked,
      pagination,
    });
    return response as Paginated_Products;
  }
);
// export const fetchSortedProductsAsync = createAsyncThunk(
//   "product/fetchSortedProducts",
//   async (sort: Sort) => {
//     const response = await fetchSortedProducts(sort);
//     return response as Product[];
//   }
// );

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        (state.isLoading = false), (state.products = action.payload);
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        (state.isLoading = false),
          (state.products = null),
          (state.error = action.error.message as string);
      })
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        (state.isLoading = false), (state.products = action.payload);
      })
      .addCase(fetchFilteredProductsAsync.rejected, (state, action) => {
        (state.isLoading = false),
          (state.products = null),
          (state.error = action.error.message as string);
      });
    // .addCase(fetchSortedProductsAsync.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(fetchSortedProductsAsync.fulfilled, (state, action) => {
    //   (state.isLoading = false), (state.products = action.payload);
    // })
    // .addCase(fetchSortedProductsAsync.rejected, (state, action) => {
    //   (state.isLoading = false),
    //     (state.products = []),
    //     (state.error = action.error.message as string);
    // });
  },
});
// now available:

export default productSlice.reducer;
