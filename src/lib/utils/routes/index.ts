
export const routes = {
  ui: {
    signIn: "/sign-in",
    dashboard: "/dashboard",
    areas: "/areas",
    category: "/category",
    order: "/order",
    user: "/user",
    userDetailPage:(id: string) => `/user/${id}`,
    areaDetailPage:(id: string) => `/areas/${id}`,
    paginatedAreas:(id: string) => `/areas?page=${id}`,
    paginatedPostcodes:(id: string, page:number) => `/areas/${id}?page=${page}`,

  },
  api: {
    login: "api/auth/login",
    postArea: "areas",
    postPostcode: "postcodes",
    deleteArea:(id: string) => `areas/${id}`,
    getAreas:(id: string, name:string) => `areas?name=${name}&page=${id}`,
    getPostcodes:(id: string, page:string) => `areas${id}/postcodes?page=${page}`,
    deletePostcode:(id: string) => `postcodes/${id}`,
    activePostcode:(id: string) => `postcodes/${id}/mark-as-active`,
    inactivePostcode:(id: string) => `postcodes/${id}/mark-as-in-active`,

    categories:'item-categories/admin-list',
    postCategory:'item-categories',
    categorydetails:(id: string) => `item-categories/${id}`,
    categoryitems:(id: string) => `item-categories/${id}/items`,
    postcategoryitems: "items",
    deletecategoryitem:(id: string) => `items/${id}`,

    orders:'orders/admin-list',
    user:'users/admin-list',
    getuserdetails:(id: string) => `users/${id}/admin-detail`,
  },
};
