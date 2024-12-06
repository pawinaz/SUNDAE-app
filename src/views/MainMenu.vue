<template>
  <v-container style="max-width: 1200px;">
    <v-row style="min-height: 80vh;" justify="center" align="center">
      <v-col 
        v-for="item in CardList" 
        :key="item.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
        class="menu-card-col"
      >
        <div class="card-wrapper">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                class="menu-card"
              >
                <v-img
                  :src="item.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  @click="NavigatePage(item.name)"
                >
                  <div class="card-overlay" :class="{ 'overlay-hover': hover }">
                    <v-card-title
                      class="justify-center text-center"
                      v-text="item.name"
                    ></v-card-title>
                  </div>
                </v-img>
              </v-card>
            </template>
          </v-hover>
        </div>
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

.menu-card-col {
  padding: 12px;
}

.card-wrapper {
  perspective: 1000px;
}

.menu-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.menu-card.on-hover {
  transform: scale(1.05);
}

.card-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  transition: all 0.3s ease;
}

.overlay-hover {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.v-card-title {
  font-size: 22px !important;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
  width: 100%;
  padding: 16px;
}

.on-hover .v-card-title {
  transform: translateY(-5px);
}

/* Add some animation for card appearance */
@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-card-col {
  animation: cardAppear 0.5s ease forwards;
  animation-delay: calc(var(--card-index) * 0.1s);
}
</style>

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
            let cardIndex = 0;
            if (MenuPermission.qr == true && MenuPermission.qr != null) {
              let item = {
                src: require("@/assets/QR.jpg"),
                name: "MyQR",
                id: 1,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.redemption == true &&
              MenuPermission.redemption != null
            ) {
              let item = {
                src: require("@/assets/qr-code-payments.jpg"),
                name: "Redemption",
                id: 2,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.callLift == true &&
              MenuPermission.callLift != null
            ) {
              let item = {
                src: require("@/assets/CallLift.jpg"),
                name: "Call Lift",
                id: 3,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.preRegister == true &&
              MenuPermission.preRegister != null
            ) {
              let item = {
                src: require("@/assets/preregister.jpg"),
                name: "Pre Register",
                id: 4,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
          }
          self.LoadingDialog = false;
          self.$nextTick(() => {
            document.querySelectorAll('.menu-card-col').forEach((card, index) => {
              card.style.setProperty('--card-index', index);
            });
          });
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
  