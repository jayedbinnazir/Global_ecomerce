import React from "react";
import CheckOut from "../features/cart/components/CheckOut";
import Cart from "../features/cart/components/Cart";

const CheckOutPage = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 mb-5 sm:py-0 lg:max-w-5xl lg:px-8 ">
      <div className="flex flex-col md:flex-row gap-2 ">
        <div className="md:flex-grow md:border-r">
          <Cart />
        </div>
        <div className="md:flex-grow  ">
          <CheckOut />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
