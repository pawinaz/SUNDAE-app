<template>
  <div>
    <v-card style="display: contents">
      <div style="margin: 10px">
        <v-card-text>
          <v-row
            cols="12"
            justify="center"
            class="mt-5"
          >
            <v-col cols="12" md="6" align="center">
              <v-img
                alt="Logo"
                class="shrink app"
                contain
                :src="logoimage"
                transition="scale-transition"
                width="150"
              />
              <p class="mt-5" style="font-size: 25px; font-weight: bold; color: text">
                {{ Username }}
              </p>
              <div v-if="LoadingDialog" class="mt-10">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              <qrcode-vue
                v-else
                class="mt-10"
                :value="QRvalue"
                :size="QRsize"
                level="M"
                style="background-color: white; padding: 2%; width: 300px; display: flex; justify-content: center;"
              ></qrcode-vue>
              <p class="mt-10" style="font-size: 18px; font-weight: bold; color: text">
                {{ ChangeFormatDate(CreateTime) }}
              </p>
              <div class="mt-10">
                <span style="font-size: 16px; color: text">Refresh In : </span>
                <span style="font-size: 16px; font-weight: bold; color: text">{{ TextTime }}</span>
              </div>
              <v-btn
                height="40"
                width="150"
                color="red"
                class="white--text mt-2"
                @click="goToManagePreRegister"
              >
                Back
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import enurl from "@/api/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import QrcodeVue from "qrcode.vue";

export default {
  name: "MyQR",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      QRvalue: "",
      QRsize: 200,
      Username: this.$cookies.get("Username"),
      CreateTime: "",
      TextTime: "",

      ConfigDialog:false,
      logoimage:""
    };
  },

  async mounted() {
    let self = this;
    await self.getMyQR();
    self.GetDataConfigLoginPage()
  },

  methods: {
    getMyQR() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}User/MyQR`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.QRvalue = response.data.data.qrData;
            self.CreateTime = response.data.data.createDate;
            self.countdown(5, 0);
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

    countdown(minutes, seconds) {
      let self = this;
      var endTime, hours, mins, msLeft, time;

      function twoDigits(n) {
        return n <= 9 ? "0" + n : n;
      }

      function updateTimer() {
        msLeft = endTime - +new Date();
        if (msLeft < 1000) {
          self.getMyQR();
        } else {
          time = new Date(msLeft);
          hours = time.getUTCHours();
          mins = time.getUTCMinutes();
          self.TextTime =
            (hours ? hours + ":" + twoDigits(mins) : mins) +
            ":" +
            twoDigits(time.getUTCSeconds());
          setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
      }
      endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
      updateTimer();
    },

    ChangeFormatDate(date) {
      if (!date) return null;
      var DateData = new Date(date);
      var hours = DateData.getHours();
      var minutes = DateData.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes;
      return (
        DateData.getDate() +
        "/" +
        (DateData.getMonth() + 1) +
        "/" +
        DateData.getFullYear() +
        "  " +
        strTime
      );
    },
    goToManagePreRegister() {
      this.$router.push({ name: 'MainMenu' });
    },

    GetDataConfigLoginPage(){
      let self =this;
      axios
        .get(`${self.url}Login/GetDataConfigLoginPage`)
        .then(function (response) {
          if (response.data.status == 0) {
            console.log(response.data.data)
            self.logoimage = response.data.data.logoimage
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    
  },
};
</script>
<style scoped></style>
