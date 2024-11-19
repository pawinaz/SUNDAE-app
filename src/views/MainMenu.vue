<template>
  <v-container style="max-width: 1200px;">
    <v-row style="min-height: 80vh;" justify="center" align="center">
        <v-col cols="12" v-for="item in CardList" :key="item.id" :md="item.col">
          <v-hover v-slot="{ hover }">
            <v-card  :elevation="hover ? 15 : 2">
              <v-img
                :src="item.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                style="cursor: pointer;"
                height="200px"
                @click="NavigatePage(item.name)"
              >
                <v-card-title
                  class="justify-center"
                  style="font-size: 22px"
                  v-text="item.name"
                ></v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

    <v-dialog v-model="LoadingDialog" persistent width="auto">
      <div class="loading-box">
        <div class="inter-load">
          <div class="rect rect1"></div>
          <div class="rect rect2"></div>
          <div class="rect rect3"></div>
          <div class="rect rect4"></div>
          <div class="rect rect5"></div>
        </div>
      </div>
    </v-dialog>
  </v-container>
</template>

  <script>
import enurl from "@/api/environment";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "MainMenu",
  components: {},
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      CardList: [],
    };
  },

  async mounted() {
    let self = this;
    self.getDataMenuPermission();
  },

  methods: {
    getDataMenuPermission() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Permission/getDataMenuPermission`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            let MenuPermission = response.data.data;
            self.CardList = [];
            if (MenuPermission.qr == true && MenuPermission.qr != null) {
              let item = {
                src: require("@/assets/QR.jpg"),
                col: 3,
                name: "MyQR",
                id: 1,
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.redemption == true &&
              MenuPermission.redemption != null
            ) {
              let item = {
                src: require("@/assets/estamp.jpg"),
                col: 3,
                name: "Redemption",
                id: 2,
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.callLift == true &&
              MenuPermission.callLift != null
            ) {
              let item = {
                src: require("@/assets/CallLift.jpg"),
                col: 3,
                name: "Call Lift",
                id: 3,
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.preRegister == true &&
              MenuPermission.preRegister != null
            ) {
              let item = {
                src: require("@/assets/preregister.jpg"),
                col: 3,
                name: "Pre Register",
                id: 4,
              };
              self.CardList.push(item);
            }
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error,
          });
        });
    },

    NavigatePage(PageName){
      let self = this;
      if(PageName == "MyQR"){
        self.$router.push("/MyQR");
      }
      if(PageName == "Redemption"){
        self.$router.push("/Main");
      }
      if(PageName == "Pre Register"){
        self.$router.push("/ManagePreRegister");
      }
    }
  },
};
</script>
  <style scoped>
.centered-input-header >>> input {
  text-align: center;
  color: black;
}
.TitleCSS {
  font-size: 18px;
  font-weight: 300;
  color: black;
}
@font-face {
  font-family: "Roboto", sans-serif;
  src: local("English"), url(../assets/Font/Kanit-Regular.ttf);
}
* >>> .v-data-table-header {
  background-color: #333333 !important;
  color: #ffffff !important;
}
* >>> .v-data-table-header th {
  font-size: 14px !important;
  color: #ffffff !important;
}
</style>
  