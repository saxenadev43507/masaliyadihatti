export interface ProductData {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  weight: number;
  rating: number;
  tags: string[];
  image: string;
  desc: string;
}

export const allProducts: ProductData[] = [];
