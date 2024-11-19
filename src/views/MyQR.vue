<template>
  <div>
    <v-card style="display: contents">
      <div style="margin-left: 10px; margin-right: 10px">
        <div
          style="
            font-size: 18px;
            margin-left: 1rem;
            margin-right: 1rem;
            color: #444444;
            cursor: default;
            margin-top: -1rem;
          "
        ></div>
        <v-card-text>
          <div style="margin-left: 10px; margin-right: 10px">
            <v-row
              cols="12"
              xs="12"
              sm="12"
              md="12"
              justify="center"
              class="mt-5"
            >
              <v-col cols="12" md="12" align="center">
                <!-- <div>
                  <v-img
                    width="200"
                    height="120"
                    src="@/assets/Sundae_Logo.png"
                  ></v-img>
                </div> -->
                <div align="center">
                  <v-img
                    alt="Logo"
                    class="shrink app"
                    contain
                    src="@/assets/Sundae_Logo.png"
                    transition="scale-transition"
                    width="250"
                  />
                </div>
                <p
                  class="mt-5"
                  style="font-size: 25px; font-weight: bold; color: black"
                >
                  {{ Username }}
                </p>
                <qrcode-vue
                  class="mt-10"
                  :value="QRvalue"
                  :size="QRsize"
                  level="M"
                ></qrcode-vue>
                <p
                  class="mt-10"
                  style="font-size: 18px; font-weight: bold; color: black"
                >
                  {{ ChangeFormatDate(CreateTime) }}
                </p>
                <div class="mt-10">
                  <span style="font-size: 16px; color: black">
                    Refresh In : </span
                  ><span
                    style="font-size: 16px; font-weight: bold; color: black"
                    >{{ TextTime }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </div>
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
      QRsize: 250,
      Username: this.$cookies.get("Username"),
      CreateTime: "",
      TextTime: "",
    };
  },

  async mounted() {
    let self = this;
    await self.getMyQR();
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
  },
};
</script>
<style scoped></style>
