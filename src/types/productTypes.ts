export type Products = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type Paginated_Products = {
  first: number;
  prev: null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Product[];
};

export type Option = { value: string; label: string; checked: boolean };

export type FilterSection = {
  id: string;
  name: string;
  options: Option[];
};

export type SortedOption = { name: string; sort: string; current: boolean };
