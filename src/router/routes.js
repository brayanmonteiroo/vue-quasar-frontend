const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'register', component: () => import('pages/UserRegister.vue') },
      { path: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes