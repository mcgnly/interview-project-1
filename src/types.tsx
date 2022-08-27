type ISO8601DateTime = string;

export interface Product {
  id: number;
  imageSrc: string;
  name: string;
  priceCents: number;
  createdAt?: ISO8601DateTime;
  updatedAt?: ISO8601DateTime;
}
