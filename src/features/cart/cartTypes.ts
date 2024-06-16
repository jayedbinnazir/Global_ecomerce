import { Product } from "../../types/productTypes";

export type CartProduct = Product & {
  quantity: number;
  userId: string;
};

export type InitialStateCart = {
  isLoading: boolean;
  items: CartProduct[];
  error: string;
};
