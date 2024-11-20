<template>
  <div class="invisible-scrollbar">
    <v-card style="display: contents">
      <div style="margin-left: 10px; margin-right: 10px">
        <v-card-text>
          <div>
            <v-card elevation="10" style="padding: 2%; margin-top: 2%; margin-bottom: 2%">
              <div class="pb-4" style="
                  font-size: 20px;
                  color: #444444;
                ">
                Pre Register Management
              </div> 
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="4" class="pt-5">
                  <v-text-field 
                    v-model="search"
                    label="Search" 
                    append-icon="mdi-database-search-outline"
                    @keyup.enter="getDataTransactionPreRegister" 
                    clearable 
                    outlined 
                    dense
                    placeholder="Search with Name, Phonenumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4" offset-md="4" class="pt-5" align="end">
                  <v-btn 
                    height="40" 
                    min-width="180" 
                    color="primary" 
                    class="white--text text-capitalize" 
                    @click="CreatePreRegister()"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    PRE REGISTER
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div>
            <v-card elevation="10" style="padding: 2%; margin-top: 2%; margin-bottom: 2%">
              <v-data-table :headers="$vuetify.breakpoint.smAndDown ? headersMobile : headers
                " :items="ListData" hide-default-footer style="color: #332f2fde" :items-per-page="itemsPerPage"
                :mobile-breakpoint="0" :page.sync="page" single-line hide-details>
                
                <template v-if="!$vuetify.breakpoint.smAndDown" v-slot:item="{ item, index }">
                  <tr>
                    <td class="header-table-css">{{ no_run + (index + 1) }}</td>
                    <td class="header-table-css">{{ item.visitorName }}</td>
                    <td class="header-table-css">{{ item.phoneNumber }}</td>
                    <td class="header-table-css">
                      {{ ChangeFormatDate(item.startDate) }}
                    </td>
                    <td class="header-table-css">
                      {{ ChangeFormatDate(item.endDate) }}
                    </td>
                    <td class="header-table-css">{{ item.towerID }}</td>
                    <td class="header-table-css">{{ item.floorID }}</td>
                    <td class="header-table-css">
                      {{ ChangeFormatDate(item.createTime) }}
                    </td>
                    <td class="text-center">
                      <v-btn :color="GetColor(item.active)" 
                            rounded
                            icon
                            class="text-capitalize" 
                            style="pointer-events: none"
                            depressed>
                        <span :style="{color: GetColorText(item.active)}">
                          {{ item.active == true ? 'active' : 'Inactive' }}
                        </span>
                      </v-btn>
                    </td>
                    <td style="text-align: center">
                      <template>
                        <v-btn :disabled="!item.active" class="mx-2" fab dark small icon color="#2196F3" @click="
                          ShowQRPreRegister(item.invite_uid)
                          ">
                          <v-icon dark>mdi-qrcode</v-icon>
                        </v-btn>
                      </template>
                      <template>
                        <v-btn class="mx-2" fab dark small icon color="orange" @click="
                          ViewDataPreRegisterDialog(item.invite_uid)
                          ">
                          <v-icon dark>mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <template>
                        <v-btn :disabled="!item.active" class="mx-2" fab dark small icon color="red"
                          @click="cancelPreRegisterByUid(item.invite_uid)">
                          <v-icon dark>mdi-cancel</v-icon>
                        </v-btn>
                      </template>
                    </td>
                  </tr>
                </template>
                <template v-else v-slot:item="{ item, index }">
                  <tr>
                    <td class="header-table-css">{{ no_run + (index + 1) }}</td>
                    <td class="header-table-css">{{ item.visitorName }}</td>
                    <!-- <td class="header-table-css">{{ item.phoneNumber }}</td> -->
                    <td class="text-center">
                      <v-btn :color="GetColor(item.active)" 
                            rounded
                            icon
                            class="text-capitalize" 
                            style="pointer-events: none"
                            depressed>
                        <span :style="{color:GetColorText(item.active)}"
                        > {{ item.active == true ? 'active' : 'Inactive' }}</span>
                      </v-btn>
                    </td>
                    <td style="text-align: center" >
                      <v-btn :disabled="!item.active" class="mx-2" fab dark small icon color="#2196F3"
                        @click="ShowQRPreRegister(item.invite_uid)">
                        <v-icon dark>mdi-qrcode</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab dark small icon color="orange"
                        @click="ViewDataPreRegisterDialog(item.invite_uid)">
                        <v-icon dark>mdi-eye</v-icon>
                      </v-btn>
                      <v-btn :disabled="!item.active" class="mx-2" fab dark small icon color="red"
                        @click="cancelPreRegisterByUid(item.invite_uid)">
                        <v-icon dark>mdi-cancel</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <v-row class="mt-5">
                <v-col cols="12" md="4"></v-col>
                <v-col cols="12" md="3">
                  <v-pagination v-model="page" :total-visible="20" :length="pageCount"
                    @input="ChangePage(page)"></v-pagination>
                </v-col>
                <v-col cols="12" md="3"></v-col>
                <v-col cols="12" md="2">
                  <v-autocomplete dense solo v-model="itemsPerPage" @input="ChangePerPage(itemsPerPage)" label="10/page"
                    :items="items"></v-autocomplete>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card-text>
      </div>
    </v-card>

    <v-dialog v-model="PreRegisterDataDialog" persistent width="800">
      <v-card>
        <v-card-title>
          <span style="font-size: 24px">Pre Register</span>
          <v-spacer></v-spacer>
          <v-btn style="margin-top: -10px; z-index: 1" icon @click="PreRegisterDataDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="VisitorName" v-model="VisitorName" outlined dense />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="Email" v-model="Email" outlined dense />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="PhoneNumber" v-model="PhoneNumber" outlined dense />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="TowerName" v-model="TowerName" outlined dense />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="FloorName" v-model="FloorName" outlined dense />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="StartDate" v-model="Start_Date" outlined dense />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="EndDate" v-model="End_Date" outlined dense />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="text" disabled label="CreateTime" v-model="CreateTime" outlined dense />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
import axios from "axios";
import enurl from "@/api/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "ManagePreRegister",
  components: {},
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      items: [10, 15, 20, 50, 100],
      pageCount: 0,
      page: 1,
      itemsPerPage: 10,
      search: "",
      no_run: 0,

      ListData: [],
      PreRegisterDataDialog: false,
      VisitorName: "",
      Email: "",
      PhoneNumber: "",
      TowerName: "",
      FloorName: "",
      Start_Date: "",
      End_Date: "",
      CreateTime: "",
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "No",
          sortable: false,
          align: "left",
        },
        {
          text: "VisitorName",
          align: "left",
          sortable: false,
        },
        {
          text: "PhoneNumber",
          align: "left",
          sortable: false,
        },
        {
          text: "StartDate",
          align: "left",
          sortable: false,
        },
        {
          text: "EndDate",
          align: "left",
          sortable: false,
        },
        {
          text: "Tower",
          align: "left",
          sortable: false,
        },
        {
          text: "Floor",
          align: "left",
          sortable: false,
        },
        {
          text: "CreateTime",
          align: "left",
          sortable: false,
        },
        {
          text: "Active",
          align: "center",
          sortable: false,
        },
        {
          text: "Action",
          align: "center",
          sortable: false,
        },
      ];
    },
    headersMobile() {
      return [
        {
          text: "No",
          sortable: false,
          align: "left",
        },
        {
          text: "VisitorName",
          align: "left",
          sortable: false,
        },
        // {
        //   text: "PhoneNumber",
        //   align: "left",
        //   sortable: false,
        // },
        {
          text: "Active",
          align: "center",
          sortable: false,
        },
        {
          text: "Action",
          align: "center",
          sortable: false,
        },
      ];
    },
  },

  async mounted() {
    let self = this;
    self.getDataTransactionPreRegister();
  },

  methods: {
    getDataTransactionPreRegister() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        page: self.page,
        perPage: self.itemsPerPage,
        search: self.search == null ? "" : self.search,
      };
      axios
        .post(`${self.url}PreRegister/getDataTransactionPreRegister`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
            // self.pageCount = Math.ceil(
            //   response.data.data.count / self.itemsPerPage
            // );
            self.no_run = (self.page - 1) * self.itemsPerPage;
            self.LoadingDialog = false;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
          });
        });
    },

    ChangePage(value) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        page: value,
        perPage: self.itemsPerPage,
        search: self.search == null ? "" : self.search,
      };
      axios
        .post(`${self.url}PreRegister/getDataTransactionPreRegister`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
            // self.pageCount = Math.ceil(
            //   response.data.data.count / self.itemsPerPage
            // );
            self.no_run = (self.page - 1) * self.itemsPerPage;
            self.LoadingDialog = false;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
    },

    ChangePerPage(value) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: self.search,
        page: 1,
        perPage: value,
      };
      axios
        .post(`${self.url}PreRegister/getDataTransactionPreRegister`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
            // self.pageCount = Math.ceil(
            //   response.data.data.count / self.itemsPerPage
            // );
            self.no_run = (self.page - 1) * self.itemsPerPage;
            self.LoadingDialog = false;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
    },

    ViewDataPreRegisterDialog(data) {
      let self = this;
      self.ViewDataPreRegister(data);
    },

    CreatePreRegister() {
      let self = this;
      self.$router.push("/PreRegister");
    },

    ViewDataPreRegister(data) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        invite_uid: data,
      };
      axios
        .post(`${self.url}PreRegister/getDataTransactionPreRegisterByUid`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.BindingDataPreRegister(response.data.data);
            self.LoadingDialog = false;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
    },

    BindingDataPreRegister(data) {
      let self = this;
      self.VisitorName = data.visitorName;
      self.Email = data.email;
      self.PhoneNumber = data.phoneNumber;
      self.TowerName = data.towerName;
      self.FloorName = data.floorName;
      self.Start_Date = self.ChangeFormatDate(data.startDate);
      self.End_Date = self.ChangeFormatDate(data.endDate);
      self.CreateTime = self.ChangeFormatDate(data.createTime);
      self.PreRegisterDataDialog = true;
    },

    cancelPreRegisterByUid(id) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        invite_uid: id,
      };
      Swal.fire({
        title: "Cancel",
        text: "คุณต้องการยกเลิกใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${self.url}PreRegister/cancelPreRegisterByUid`, temp)
            .then(function (response) {
              if (response.data.status == 0) {
                self.LoadingDialog = false;
                self.getDataTransactionPreRegister();
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              self.LoadingDialog = false;
            })
            .catch(function (error) {
              self.LoadingDialog = false;
              Swal.fire({
                icon: "error",
                title: "Error...",
                width: 900,
                text: error.response.data.message,
              });
            });
          self.LoadingDialog = false;
        }
        self.LoadingDialog = false;
      });
    },

    ShowQRPreRegister(data) {
      window.open('QRPreRegister/' + data, '_blank');
    },

    GetColor(value) {
      if (value == true) {
        return "rgb(92, 184, 92,0.3)";
      } else {
        return "rgb(232, 34, 34,0.3)";
      }
    },

    GetColorText(value) {
      if (value == true) {
        return "rgb(92, 184, 92)";
      } else {
        return "rgb(232, 34, 34)";
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
*>>>.v-data-table-header {
  background-color: rgb(248, 247, 247);
  color: #ffffff !important;
}

*>>>.v-data-table-header th {
  font-size: 14px !important;
  color: #252424 !important;
}

@keyframes load {
  0% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
  }

  40% {
    transform: scaleY(0.4);
  }

  100% {
    transform: scaleY(0.4);
  }
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.rect2 {
  animation-delay: -1.2s;
}

.rect3 {
  animation-delay: -1.1s;
}

.rect4 {
  animation-delay: -1s;
}

.rect5 {
  animation-delay: -0.9s;
}
</style>