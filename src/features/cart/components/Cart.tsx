import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { fetchItemByUserIdAsync } from "../cartSlice";
import { CartProduct } from "../cartTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Cart() {
  const location = useLocation();

  const { isLoading, items, error } = useAppSelector((state) => state.cart);
  const { loggedinUser } = useAppSelector((state) => state.users);
  const dispathcCartProduct = useAppDispatch();

  useEffect(() => {
    dispathcCartProduct(fetchItemByUserIdAsync(loggedinUser?.id as string));
  }, [dispathcCartProduct, loggedinUser?.id]);

  if (isLoading) {
    return (
      <img
        src="/spinner.svg"
        alt="Icon"
        width="100"
        height="100"
        className="motion-safe:animate-spin mx-auto "
      />
    );
  }
  if (error) {
    return (
      <h1 className=" flex justify-center text-4xl font-semibold">{error}</h1>
    );
  }

  console.log({ items });

  return (
    <div className="mx-auto bg-white  max-w-2xl px-4 py-0 sm:px-6 mb-5 sm:py-0 lg:max-w-5xl lg:px-8">
      {location.pathname === "/cart/checkout" ? (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 pt-4">
          Product Summary
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 pt-4">
          Shopping cart
        </h1>
      )}

      <div className="flow-root border-t border-gray-200 px-4 border-b py-6 sm:px-6 ">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {items.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.thumbnail}
                  alt={product.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <NavLink to={`/product-details/` + product.id}>
                        {product.title}
                      </NavLink>
                    </h3>
                    <p className="ml-4">{product.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500"></p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="text-gray-500 flex gap-1 items-baseline ">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Qty {product.quantity}
                    </label>
                    <select>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className=" border-gray-200 px-4  py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            $
            {items.reduce(
              (sum: number, current: CartProduct): number =>
                sum + current.price,
              0
            )}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6  ">
          <Link
            to={"/cart/checkout"}
            className="flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium  text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <NavLink
              to={"/"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
