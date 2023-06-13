export interface Category {
  id: number;
  name: string;
  code: number;
  sector: number[];
}

export interface Product {
  id: number;
  price: number;
  name: string;
  description: string;
  code: number;
  is_available: boolean;
  created: string;
  updated: string;
  category: number;
  measure: number;
  option: boolean;
  quantity: string;
}