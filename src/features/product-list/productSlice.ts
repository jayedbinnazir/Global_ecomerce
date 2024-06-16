import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Option, Paginated_Products, Product } from "../../types/productTypes";
import {
  fetchAllBrand,
  fetchAllCategory,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByFilter,
  // fetchSortedProducts,
} from "./productApi";

type State = {
  isLoading: boolean;
  products: Paginated_Products | null;
  error: string;
  brands: Option[];
  category: Option[];
  selectedProduct: Product | null;
};

const initialState: State = {
  isLoading: false,
  products: null,
  error: "",
  brands: [],
  category: [],
  selectedProduct: null,
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

export const fetchAllCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async () => {
    const response = await fetchAllCategory();
    const categories = await response.json();
    return categories;
  }
);
export const fetchAllBrandAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchAllBrand();
    const brands = await response.json();
    return brands;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (productId: string) => {
    const product = await fetchProductById(productId);
    return product;
  }
);

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
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        (state.isLoading = false), (state.category = action.payload);
      })
      .addCase(fetchAllCategoryAsync.rejected, (state, action) => {
        (state.isLoading = false),
          (state.category = []),
          (state.error = action.error.message as string);
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        (state.isLoading = false), (state.brands = action.payload);
      })
      .addCase(fetchAllBrandAsync.rejected, (state, action) => {
        (state.isLoading = false),
          (state.brands = []),
          (state.error = action.error.message as string);
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        (state.isLoading = false), (state.selectedProduct = action.payload);
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        (state.isLoading = false),
          (state.selectedProduct = null),
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
