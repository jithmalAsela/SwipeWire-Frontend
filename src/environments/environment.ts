// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:"http://localhost:8087",
  signupUrl : "/home/signup",
  loginUrl : "/home/auth",
  addToCartUrl : "/user/addToCart",
  viewCartUrl : "/user/viewCart",
  updateCartUrl : "/user/updateCart",
  deleteCartUrl: "/user/delCart",
  addAddressUrl : "/user/addAddress",
  viewAddressUrl : "/user/getAddress",
  productsUrl : "/user/getProducts",
  productCategoryUrl : "/user/getProductCategory",
  productsSearchUrl : "/user/getProductsByName",
  addProductUrl : "/admin/addProduct",
  deleteProductUrl : "/admin/delProduct",
  updateProductUrl : "/admin/updateProducts",
  viewOrderUrl : "/admin/viewOrders",
  viewOrderByUserUrl : "/user/viewOrdersUsers",
  updateOrderUrl : "/admin/updateOrder",
  placeOrderUrl : "/user/placeOrder",
  logoutUrl : "/home/logout",
};

