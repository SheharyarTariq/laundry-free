
export const routes = {
  ui: {
    signIn: "/sign-in",
    dashboard: "/dashboard",
    areas: "/areas",
    category: "/category",
    order: "/order",
    user: "/user",
    areaDetailPage:(id: string) => `/areas/${id}`,
    paginatedAreas:(id: string) => `/areas?page=${id}`,
    paginatedPostcodes:(id: string, page:number) => `/areas/${id}?page=${page}`,

  },
  api: {
    login: "/api/auth/login",
    postArea: "/areas",
    deleteArea:(id: string) => `/areas/${id}`,
    getAreas:(id: string) => `/areas?page=${id}`,
    getPostcodes:(id: string) => `/areas/${id}/postcodes`,
    postPostcode: "/postcodes",
    deletePostcode:(id: string) => `/postcodes/${id}`,
    activePostcode:(id: string) => `/postcodes/${id}/mark-as-active`,
    inactivePostcode:(id: string) => `/postcodes/${id}/mark-as-in-active`
  },
};
