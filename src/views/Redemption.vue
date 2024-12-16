<template>
  <div>
    <v-card
      style="display: contents"
    >
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
            <v-row cols="12" xs="12" sm="12" md="12" justify="center" :style="
                $vuetify.breakpoint.smAndDown
                  ? { marginTop: '10%' }
                  : $vuetify.breakpoint.mdAndDown
                  ? { marginTop: '10%' }
                  : { marginTop: '3%' }
              ">
              <v-col cols="12" xs="12" sm="12" md="12" align="center">
                <v-img
                  src="@/assets/approved.png"
                  width="150"
                ></v-img>
              </v-col>
            </v-row>
            <v-row cols="12" xs="12" sm="12" md="12" justify="center" style="margin-top: 2%;">
              <v-col cols="12" md="4" align="center">
                <p style="text-align: center; font-size: 20px; color: green;font-weight: bold;">
                  Redemption Success
                </p>
              </v-col>
            </v-row>         
            <v-row cols="12" xs="12" sm="12" md="12" justify="center">
              <v-col cols="12" md="7" align="center" class="white rounded-sm">
                <table style="border-collapse: collapse; width: 100%; font-size: 16px;">
                  <tr>
                    <td style="color: #14223c">Ticket No.</td>
                    <td style="text-align: right; color: #14223c">
                      {{ TicketNo }}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #14223c">DateTime</td>
                    <td style="text-align: right; color: #14223c">
                      {{ DateTime }}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #14223c">Time In</td>
                    <td style="text-align: right; color: #14223c">
                      {{ TimeIn }}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #14223c">Duration</td>
                    <td style="text-align: right">{{ Duration }}</td>
                  </tr>
                  <tr>
                    <td style="color: #14223c">
                      License
                    </td>
                    <td style="text-align: right; color: #14223c">
                      {{ CarLicense }}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #14223c">
                      Type
                    </td>
                    <td style="text-align: right; color: #14223c">
                      {{ VehicleName }}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #14223c;">
                      RateDetail
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style="color: #14223c"></td>
                    <td style="text-align: right; color: #de7302">
                      <div>{{ ($t("message.RateDetailLang") == "ENG" ? RateDetailENG.split('\r\n')[0] : RateDetail.split('\r\n')[0]) }}</div>
                    </td>
                  </tr>
                  <br/>
                  <tr>
                    <td style="color: #14223c">Total</td>
                    <td style="text-align: right; color: green;font-size: 16px;">
                      {{ numberWithCommas(Total) }}
                      <span style="color: black;font-size: 16px;">
                        Baht</span
                      >
                    </td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row cols="12" xs="12" sm="12" md="12" justify="center" style="margin-top: 2%;">
              <v-col cols="12" md="4" align="center">
                <v-btn
                  height="40"
                  width="150"
                  outlined
                  color="indigo"
                  @click="BackToMain()"
                >
                  Back to main
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4"></v-col>
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
export default {
  name: "Redemption",

  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      AlertDialog: false,
      TypeAlert: null,
      MessageAlert: "",
      Rate: "",
      ResponseRedeem: [],

      TerminalID: null,
      DatetimeIn: "",
      MemberType: null,
      CarType: null,
      UserID: null,

      TicketNo: "",
      DateTime: "",
      TimeIn: "",
      Duration: "",
      CarLicense: "",
      VehicleName: "",
      RateCodeString: "",
      RateDetail: "",
      RateDetailENG: "",
      Total: "",

    };
  },

  mounted() {
    let self = this;
    self.Rate = self.$route.params.ratecode;
    self.ResponseRedeem = self.$route.params.ResponseRedeem;
    self.BindingDataResponse();
  },

  methods: {
    BackToMain() {
      let self = this;
      self.ClearData();
      self.$router.push("/Main");
    },

    BindingDataResponse() {
      let self = this;
      if (self.ResponseRedeem != "" && self.ResponseRedeem != undefined) {
        if (
          self.ResponseRedeem.length > 0 &&
          self.ResponseRedeem[0].status != "Fail"
        ) {
          self.TerminalID = self.ResponseRedeem[0].terminalInId;
          self.DatetimeIn = self.ResponseRedeem[0].entryDateTime;
          self.MemberType = self.ResponseRedeem[0].memberTypeId;
          self.CarType = self.ResponseRedeem[0].vehicleTypeId;
          self.TicketNo = self.ResponseRedeem[0].ticketNo;
          self.DateTime = new Date(
            self.ResponseRedeem[0].entryDateTime
          ).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          self.TimeIn =
            self.ResponseRedeem[0].entryDateTime.split(" ").length > 0
              ? self.ResponseRedeem[0].entryDateTime.split(" ")[1]
              : "";
          self.Duration =
            self.ResponseRedeem[0].parkHH +
            " hrs " +
            self.ResponseRedeem[0].parkMM +
            " mins";
          self.CarLicense = self.ResponseRedeem[0].plateNo;
          self.VehicleName = self.ResponseRedeem[0].vehicleTypeName;
          self.RateCodeString = self.ResponseRedeem[0].rateCode;
          self.RateDetail = self.ResponseRedeem[0].rateDetailTH;
          self.RateDetailENG = self.ResponseRedeem[0].rateDetailEN;
          self.Total = self.ResponseRedeem[0].total;
          this.GetDataRateCode(
            self.ResponseRedeem[0].memberTypeId,
            self.ResponseRedeem[0].vehicleTypeId
          );
        }
      }
    },

    GetDataRateCode(membertype, vehicletype) {
      let self = this;
      let temp = {
        TenantID: self.TenantID,
        MemberType: membertype,
        VehicleType: vehicletype,
        DepartmentID: parseInt(self.DepartmentID),
      };
      axios
        .post(`${self.url}Redemption/GetDataRateCode`, temp)
        .then(function(response) {
          if (response.data.status == 0) {
            self.RateList = response.data.data;
          }
        })
        .catch(function(error) {
          Swal.fire({
              icon: "error",
              title: "Error...",
              width: 900,
              text: error,
            });
        });
    },

    ClearData(){
      let self = this;
      self.TerminalID = null;
      self.DatetimeIn = "";
      self.MemberType = null;
      self.CarType = null;
      self.UserID = null;
      self.TicketNo = "";
      self.DateTime = "";
      self.TimeIn = "";
      self.Duration = "";
      self.CarLicense = "";
      self.VehicleName = "";
      self.RateCodeString = "";
      self.RateDetail = "";
      self.RateDetailENG = "";
      self.Total = "";
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
