import AC from "../components/async_load";

export default [
  {
    path: "/",
    name: "首页",
    icon: "home",
    component: AC(() => import("../views/home"))
  },
  {
    path: "/detail/:id",
    name: "详情页",
    component: AC(() => import("../views/movies/detail"))
  }
];
