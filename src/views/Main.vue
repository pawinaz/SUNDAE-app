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
          <div>
            <v-row
              cols="12"
              xs="12"
              sm="12"
              md="12"
              justify="center"
              :style="
                $vuetify.breakpoint.smAndDown
                  ? { marginTop: '10%' }
                  : $vuetify.breakpoint.mdAndDown
                  ? { marginTop: '10%' }
                  : { marginTop: '3%' }
              "
            >
              <v-col
                cols="12"
                md="12"
                align="center"
                style="font-size: 22px; color: #14223c"
              >
                <p>Parking Redemption</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-tabs>
                  <v-tab @click="ChangeTab('Search')">Search</v-tab>
                  <v-tab @click="ChangeTab('QR')">Scan QRCode</v-tab>
                  <v-tabs-slider :color="ColorTab"></v-tabs-slider>
                  <v-tab-item>
                    <v-card
                      flat
                      :style="
                        $vuetify.breakpoint.smAndDown
                          ? { marginTop: '20%' }
                          : { marginTop: '0%' }
                      "
                    >
                      <v-card-text>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="6">
                            <p class="TitleCSS">Please Input</p>
                            <v-text-field
                              placeholder="License Number./Ticket Number./Log Id."
                              outlined
                              v-model="SearchInput"
                              @keyup.enter="SearchParking"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row
                          cols="12"
                          xs="12"
                          sm="12"
                          md="12"
                          justify="center"
                        >
                          <v-col cols="12" md="4" align="center">
                            <v-btn
                              height="40"
                              width="150"
                              outlined
                              color="indigo"
                              @click="SearchParking()"
                            >
                              Search
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row
                          cols="12"
                          md="12"
                          justify="center"
                          :style="
                            $vuetify.breakpoint.smAndDown
                              ? { marginTop: '20%' }
                              : { marginTop: '0%' }
                          "
                        >
                          <div v-if="Status">
                            <StreamBarcodeReader
                              ref="scanner"
                              style="height: auto"
                              @decode="onDecode"
                            ></StreamBarcodeReader>
                          </div>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </div>
    </v-card>

    <v-dialog v-model="UpdateLicensePlateDialog" persistent width="400">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseUpdateLicensePlateDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <p style="font-size: 20px; color: black">กรุณาระบุทะเบียนรถ</p>
              <v-text-field
                placeholder="LicensePlate"
                label="License Plate"
                type="text"
                outlined
                v-model="LicensePlate"
                :maxlength="8"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <v-btn
                width="200"
                color="green"
                class="rounded-lg white--text"
                @click="updateLicensePlate()"
                x-large
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="UpdateLicensePlateDialogFromScan" persistent width="400">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseUpdateLicensePlateDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <p style="font-size: 20px; color: black">กรุณาระบุทะเบียนรถ</p>
              <v-text-field
                placeholder="LicensePlate"
                label="License Plate"
                type="text"
                outlined
                v-model="LicensePlate"
                :maxlength="8"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <v-btn
                width="200"
                color="green"
                class="rounded-lg white--text"
                @click="updateLicensePlateFromScan()"
                x-large
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="LoadingDialog" persistent width="0.01">
      <v-card>
        <v-card-text>
          <v-row>
            <LoadingComponent class="centered"></LoadingComponent>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <AlertComponent
      :flagAlert="AlertDialog"
      :typeAlert="TypeAlert"
      :mesAlert="MessageAlert"
      @flagClose="ClearDataAlert()"
    />
  </div>
</template>
<script>
import axios from "axios";
import { StreamBarcodeReader } from "vue-barcode-reader";
import enurl from "@/api/environment";
import AlertComponent from "@/components/Alert";
import LoadingComponent from "@/components/Loading";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  name: "Main",
  components: {
    AlertComponent,
    StreamBarcodeReader,
    LoadingComponent,
  },
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      AlertDialog: false,
      TypeAlert: null,
      MessageAlert: "",
      model: "tab-1",
      SearchInput: "",
      QRCodeData: "",
      id: null,
      destroy: false,
      Status: false,
      response: "",
      ColorTab: "#126496",
      ColorText: "#126496",
      ColorText2: "",
      UpdateLicensePlateDialog: false,
      UpdateLicensePlateDialogFromScan: false,
      LicensePlate: "",
    };
  },
  computed: {},
  watch: {},

  methods: {
    onDecode(temp) {
      let self = this;
      self.QRCodeData = temp;
      if (self.id) clearTimeout(self.id);
      self.id = setTimeout(() => {
        if (self.QRCodeData === temp) {
          // self.QRCodeData = "";
        }
      }, 5000);
      self.SearchParkingByQRCode(self.QRCodeData);
    },

    ChangeTab(value) {
      let self = this;
      if (value == "Search") {
        self.$refs.scanner.codeReader.stream
          .getTracks()
          .forEach(function (track) {
            track.stop();
          });
        self.ColorTab = "#126496";
        self.ColorText = "#126496";
        self.Status = false;
      } else {
        self.ColorTab = "orange";
        self.Status = true;
      }
    },

    CloseTab() {
      window.close();
    },

    ClearDataAlert() {
      let self = this;
      self.AlertDialog = false;
      self.TypeAlert = "";
      self.MessageAlert = "";
    },

    SearchParkingByQRCode(data) {
      let self = this;
      self.LoadingDialog = true;
      self.QRCodeData = data;
      let temp = {
        LogCarparkID: data,
        LostCard: false,
      };
      axios
        .post(`${self.url}Redemption/GetParkingDetailByQRCode`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.response = response.data.data;
            self.LoadingDialog = false;
            if (response.data.data.length > 0) {
              var LicensePlate = response.data.data[0].plateNo.replace(" ", "");
              if (
                LicensePlate.includes("000") ||
                LicensePlate.includes("unknown")
              ) {
                self.UpdateLicensePlateDialogFromScan = true;
              } else {
                self.$router.push({
                  name: "ParkingInformation",
                  params: { response: self.response, LogID: self.LogCarparkID },
                });
              }
            }
          } else {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: response.data.message,
            });
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error,
          });
          self.LoadingDialog = false;
        });
    },

    CloseUpdateLicensePlateDialog() {
      let self = this;
      self.LicensePlate = "";
      self.UpdateLicensePlateDialog = false;
      self.UpdateLicensePlateDialogFromScan = false;
    },

    updateLicensePlate() {
      let self = this;
      if (self.LicensePlate == "" || self.LicensePlate == null) {
        Swal.fire({
          icon: "warning",
          title: "warning",
          width: 900,
          text: "กรุณากรอกเลขทะเบียน !",
        });
        return;
      }
      if (
        self.LicensePlate.includes("000") ||
        self.LicensePlate.includes("unknown")
      ) {
        Swal.fire({
          icon: "warning",
          title: "warning",
          width: 900,
          text: "กรุณากรอกเลขทะเบียน !",
        });
        return;
      } else {
        var LastArrayData = "";
        if (self.QRCodeData != "") {
          var dataArray = self.QRCodeData.split("/");
          LastArrayData = dataArray[dataArray.length - 1];
        }

        let temp = {
          license: self.LicensePlate,
          logCarpark: self.SearchInput == "" ? LastArrayData : self.SearchInput,
        };

        axios
          .post(`${self.url}Redemption/updateLicensePlate`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              var logCarpark =
                self.SearchInput == "" ? LastArrayData : self.SearchInput;
              self.CloseUpdateLicensePlateDialog();
              self.SearchParkingByQRCode(logCarpark);
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: error,
            });
          });
      }
    },

    updateLicensePlateFromScan() {
      let self = this;
      if (self.LicensePlate == "" || self.LicensePlate == null) {
        Swal.fire({
          icon: "warning",
          title: "warning",
          width: 900,
          text: "กรุณากรอกเลขทะเบียน !",
        });
        return;
      }
      if (
        self.LicensePlate.includes("000") ||
        self.LicensePlate.includes("unknown")
      ) {
        Swal.fire({
          icon: "warning",
          title: "warning",
          width: 900,
          text: "กรุณากรอกเลขทะเบียน !",
        });
        return;
      } else {
        var dataArray = self.QRCodeData.split("/");
        var LastArrayData = dataArray[dataArray.length - 1];

        let temp = {
          license: self.LicensePlate,
          logCarpark: LastArrayData,
        };
        axios
          .post(`${self.url}Redemption/updateLicensePlate`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.CloseUpdateLicensePlateDialog();
              self.SearchParkingByQRCode(LastArrayData);
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: error,
            });
          });
      }
    },

    SearchParking() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: self.SearchInput,
        LostCard: false,
      };
      axios
        .post(`${self.url}Redemption/GetParkingDetail`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.response = response.data.data;
            if (response.data.data.length > 0) {
              var LicensePlate = response.data.data[0].plateNo.replace(" ", "");
              if (
                LicensePlate.includes("000") ||
                LicensePlate.includes("unknown")
              ) {
                self.UpdateLicensePlateDialog = true;
              } else {
                self.$router.push({
                  name: "ParkingInformation",
                  params: { response: self.response, LogID: self.LogCarparkID },
                });
              }
            }
            self.LoadingDialog = false;
          } else {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: response.data.message,
            });
          }
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
  },
};
</script>
<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
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
  font-family: "English";
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
.addUserTitle {
  font-size: 14px;
  font-weight: 300;
}
.input-border {
  border: 1px solid black;
  height: 35px;
  padding: 4px;
}
.validation-class {
  color: red;
  font-size: 12px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
