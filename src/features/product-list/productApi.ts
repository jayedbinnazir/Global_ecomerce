// import { Paginated_Products } from "../../types/productTypes";
import { Paginated_Products } from "../../types/productTypes";
import { Filter } from "./productSlice";

export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  if (!response.ok) {
    throw new Error("Faild to fetch Products");
  }
  const products = await response.json();
  console.log(response);
  return products;
};

const lastQueryString: string[] = [];
const lastKeysArr: string[] = [];

export const fetchProductsByFilter = async ({
  filter,
  lastKey,
  checked,
  pagination,
}: {
  filter: Filter;
  lastKey: string;
  checked?: boolean;
  pagination: {
    _page: number;
    _per_page: number;
  };
}) => {
  let queryString = "";
  console.log({ filter, lastKey, checked, pagination });

  if (checked) {
    lastKeysArr.push(lastKey);
  } else {
    if (lastKey.length > 0) {
      const delIndex = lastKeysArr.indexOf(lastKey) - 1;
      lastKeysArr.splice(delIndex, 1);
      // lastQueryString.pop();
    }
  }

  console.log("last  arr of keys", lastKeysArr);
  // Check if lastKey is present in the filter object

  if (lastKeysArr[lastKeysArr.length - 1] in filter) {
    const lastValue = (
      filter[lastKeysArr[lastKeysArr.length - 1] as keyof Filter] as string[]
    )[
      (filter[lastKeysArr[lastKeysArr.length - 1] as keyof Filter] as string[])
        .length - 1
    ];

    if (lastKeysArr[lastKeysArr.length - 1] === "sort") {
      queryString += `${lastQueryString[lastQueryString.length - 1]}&_${
        lastKeysArr[lastKeysArr.length - 1]
      }=${lastValue}`;
    } else {
      queryString += `${lastKeysArr[lastKeysArr.length - 1]}=${lastValue}`;
      lastQueryString.push(queryString);
    }
  } else {
    const response = await fetch(
      `http://localhost:5000/products?_page=${pagination._page}&_per_page=${pagination._per_page}`
    );
    const FilteredProducts = await response.json(); // Ensure await here to get the actual data
    return FilteredProducts as Paginated_Products;
  }

  console.log("lastQueryString-->", lastQueryString);

  const response = await fetch(
    `http://localhost:5000/products?_page=${pagination._page}&_per_page=${
      pagination._per_page
    }&${
      lastKey === "sort"
        ? queryString
        : lastQueryString[lastQueryString.length - 1]
    }`
  );
  const FilteredProducts = await response.json(); // Ensure await here to get the actual data
  return FilteredProducts as Paginated_Products;
};

// export const fetchSortedProducts = async (sort: Sort) => {
//   let sortedString = "";

//   for (const key in sort) {
//     if (Object.prototype.hasOwnProperty.call(sort, key)) {
//       sortedString = `_sort=${sort[key as keyof typeof sort]}`;
//     }
//   }

//   const response = await fetch(
//     `http://localhost:5000/products?${sortedString}`
//   );

//   const sortedProducts = await response.json();

//   return sortedProducts;
// };

export const fetchAllCategory = async () => {
  const response = await fetch("http://localhost:5000/category");
  return response as Response;
  // const categories = await response.json();
  // return categories as Option[];
};

export const fetchAllBrand = async () => {
  const response = await fetch("http://localhost:5000/brands");
  return response as Response;
  // const brands = await response.json();
  // return brands as Option[];
};

export const fetchProductById = async (productId: number) => {
  const response = await fetch(`http://localhost:5000/products/${productId}`);
  const product = await response.json();
  return product;
};
