import { NavLink } from "react-router-dom";
// import { Products } from "../../types/productTypes";
// import { products } from "../../data/product";
import { useAppSelector } from "../../app/hooks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const oldProducts: Products[] = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

const ProductList = () => {
  const state = useAppSelector((state) => state.products);

  if (state.isLoading) {
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

  if (state.error) {
    return (
      <h1 className=" flex justify-center text-4xl font-semibold">
        {state.error}
      </h1>
    );
  }

  console.log("redux--->", state.products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 mb-5 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {state.products?.data?.map((product) => (
            <NavLink key={product.id} to={`product-details/${product.id}`}>
              <div
                key={product.id}
                className="group relative shadow-lg border-b-2  "
              >
                <div className="aspect-h-1 border-1  shadow-sm  border-r aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex p-2  justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-md text-gray-500 flex gap-1 items-center p-1 ">
                      <svg
                        className="text-gray-900 h-6 w-6 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{product.rating}</span>
                    </p>
                  </div>
                  <div className="flex-cols   ">
                    <p className="text-sm flex justify-end font-medium text-gray-900">
                      dis-$
                      {Math.round(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm flex line-through justify-end font-medium text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
