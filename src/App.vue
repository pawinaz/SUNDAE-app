<template>
  <v-app>
    <NavBar v-if="$route.path == '/Main' || $route.path == '/MainMenu' || $route.path == '/ManagePreRegister' || $route.path == '/ManageUser' || $route.path == '/ManageRole'
    || $route.path == '/MyQR'  || $route.path == '/CallLift' || $route.path == '/ParkingInformation' || $route.path == '/PreRegister' || $route.path == '/Redemption' || $route.path.startsWith('/QRPreRegister')"/>
    <v-content>
      <div>
        <router-view></router-view>
      </div>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    NavBar,
    Footer
  },
};
</script>

<style>
@font-face {
  font-family: "English";
  src: local("English"), url(./assets/Font/Roboto-Regular.ttf);
}
.v-content__wrap {
  background-color: primary;
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 959px) {
  .v-content__wrap {
    background-color: primary;
    width: 80%;
  }
}
* {
  font-family: "English";
}

#app {
  color: #444444;
}
::-webkit-scrollbar {
  display: none;
}
</style>
