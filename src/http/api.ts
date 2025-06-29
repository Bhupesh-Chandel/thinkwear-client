import type {
  CreateCategoryData,
  CreateTenantData,
  CreateUserData,
  Credentials,
} from "../types";
import { api, catalogApiInstance, orderApiInstance } from "./client";

const catalogApi = catalogApiInstance;

interface Coupon {
  _id: string;
  couponCode: string;
  discount: number;
}

// Auth service
export const login = (credentials: Credentials) => {
  const resp = api.post(`/auth/login`, credentials);
  resp.then((res) => {
    console.log(res);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("accessToken", res.data.accessToken);
  });
  return resp;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyLoginMfa = (user: any) => api.post(`/auth/verifyLoginMfa`, user);

export const self = () => api.get(`/auth/self`);

export const logout = () => {
  const resp = api.post(`/auth/logout`);
  resp.then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
  return resp;
};

// users
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const googleOauth = (code: string) =>
  api.post(`/auth/googleOauth`,{code});

export const createUser = (user: CreateUserData) => api.post(`/users`, user);

export const updateUser = (user: CreateUserData, id: string) =>
  api.patch(`/users/${id}`, user);

export const deleteUser = (userId: string) => api.delete(`/users/${userId}`);
// end users

// tenants
export const getTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);

export const getAllTenants = async (query: string) => {
  return api.get(`/tenants?${query}`);
};

export const createTenant = (tenant: CreateTenantData) =>
  api.post(`/tenants`, tenant);

export const updateTenant = (tenant: CreateTenantData, id: number) =>
  api.patch(`/tenants/${id}`, tenant);

export const deleteTenant = (id: number) => api.delete(`/tenants/${id}`);
//end tenant

// categories
export const getCategories = (queryParam: string) =>
  catalogApi.get(`/categories?${queryParam}`);

export const getAllCategories = async (query: string) => {
  return catalogApi.get(`/categories?${query}`);
};

export const getCategory = (id: string) => catalogApi.get(`/categories/${id}`);

export const createCategory = (category: CreateCategoryData) =>
  catalogApi.post(`/categories`, category);

export const updateCategory = (category: CreateCategoryData, id: string) =>
  catalogApi.put(`/categories/${id}`, category);

export const deleteCategory = async (id: string) => {
  return catalogApi.delete(`/categories/${id}`);
};
//end categories

// products
export const getProducts = (queryParam: string) =>
  catalogApi.get(`/products?${queryParam}`);

export const getSingleProduct = (id:string) =>
  catalogApi.get(`/products/${id}`);

export const createProduct = (product: FormData) =>
  catalogApi.post(`/products`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (product: FormData, id: string) => {
  return catalogApi.put(`/products/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id: string) =>
  catalogApi.delete(`/products/${id}`);
//products

// topings
export const createTopping = async (topping: FormData) => {
  return catalogApi.post(`/toppings`, topping, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateTopping = async (topping: FormData, id: string) => {
  return catalogApi.put(`/toppings/${id}`, topping, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTopping = async (id: string) => {
  return catalogApi.delete(`/toppings/${id}`);
};

export const getAllToppings = async (query: string) => {
  return catalogApi.get(`/toppings?${query}`);
};
// toppings

// coupouns
export const getAllCoupons = async (query: string) => {
  return orderApiInstance.get(`/coupons?${query}`);
};

export const createCoupon = async (coupon: Coupon) => {
  return orderApiInstance.post(`/coupons?tenantId=1`, coupon);
};

export const updateCoupon = async (coupon: Coupon) => {
  return orderApiInstance.put(`/coupons/${coupon._id}`, coupon);
};

export const deleteCoupon = async (id: string) => {
  return orderApiInstance.delete(`/coupons/${id}`);
};
// coupouns

// orders
export const getAllOrders = async (query: string) => {
  return orderApiInstance.get(`/orders?${query}`);
};

export const getOrder = async (id: string) => {
  return orderApiInstance.get(
    `/orders/${id}?fields=orderStatus,paymentStatus,cart,total,address,paymentMode,comment`
  );
};

export const confirmOrder = async (id: string) => {
  return orderApiInstance.patch(`/orders/confirm/${id}`);
};

export const updateOrderStatus = async (id: string, status: string) => {
  return orderApiInstance.patch(`/orders/status/${id}`, {
    status,
  });
};

export const getTotalOrdersSales = async () => {
  return orderApiInstance.get(`/orders/total-order-sale`);
};

export const getRecentOrders = async () => {
  return orderApiInstance.get(`/orders/recent-orders`);
};
// orders

export const getSalesReport = async () => {
  return orderApiInstance.get(`/orders/sales-report`);
};
