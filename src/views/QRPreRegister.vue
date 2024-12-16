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
                    src="@/assets/logofs_png.png"
                  ></v-img>
                </div> -->
                <div align="center">
                  <v-img
                    alt="Logo"
                    class="shrink app"
                    contain
                    src="@/assets/sundae.png"
                    transition="scale-transition"
                    width="250"
                  />
                </div>
                <p
                  style="
                    font-size: 20px;
                    font-weight: bold;
                    color: text;
                    margin-top: 10px;
                  "
                >
                  {{ visitorName }}
                </p>
                <qrcode-vue
                  class="mt-10"
                  :value="QRvalue"
                  :size="QRsize"
                  level="M"
                  style="background-color: white; padding: 2%; width: 300px; display: flex; justify-content: center;"
                ></qrcode-vue>
                <p
                  class="mt-10"
                  style="font-size: 18px; font-weight: bold; color: text"
                >
                  {{ Detail }}
                </p>
                <p
                  class="mt-10"
                  style="font-size: 18px; font-weight: bold; color: text"
                >
                  {{ CreateTime }}
                </p>
                <!-- <v-btn
                  height="40"
                  width="150"
                  color="indigo"
                  class="white--text mt-2"
                  @click="copyURL()"
                >
                  Copy Link
                </v-btn>
                <v-btn  height="40"
                  width="150"
                  color="red"
                  class="white--text mt-2"
                  @click="goToManagePreRegister"
                >
                  ย้อนกลับ
                </v-btn> -->
              </v-col>
              <v-col cols="12" md="12" align="center">
                <v-btn
                  height="40"
                  width="150"
                  color="indigo"
                  class="white--text mt-2"
                  @click="copyURL()"
                >
                  Copy Link
                </v-btn>

                {{ edit_1 }}
                <v-btn
                  height="40"
                  width="150"
                  color="red"
                  class="white--text mt-2"
                  style="margin-top: 10px"
                  @click="goToManagePreRegister"
                >
                  Back
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" align="center">
                <div>
                  <span style="font-size: 16px; color: text">
                    Refresh In : </span
                  ><span
                    style="font-size: 16px; font-weight: bold; color: text"
                    >{{ TextTime }}</span
                  >
                </div>
              </v-col>
              <!-- <v-col cols="12" md="6" align="center">
                <div class="mt-10">
                  <span style="font-size: 16px; color: black">
                    Refresh In : </span
                  ><span
                    style="font-size: 16px; font-weight: bold; color: black"
                    >{{ TextTime }}</span
                  >
                </div>
              </v-col> -->
            </v-row>
          </div>
        </v-card-text>
      </div>
    </v-card>

    <v-dialog v-model="LoadingDialog" persistent width="0.01">
      <v-card>
        <v-card-text>
          <v-row>
            <LoadingComponent class="centered"></LoadingComponent>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import enurl from "@/api/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import QrcodeVue from "qrcode.vue";

export default {
  name: "QRPreRegister",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      QRvalue: "",
      QRsize: 250,
      Detail: "",
      CreateTime: "",
      TextTime: "",
      visitorName: "",
    };
  },

  async mounted() {
    let self = this;
    let url = window.location.href;
    if (url != "") {
      let url_text = url.split("/");
      self.getQRPreRegister(url_text[url_text.length - 1]);
    }
  },

  methods: {
    getQRPreRegister(uid) {
      let self = this;
      let temp = {
        invite_uid: uid,
      };
      self.LoadingDialog = true;
      axios
        .post(`${self.url}PreRegister/getQRPreRegisterByUid`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.QRvalue = response.data.data.qrData;
            self.CreateTime = response.data.data.createDate;
            self.Detail = response.data.data.detail;
            self.visitorName = response.data.data.visitorName;
            self.countdown(response.data.data.durationTime, 0);
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

    copyURL() {
      let url = window.location.href;
      navigator.clipboard.writeText(url);
      Swal.fire({
        icon: "success",
        title: "Copy Link",
        showConfirmButton: false,
        timer: 1500,
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
          let url = window.location.href;
          if (url != "") {
            let url_text = url.split("/");
            self.getQRPreRegister(url_text[url_text.length - 1]);
          }
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
      this.$router.push({ name: "ManagePreRegister" });
    },
  },
};
</script>
<style scoped></style>
