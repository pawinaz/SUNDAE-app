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
              <v-icon @click="BackToMain()" size="35" >mdi-arrow-left-bold-circle-outline</v-icon>&nbsp;
              <p style="text-align: center; font-size: 22px; color: #14223c; padding-top: 1rem;">
                Parking Information
              </p>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="7" align="center">
                <v-tabs>
                  <v-tab @click="ChangeTab('Information')">Information</v-tab>
                  <v-tab @click="ChangeTab('History')"
                    >Redemption History</v-tab
                  >
                  <v-tabs-slider :color="ColorTab"></v-tabs-slider>
                  <v-tab-item>
                    <br/>
                    <v-card flat>
                      <v-card-text>
                        <table
                          style="
                            border-collapse: collapse;
                            width: 100%;
                            font-size: 16px;
                            border: 1px solid grey;
                          "
                        >
                        <br />
                          <tr>
                            <td style="color: #14223c; padding-left: 1rem;">Ticket No.</td>
                            <td style="text-align: right; color: #14223c; padding-right: 1rem;">
                              {{ TicketNo }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">Date</td>
                            <td style="text-align: right; color: #14223c;padding-right: 1rem;">
                              {{ DateTime }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">Time In</td>
                            <td style="text-align: right; color: #14223c;padding-right: 1rem;">
                              {{ TimeIn }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">Duration</td>
                            <td style="text-align: right; color: #14223c;padding-right: 1rem;">
                              {{ numberWithCommas(Duration) }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">License</td>
                            <td style="text-align: right; color: #14223c;padding-right: 1rem;">
                              {{ CarLicense }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">Type</td>
                            <td style="text-align: right; color: #14223c;padding-right: 1rem;">
                              {{ VehicleName }}
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">RateDetail</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td style="color: #14223c"></td>
                            <td style="text-align: right; color: #de7302;padding-right: 1rem;">
                              <div>
                                {{
                                  $t("message.RateDetailLang") == "ENG"
                                    ? RateDetailENG.split("\r\n")[0]
                                    : RateDetail.split("\r\n")[0]
                                }}
                              </div>
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td style="color: #14223c;padding-left: 1rem;">Total</td>
                            <td
                              style="
                                text-align: right;
                                color: green;
                                font-size: 18px;
                                padding-right: 1rem;
                              "
                            >
                              {{ numberWithCommas(Total) }}
                              <span style="color: black; font-size: 16px">
                                Baht</span
                              >
                            </td>
                          </tr>
                          <br />
                        </table>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <br/>
                    <v-card flat>
                      <v-card-text>
                        <v-data-table
                          :headers="headersHistory"
                          :items="HistoryList"
                          :items-per-page="5"
                          :mobile-breakpoint="0"
                          single-line
                          hide-details
                          :disable-sort="true"
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.rateCode }}</td>
                              <td>{{ item.detail }}</td>
                              <td>{{ ChangeFormatDate(item.stampTime) }}</td>
                              <td>{{ item.stampBy }}</td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
            <v-row cols="12" xs="12" sm="12" md="12" justify="center">
              <v-col cols="12" md="4">
                <div
                  v-if="RateList.length > 0"
                  class="mt-5"
                  @click="ClearRate()"
                >
                  <p style="font-size: 16px; font-weight: bold">Rate Detail</p>
                  <v-radio-group
                    v-model="RateData"
                    style="margin-left: auto; margin-right: auto"
                  >
                    <v-radio
                      style="
                        border-style: solid;
                        border-color: white;
                        background-color: #e3ecf7;
                        padding-left: 1rem;
                        padding-right: 1rem;
                        height: 60px;
                      "
                      v-for="(item, index) in RateList"
                      :key="index"
                      :label="item.rateDetail"
                      :value="item.rateCode"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
            <v-row cols="12" xs="12" sm="12" md="12" justify="center">
              <v-col cols="12" md="6">
                <p style="font-size: 16px; font-weight: bold">Remark</p>
                <v-textarea v-model="Remark" solo></v-textarea>
              </v-col>
            </v-row>
            <v-row cols="12" xs="12" sm="12" md="12" justify="center">
              <v-col cols="12" md="4" align="center">
                <v-btn
                  v-if="RedeemButtonStatus == false"
                  height="40"
                  width="120"
                  outlined
                  color="indigo"
                  @click="RedeemData()"
                >
                  E-Stamp
                </v-btn>
                <v-btn
                  v-else
                  disabled
                  height="40"
                  width="130"
                  outlined
                  color="indigo"
                  @click="RedeemData()"
                >
                  E-Stamp
                </v-btn>
                <v-btn
                  height="40"
                  width="120"
                  outlined
                  color="red"
                  @click="CancelRedeem()"
                >
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12"></v-col>
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

export default {
  name: "ParkingInformation",
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      AlertDialog: false,
      TypeAlert: null,
      MessageAlert: "",
      id: null,
      response: "",
      RedemptionType: null,
      TenantID: null,
      LogID: null,
      TerminalID: null,
      DatetimeIn: "",
      MemberType: null,
      CarType: null,
      UserID: null,

      TicketNo: "",
      DateTime: "",
      TimeIn: "",
      Duration: "",
      exempt: "",
      summaryDuration: "",
      CarLicense: "",
      VehicleName: "",
      RateCodeString: "",
      RateDetail: "",
      RateDetailENG: "",
      Total: "",
      SpendingValue: "",
      RateList: [],
      RateData: null,
      OldRateData: null,
      Remark: "",
      ColorTab: "#126496",
      ColorText: "#126496",
      Status: false,
      tab: null,
      HistoryList: [],

      QRCodeData: "",
      idqr: null,
      POSValue: "",
      TempPOSValue: "",
      ScannerDialog: false,
      ScannerList: [],
      TempScannerList: [],
      TotalAmountPOS: 0,
      UsagePOSValue: 0,

      TempSNScanDetail: "",
      TempAmountScanDetail: "",

      StatusReader: false,
      AddPOSButtonStatus: false,
      RedeemButtonStatus: false,

      CouponValue: "",
      TempCPNo: "",
      TempCPAmount: "",
      TempCouponValue: "",
      TotalCouponAmount: null,
      UsageCouponValue: 0,
      ResponseQRTigerText: "",
      ResponseData: [],
    };
  },
  computed: {
    headersHistory() {
      return [
        {
          text: "RateCode",
          align: "left",
        },
        {
          text: "Detail",
          align: "left",
        },
        {
          text: "StampTime",
          align: "left",
        },
        {
          text: "StampBy",
          align: "left",
        },
      ];
    },
  },

  async mounted() {
    let self = this;
    self.response = self.$route.params.response;
    if (self.response.length > 0) {
      self.LogID = self.$route.params.response[0].logId;
      self.TenantID = parseInt(self.$route.params.response[0].tenantId);
    }
    self.BindingDataResponse();
    await self.GetDataRedemptionHistoryByLogId();
  },

  methods: {
    ClearRate() {
      let that = this;
      if (that.OldRateData == that.RateData) {
        that.RateData = null;
      }
      that.OldRateData = that.RateData;
    },

    ChangeTab(value) {
      let self = this;
      if (value == "Information") {
        self.ColorTab = "#126496";
        self.ColorText = "#126496";
        self.Status = false;
      } else {
        self.ColorTab = "#126496";
        self.Status = true;
      }
    },

    GetDataRedemptionHistoryByLogId() {
      let self = this;
      let temp = {
        LogCarparkID: self.LogID,
      };
      axios
        .post(`${self.url}Redemption/GetDataRedemptionHistoryByLogId`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.HistoryList = response.data.data;
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error,
          });
        });
    },

    BackToMain() {
      let self = this;
      self.$router.push({ name: "Main" });
    },

    GetDataRateCode(membertype, vehicletype) {
      let self = this;
      let temp = {
        MemberType: membertype,
        VehicleType: vehicletype,
      };
      axios
        .post(`${self.url}Redemption/GetDataRateCode`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.RateList = response.data.data;
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error,
          });
          self.BackToMain();
        });
    },

    CancelRedeem() {
      let self = this;
      self.$router.push({ name: "Main" });
    },

    BindingDataResponse() {
      let self = this;
      if (self.response != "" && self.response != undefined) {
        if (self.response.length > 0 && self.response[0].status != "Fail") {
          self.ResponseData = self.response[0];
          self.TerminalID = self.response[0].terminalInId;
          self.DatetimeIn = self.response[0].entryDateTime;
          self.MemberType = self.response[0].memberTypeId;
          self.CarType = self.response[0].vehicleTypeId;
          self.TicketNo = self.response[0].ticketNo;
          self.DateTime = new Date(
            self.response[0].entryDateTime
          ).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          self.TimeIn =
            self.response[0].entryDateTime.split(" ").length > 0
              ? self.response[0].entryDateTime.split(" ")[1]
              : "";
          self.Duration =
            self.response[0].parkHH +
            " hrs " +
            self.response[0].parkMM +
            " mins";
          self.exempt =
            self.response[0].redeemHourDisplay +
            " hrs " +
            self.response[0].redeemMinuteDisplay +
            " mins";
          self.summaryDuration =
            self.response[0].parkHHDisplay +
            " hrs " +
            self.response[0].parkMMDisplay +
            " mins";
          self.CarLicense = self.response[0].plateNo;
          self.VehicleName = self.response[0].vehicleTypeName;
          self.RateCodeString = self.response[0].rateCode;
          self.RateDetail = self.response[0].rateDetailTH;
          self.RateDetailENG = self.response[0].rateDetailEN;
          self.Total = self.response[0].total;
          this.GetDataRateCode(
            self.response[0].memberTypeId,
            self.response[0].vehicleTypeId
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: self.response[0].message,
          });
        }
      } else {
        self.BackToMain();
      }
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    RedeemData() {
      let self = this;
      if (
        self.LogID == "" ||
        self.TerminalID == null ||
        self.DatetimeIn == "" ||
        self.TicketNo == "" ||
        self.CarLicense == "" ||
        self.MemberType == null ||
        self.CarType == null ||
        self.TenantID == null ||
        self.RateData == null
      ) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          width: 900,
          text: "กรุณากรอกข้อมูลให้ครบถ้วน!",
        });
      } else {
        self.RedeemButtonStatus = true;
        self.LoadingDialog = true;
        let temp = {
          LogCarparkID: self.LogID,
          TerminalID: self.TerminalID,
          DatetimeIn: self.DatetimeIn,
          RunningNumber: self.TicketNo,
          PlateNumber: self.CarLicense,
          MemberType: self.MemberType,
          CarType: self.CarType,
          TenantID: self.TenantID,
          RateCode: self.RateData,
          Remark: self.Remark,
        };
        axios
          .post(`${self.url}Redemption/RedeemParking`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.LoadingDialog = false;
              self.RedeemButtonStatus = false;
              self.$router.push({
                name: "Redemption",
                params: {
                  ResponseRedeem: response.data.data,
                  ratecode:
                    self.RateData == null
                      ? response.data.data
                      : self.RateList.filter(
                          (x) => x.rateCode == self.RateData
                        )[0].rateDetail,
                },
              });
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.RedeemButtonStatus = false;
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: error,
            });
          });
      }
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
<style scoped>
.centered-input-header >>> input {
  text-align: center;
  color: black;
}
.TitleCSS {
  font-size: 18px;
  font-weight: 300;
}
@font-face {
  font-family: "English";
  src: local("English"), url(../assets/Font/Roboto-Regular.ttf);
}
* >>> .v-data-table-header {
  background-color: #333333;
  color: #ffffff !important;
}
* >>> .v-data-table-header th {
  font-size: 14px !important;
  color: #ffffff !important;
}

* >>> .v-data-table-header-mobile {
  display: none;
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
* >>> .v-label {
  color: green;
  justify-content: center;
}
</style>
