import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * Se não estiver compilando no modo SSR, você pode
 * exportar diretamente a instanciação do Roteador;
 *
 * A função abaixo também pode ser assíncrona; use
 * async/await ou retorne uma Promise que resolve
 * com a instância do Roteador.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Deixe como está e faça as alterações em quasar.conf.js!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Guard para rotas protegidas
  Router.beforeEach((to, from, next) => {
    // Lista de rotas públicas
    const publicPages = [
      "/",
      "/register",
      "/forgot-password",
      "/reset-password",
    ];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem("token");

    if (authRequired && !token) {
      return next("/");
    }
    next();
  });

  return Router;
});
