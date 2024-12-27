<template>
  <div>
    <v-card>
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
            <v-card
              elevation="10"
              style="padding: 2%; margin-top: 2%; margin-bottom: 2%"
            >
              <div>
                <v-row
                  cols="12"
                  xs="12"
                  sm="12"
                  md="12"
                  justify="center"
                  :style="
                    $vuetify.breakpoint.smAndDown
                      ? { marginTop: '5%' }
                      : $vuetify.breakpoint.mdAndDown
                      ? { marginTop: '5%' }
                      : { marginTop: '3%' }
                  "
                >
                  <!-- <v-btn @click="BackToManagePreRegister()" color="primary" style="margin-right: 10px">
                      <v-icon left>mdi-arrow-left-bold-circle-outline</v-icon>
                      ย้อนกลับ
                  </v-btn> -->
                  <p
                    style="
                      text-align: center;
                      font-size: 22px;
                      color: primary;
                      padding-top: 1rem;
                    "
                  >
                    Create Pre Register
                  </p>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card flat>
                      <v-card-text>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="6">
                            <v-text-field
                              placeholder="VisitorName"
                              label="VisitorName"
                              v-model="VisitorName"
                              type="text"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="3">
                            <v-text-field
                              placeholder="PhoneNumber"
                              label="PhoneNumber"
                              type="text"
                              v-model="PhoneNumber"
                              outlined
                              dense
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              placeholder="Email"
                              label="Email"
                              type="text"
                              v-model="Email"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="3">
                            <v-menu
                              v-model="menuStartDate"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="StartDate"
                                  label="StartDate"
                                  append-icon="mdi-calendar"
                                  outlined
                                  dense
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  clearable
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="StartDate"
                                @change="menuStartDate = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-menu
                              ref="menuStartTime"
                              v-model="menuStartTime"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="StartTime"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="StartTime"
                                  label="StartTime"
                                  append-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  outlined
                                  dense
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="menuStartTime"
                                v-model="StartTime"
                                full-width
                                @click:minute="
                                  $refs.menuStartTime.save(StartTime)
                                "
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="3">
                            <v-menu
                              v-model="menuEndDate"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="EndDate"
                                  label="EndDate"
                                  append-icon="mdi-calendar"
                                  outlined
                                  dense
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  clearable
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="EndDate"
                                @change="menuEndDate = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-menu
                              ref="menuEndTime"
                              v-model="menuEndTime"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="EndTime"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="EndTime"
                                  label="EndTime"
                                  append-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  outlined
                                  dense
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="menuEndTime"
                                v-model="EndTime"
                                full-width
                                @click:minute="$refs.menuEndTime.save(EndTime)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row cols="12" md="12" justify="center">
                          <v-col cols="12" md="6">
                            <v-select
                              :items="FloorList"
                              item-text="floorName"
                              item-value="floorId"
                              label="Floor"
                              v-model="Floor"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row
                          cols="12"
                          xs="12"
                          sm="12"
                          md="12"
                          justify="center"
                        >
                          <v-col cols="12" md="1" align="center">
                            <v-btn
                              style="color: white"
                              height="40"
                              width="150"
                              color="green"
                              @click="inviteVisitor()"
                            >
                              Submit
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="1" align="center">
                            <v-btn
                              style="color: white"
                              height="40"
                              width="150"
                              color="red"
                              @click="BackToManagePreRegister()"
                            >
                              Back
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card>
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
  name: "PreRegister",
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      QRvalue: "",
      QRsize: 250,
      Username: this.$cookies.get("Username"),
      FloorList: [],
      StartDate: "",
      EndDate: "",
      menuStartDate: false,
      menuEndDate: false,
      StartTime: null,
      menuStartTime: false,
      EndTime: null,
      menuEndTime: false,
      VisitorName: "",
      PhoneNumber: "",
      Email: "",
      Floor: null,
    };
  },

  async mounted() {
    let self = this;
    self.getDataAuthorizeFloor();
  },

  methods: {
    getDataAuthorizeFloor() {
      let self = this;
      axios
        .get(`${self.url}User/AuthorizeFloor`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.FloorList = response.data.data;
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

    inviteVisitor() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        visitorName: self.VisitorName,
        visitorPhonenumber: self.PhoneNumber,
        email: self.Email,
        startDate: self.StartDate,
        endDate: self.EndDate,
        startTime: self.StartTime,
        endTime: self.EndTime,
        floor: self.Floor,
      };
      axios
        .post(`${self.url}PreRegister/Invite`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            });
            self.$router.push({ name: "ManagePreRegister" });
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

    BackToManagePreRegister() {
      let self = this;
      self.$router.push("/ManagePreRegister");
    },
  },
};
</script>
<style scoped></style>
