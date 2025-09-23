export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  productUrl: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};