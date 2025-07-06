const routes = [
  // Rotas públicas (sem layout)
  {
    path: "/",
    component: () => import("pages/Login-1.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/UserRegister.vue"),
  },
  {
    path: "/forgot-password",
    component: () => import("pages/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    component: () => import("pages/ResetPassword.vue"),
  },

  // Rotas protegidas (com MainLayout)
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("pages/Dashboard.vue") },
      { path: "dashboard2", component: () => import("pages/Dashboard2.vue") },
      { path: "profile", component: () => import("pages/UserProfile.vue") },
      { path: 'users', component: () => import('pages/UserList.vue') },
      { path: "map", component: () => import("pages/Map.vue") },
      { path: "mapmarker", component: () => import("pages/MapMarker.vue") },
      { path: "treetable", component: () => import("pages/TreeTable.vue") },
      { path: "streetview", component: () => import("pages/StreetView.vue") },
      { path: "cards", component: () => import("pages/Cards.vue") },
      { path: "tables", component: () => import("pages/Tables.vue") },
      { path: "contact", component: () => import("pages/Contact.vue") },
      { path: "checkout", component: () => import("pages/Checkout.vue") },
      {
        path: "ecommerce",
        component: () => import("pages/ProductCatalogues.vue"),
      },
      { path: "pagination", component: () => import("pages/Pagination.vue") },
      { path: "charts", component: () => import("pages/Charts.vue") },
      { path: "calendar", component: () => import("pages/Calendar.vue") },
      { path: "directory", component: () => import("pages/Directory.vue") },
      { path: "footer", component: () => import("pages/Footer.vue") },
      { path: "cardheader", component: () => import("pages/CardHeader.vue") },
      { path: "mail", component: () => import("layouts/Mail.vue") },
      { path: "maintenance", component: () => import("pages/Maintenance.vue") },
      { path: "pricing", component: () => import("pages/Pricing.vue") },
      { path: "lock", component: () => import("pages/LockScreen.vue") },
      { path: "lock-2", component: () => import("pages/LockScreen-2.vue") },
    ],
  },

  // 404
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
