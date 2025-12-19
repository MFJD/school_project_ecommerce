import api from "./axios";

export type PurchaseProduct = {
  product: string;
  quantity: number;
};

export type PurchasePayload = {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  products: PurchaseProduct[];
};

export type UserWithPurchases = {
  _id: string;
  name: string;
  surname?: string;
  email: string;
  purchases?: any[]; // adjust to your actual purchase shape
  // add other user fields as needed
};

export const purchaseProducts = async (data: PurchasePayload) => {
  const res = await api.post("/users/purchase", data);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get<UserWithPurchases[]>("/users");
  return res.data;
};