<template>
  <div class="invisible-scrollbar">
    <v-card style="display: contents">
      <div style="margin-left: 10px; margin-right: 10px">
        <v-card-text>
          <div>
            <v-card
              elevation="10"
              style="padding: 2%; margin-top: 0%; margin-bottom: 2%"
            >
              <v-row align="center" justify="end" class="pa-4">
                <v-col>
                  <div
                    class="pb-4"
                    style="font-size: 24px; font-weight: bold; color: primary"
                  >
                    Manage Role
                  </div>
                </v-col>
                <v-col
                  cols="10"
                  sm="6"
                  md="4"
                  lg="4"
                  class="d-flex justify-end"
                >
                  <v-text-field
                    label="Search"
                    append-icon="mdi-magnify"
                    v-model="search"
                    v-on:keyup.enter="SearchDataRoleList(search)"
                    class="ma-2"
                    color="secondary"
                    clearable
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn
                    color="secondary"
                    class="ma-2 white--text"
                    @click="OpenAddRoleDetailDialog()"
                    >Create
                    <v-icon right>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-data-table
                :headers="
                  $vuetify.breakpoint.smAndDown ? headersMobile : headers
                "
                :items="ListData"
                hide-default-footer
                style="color: primary"
                :items-per-page="itemsPerPage"
                :mobile-breakpoint="0"
                :page.sync="page"
                single-line
                hide-details
              >
                <template
                  v-if="!$vuetify.breakpoint.smAndDown"
                  v-slot:item="{ item, index }"
                >
                  <tr>
                    <td class="header-table-css">{{ no_run + (index + 1) }}</td>
                    <td class="header-table-css">{{ item.roleName }}</td>
                    <td class="header-table-css">{{ item.remark }}</td>
                    <td class="header-table-css">
                      {{ ChangeFormatDate(item.createTime) }}
                    </td>
                    <td class="header-table-css">
                      {{ ChangeFormatDate(item.updateTime) }}
                    </td>
                    <td style="text-align: center">
                      <v-btn
                        :color="GetColor(item.active)"
                        rounded
                        icon
                        class="text-capitalize"
                        style="pointer-events: none"
                        depressed
                      >
                        <span :style="{ color: GetColorText(item.active) }">
                          {{ item.active == true ? "active" : "Inactive" }}
                        </span>
                      </v-btn>
                    </td>
                    <td
                      style="
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        icon
                        color="orange"
                        @click="OpenRoleDetailDialog(item.roleID)"
                      >
                        <v-icon dark> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <template>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          icon
                          color="red"
                          @click="InActiveRole(item.roleID)"
                        >
                          <v-icon dark>mdi-trash-can-outline </v-icon>
                        </v-btn>
                      </template>
                    </td>
                  </tr>
                </template>
                <template v-else v-slot:item="{ item, index }">
                  <tr>
                    <td class="header-table-css">{{ no_run + (index + 1) }}</td>
                    <td class="header-table-css">{{ item.roleName }}</td>
                    <td style="text-align: center">
                      <v-btn
                        :color="GetColor(item.active)"
                        rounded
                        icon
                        class="text-capitalize"
                        style="pointer-events: none"
                        depressed
                      >
                        <span :style="{ color: GetColorText(item.active) }">
                          {{ item.active == true ? "active" : "Inactive" }}
                        </span>
                      </v-btn>
                    </td>
                    <td
                      style="
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        icon
                        color="orange"
                        @click="OpenRoleDetailDialog(item.roleID)"
                      >
                        <v-icon dark> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <template>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          icon
                          color="red"
                          @click="InActiveRole(item.roleID)"
                        >
                          <v-icon dark>mdi-trash-can-outline </v-icon>
                        </v-btn>
                      </template>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <br />
              <v-row class="mt-5">
                <v-col cols="12" md="4"></v-col>
                <v-col cols="12" md="3">
                  <v-pagination
                    v-model="page"
                    :total-visible="20"
                    :length="pageCount"
                    color="secondary"
                    @input="ChangePage(page)"
                  ></v-pagination>
                </v-col>
                <v-col cols="12" md="3"></v-col>
                <v-col cols="12" md="2">
                  <v-autocomplete
                    dense
                    solo
                    v-model="itemsPerPage"
                    @input="ChangePerPage(itemsPerPage)"
                    :items="items"
                    label="10/page"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card-text>
      </div>
    </v-card>

    <v-dialog v-model="RoleDetailDialog" persistent width="800">
      <v-card>
        <v-card-title>
          <span style="font-size: 24px">Manage Role</span>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-top: -10px; z-index: 1"
            icon
            @click="CloseRoleDetailDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-1">
            <v-col cols="12" md="2" v-if="EditStatus">
              <v-text-field
                type="text"
                label="RoleID"
                disabled
                v-model="RoleID"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                label="RoleName"
                v-model="RoleName"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                type="text"
                label="Remark"
                v-model="Remark"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <span style="font-size: 18px; color: black">Permission</span>
          <v-row>
            <v-col cols="12" md="3">
              <v-checkbox
                color="primary"
                label="Redemption"
                v-model="RedemptionStatus"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                color="primary"
                label="MyQR"
                v-model="MyQRStatus"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                color="primary"
                label="PreRegister"
                v-model="PreRegisterStatus"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                color="primary"
                label="CallLift"
                value="red"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-checkbox
                color="primary"
                label="Mange User"
                v-model="ManageUserStatus"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="6">
              <v-radio-group row v-model="Active">
                <v-radio label="Active" value="1"></v-radio>
                <v-radio label="InActive" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <hr class="ml-2 mr-2 mt-6" />
          <v-card-actions
            style="margin-right: 3%; margin-left: 3%"
            class="pb-6 mt-1"
          >
            <v-spacer></v-spacer>
            <v-btn
              v-if="EditStatus"
              color="success"
              class="mr-2 white--text text-capitalize"
              width="120"
              max-height="35"
              @click="updateRole()"
              >Update</v-btn
            >
            <v-btn
              v-else
              color="success"
              class="mr-2 white--text text-capitalize"
              width="120"
              max-height="35"
              @click="updateRole()"
              >Add</v-btn
            >
            <v-btn
              class="mr-2 text-capitalize"
              width="120"
              style="background-color: #b9c1c9"
              max-height="35"
              text
              @click="CloseRoleDetailDialog()"
              >Cancel</v-btn
            >
          </v-card-actions>
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
  name: "ManageRole",
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
      RoleDetailDialog: false,
      EditStatus: false,
      RoleID: 0,
      RoleName: "",
      Remark: "",
      RedemptionStatus: false,
      MyQRStatus: false,
      PreRegisterStatus: false,
      CallLiftStatus: false,
      ManageUserStatus: false,
      Active: null,
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
          text: "RoleName",
          align: "left",
          sortable: false,
        },
        {
          text: "Remark",
          align: "left",
          sortable: false,
        },
        {
          text: "CreateTime",
          align: "left",
          sortable: false,
        },
        {
          text: "UpdateTime",
          align: "left",
          sortable: false,
        },
        {
          text: "Status",
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
          text: "RoleName",
          align: "left",
          sortable: false,
        },
        {
          text: "Status",
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
    await self.GetRoleList();
  },

  methods: {
    GetRoleList() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: self.search,
        page: self.page,
        perPage: self.itemsPerPage,
      };
      axios
        .post(`${self.url}Management/getDatRoleList`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
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
            width: 500,
            text: error.response.data.message,
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
        .post(`${self.url}Management/getDatRoleList`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
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
            width: 500,
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
        .post(`${self.url}Management/getDatRoleList`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
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
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    SearchDataRoleList(value) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: value,
        page: 1,
        perPage: self.itemsPerPage,
      };
      axios
        .post(`${self.url}Management/getDatRoleList`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ListData = response.data.data.listData;
            self.pageCount = response.data.data.count;
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
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    CloseRoleDetailDialog() {
      let self = this;
      self.EditStatus = false;
      self.RoleID = 0;
      self.RoleName = "";
      self.Remark = "";
      self.RedemptionStatus = false;
      self.MyQRStatus = false;
      self.PreRegisterStatus = false;
      self.CallLiftStatus = false;
      self.ManageUserStatus = false;
      self.Active = null;
      self.RoleDetailDialog = false;
    },

    OpenRoleDetailDialog(id) {
      let self = this;
      if (id != 0) {
        self.LoadingDialog = true;
        let temp = {
          roleID: id,
        };
        axios
          .post(`${self.url}Management/getDatRoleByRoleID`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.BindingDataRole(response.data.data);
              self.LoadingDialog = false;
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.response.data.message,
            });
          });
      }
    },

    OpenAddRoleDetailDialog() {
      let self = this;
      self.EditStatus = false;
      self.RoleID = 0;
      self.RoleName = "";
      self.Remark = "";
      self.RedemptionStatus = false;
      self.MyQRStatus = false;
      self.PreRegisterStatus = false;
      self.CallLiftStatus = false;
      self.ManageUserStatus = false;
      self.Active = null;
      self.RoleDetailDialog = true;
    },

    BindingDataRole(data) {
      let self = this;
      self.EditStatus = true;
      self.RoleID = data.roleID;
      self.RoleName = data.roleName;
      self.Remark = data.remark;
      self.RedemptionStatus = data.permission.redemption;
      self.MyQRStatus = data.permission.qr;
      self.PreRegisterStatus = data.permission.preRegister;
      self.CallLiftStatus = data.permission.callLift;
      self.ManageUserStatus = data.permission.manageUser;
      self.Active =
        data.active == true ? "1" : data.active == false ? "2" : null;
      self.RoleDetailDialog = true;
    },

    updateRole() {
      let self = this;
      if (self.EditStatus == true) {
        let temp = {
          roleID: self.RoleID,
          roleName: self.RoleName,
          remark: self.Remark,
          redemptionStatus: self.RedemptionStatus,
          myQRStatus: self.MyQRStatus,
          preRegisterStatus: self.PreRegisterStatus,
          callLiftStatus: self.CallLiftStatus,
          manageUserStatus: self.ManageUserStatus,
          active: self.Active == "1" ? true : self.Active == "2" ? false : null,
        };
        axios
          .post(`${self.url}Management/updateRole`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              Swal.fire({
                icon: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1500,
              });
              self.CloseRoleDetailDialog();
              self.GetRoleList();
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.response.data.message,
            });
          });
      } else {
        let temp = {
          roleName: self.RoleName,
          remark: self.Remark,
          redemptionStatus: self.RedemptionStatus,
          myQRStatus: self.MyQRStatus,
          preRegisterStatus: self.PreRegisterStatus,
          callLiftStatus: self.CallLiftStatus,
          manageUserStatus: self.ManageUserStatus,
          active: self.Active == "1" ? true : self.Active == "2" ? false : null,
        };
        axios
          .post(`${self.url}Management/addRole`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              Swal.fire({
                icon: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1500,
              });
              self.page = 1;
              self.CloseRoleDetailDialog();
              self.GetRoleList();
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.response.data.message,
            });
          });
      }
    },

    InActiveRole(id) {
      let self = this;
      if (id != 0) {
        let temp = {
          roleID: id,
        };
        axios
          .post(`${self.url}Management/inActiveRoleByRoleID`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              Swal.fire({
                icon: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1500,
              });
              self.GetRoleList();
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.response.data.message,
            });
          });
      }
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
* >>> .v-data-table-header {
  background-color: #383E40;
  color: #ffffff !important;
}
* >>> .v-data-table-header th {
  font-size: 14px !important;
  color: #ffffff !important;
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
