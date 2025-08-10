
export const routes = {
  ui: {
    signIn: "/sign-in",
    dashboard: "/dashboard",
    areas: "/areas",
    category: "/category",
    order: "/order",
    user: "/user",
    areaDetailPage:(id: string) => `/areas/${id}`
  },
  api: {
    login: "api/auth/login",
    getAreas: "areas",
    postArea: "areas",
  },
};
