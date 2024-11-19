import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Main from "./views/Main";
import ParkingInformation from "./views/ParkingInformation";
import Redemption from "./views/Redemption";
import MainMenu from "./views/MainMenu";
import ManageUser from "./views/ManageUser";
import MyQR from "./views/MyQR";
import PreRegister from "./views/PreRegister";
import ManagePreRegister from "./views/ManagePreRegister";
import CallLift from "./views/CallLift";
import QRPreRegister from "./views/QRPreRegister";
import ManageRole from "./views/ManageRole";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: {
        name: "Login",
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Main",
      name: "Main",
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ParkingInformation",
      name: "ParkingInformation",
      component: ParkingInformation,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Redemption",
      name: "Redemption",
      component: Redemption,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/MainMenu",
      name: "MainMenu",
      component: MainMenu,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ManageUser",
      name: "ManageUser",
      component: ManageUser,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/MyQR",
      name: "MyQR",
      component: MyQR,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/PreRegister",
      name: "PreRegister",
      component: PreRegister,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ManagePreRegister",
      name: "ManagePreRegister",
      component: ManagePreRegister,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/CallLift",
      name: "CallLift",
      component: CallLift,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ManageRole",
      name: "ManageRole",
      component: ManageRole,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/QRPreRegister/:id",
      name: "QRPreRegister",
      component: QRPreRegister,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    var LoginStatus =
      localStorage.getItem("isLoggedIn") == "true" ? true : false;
    if (LoginStatus == true) {
      next();
      return;
    }
    next("/Login");
  } else {
    next();
  }
});
export default router;
