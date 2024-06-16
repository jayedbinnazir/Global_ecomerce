import { CartProduct } from "./cartTypes";

export interface ApiError {
  message: string;
}
export const addToCart = async (item: CartProduct): Promise<CartProduct> => {
  const response = await fetch("http://localhost:5000/carts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || "There is a problem adding item");
  }

  const cartItem = (await response.json()) as CartProduct;
  //here we ahould return { message:"item added successfully" }
  return cartItem;
};

export const fetchItemsByUSerId = async (
  userId: string
): Promise<CartProduct[]> => {
  const response = await fetch("http://localhost:5000/carts?userId=" + userId);
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || "error fetching cart items");
  }
  const userCartItems: CartProduct[] = await response.json();
  return userCartItems;
};
