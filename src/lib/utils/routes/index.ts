
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
  },
  api: {
    login: "/api/auth/login",
    postArea: "/areas",
    getAreas:(id: string) => `/areas?page=${id}`,
  },
};
