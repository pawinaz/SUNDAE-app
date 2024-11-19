<template>
  <div class="invisible-scrollbar">
    <v-card style="display: contents">
      <div style="margin-left: 10px; margin-right: 10px">
        <div
          class="pt-8"
          style="
            font-size: 20px;
            margin-left: 1rem;
            margin-right: 1rem;
            color: #444444;
          "
        >
          User Management
        </div>
        <v-card-text>
          <div>
            <v-card
              elevation="10"
              style="padding: 2%; margin-top: 2%; margin-bottom: 2%"
            >
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="4" class="pt-5">
                  <v-text-field
                    label="Search"
                    append-icon="mdi-database-search-outline"
                    v-model="search"
                    v-on:keyup.enter="SearchDataUser(search)"
                    clearable
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <div>
            <v-card
              elevation="10"
              style="padding: 2%; margin-top: 2%; margin-bottom: 2%"
            >
              <v-data-table
                :headers="
                  $vuetify.breakpoint.smAndDown ? headersMobile : headers
                "
                :items="ListData"
                hide-default-footer
                style="color: #332f2fde"
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
                    <td class="header-table-css">{{ item.username }}</td>
                    <td class="header-table-css">
                      {{ item.firstname + " " + item.lastname }}
                    </td>
                    <td class="header-table-css">{{ item.email }}</td>
                    <td class="header-table-css">{{ item.roleName }}</td>
                    <td style="text-align: center">
                      <template v-if="item.qr">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <td style="text-align: center">
                      <template v-if="item.callLift">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <td style="text-align: center">
                      <template v-if="item.preRegister">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <td style="text-align: center">
                      <template v-if="item.redemption">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <td style="text-align: center">
                      <template v-if="item.manageUser">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <td style="text-align: center">
                      <template v-if="item.statusUse">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td>
                    <!-- <td style="text-align: center">
                      <template v-if="item.active">
                        <v-icon color="green">mdi-check-circle</v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="red">mdi-close-circle</v-icon>
                      </template>
                    </td> -->
                    <td
                      style="
                        padding-bottom: 5px;
                        display: flex;
                        flex-direction: column-reverse;
                        align-items: center;
                      "
                    >
                      <v-btn
                        :color="GetColor(item.active)"
                        rounded
                        class="text-capitalize"
                        depressed
                        style="width: 100px"
                      >
                        <span :style="{ color: GetColorText(item.active) }">{{
                          item.active == true ? "Active" : "InActive"
                        }}</span>
                      </v-btn>
                    </td>
                    <td style="text-align: center">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="orange"
                        @click="
                          OpenUserDetailDialog(item.userID, item.statusUse)
                        "
                      >
                        <v-icon dark> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <template v-if="!item.active">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="green"
                          @click="
                            OpenChangeActiveUserDialog(
                              item.userName,
                              item.userId,
                              item.active
                            )
                          "
                        >
                          <v-icon dark>mdi-restore </v-icon>
                        </v-btn>
                      </template>
                      <template v-else>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                          @click="
                            OpenChangeActiveUserDialog(
                              item.userName,
                              item.userId,
                              item.active
                            )
                          "
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
                    <td class="header-table-css">{{ item.username }}</td>
                    <td class="header-table-css">
                      {{ item.firstname + " " + item.lastname }}
                    </td>
                    <td class="header-table-css">{{ item.email }}</td>
                    <td class="header-table-css">{{ item.roleName }}</td>
                    <td style="text-align: center">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="#4169E1"
                        @click="
                          OpenUserDetailDialog(item.userID, item.statusUse)
                        "
                      >
                        <v-icon dark> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <template v-if="!item.active">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="green"
                          @click="
                            OpenChangeActiveUserDialog(
                              item.userName,
                              item.userId,
                              item.active
                            )
                          "
                        >
                          <v-icon dark>mdi-restore </v-icon>
                        </v-btn>
                      </template>
                      <template v-else>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                          @click="
                            OpenChangeActiveUserDialog(
                              item.userName,
                              item.userId,
                              item.active
                            )
                          "
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

    <v-dialog v-model="UserDetailDialog" persistent width="800">
      <v-card>
        <v-card-title>
          <span style="font-size: 24px">Manage User</span>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-top: -10px; z-index: 1"
            icon
            @click="UserDetailDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-3">
            <v-col cols="12" md="8">
              <v-autocomplete
                :items="MemberList"
                clearable
                outlined
                dense
                @change="getMasMemberByMemberID(SearchMemberID)"
                item-text="memberName"
                item-value="memberID"
                label="Search Member"
                v-model="SearchMemberID"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <hr class="ml-2 mr-2" />
          <v-row class="mt-5">
            <v-col cols="12" md="6">
              <v-text-field
                type="text"                
                v-model="Username"
                label="Username"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                dense
                placeholder="Password"
                :append-icon="ShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="ShowPassword ? 'text' : 'password'"
                @click:append="ShowPassword = !ShowPassword"
                id="password"
                v-model="Password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                type="text"
                label="Member ID"
                disabled
                dense
                outlined
                v-model="MemberID"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="text"
                label="Card Number"
                outlined
                dense
                disabled
                v-model="CardID"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="text"
                label="Tenant Name"
                outlined
                disabled
                dense
                v-model="Tenant"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                label="First Name"
                outlined
                dense
                v-model="FirstName"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                label="Last Name"
                outlined
                dense
                v-model="LastName"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                label="Email"
                v-model="Email"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                label="Telephone"
                v-model="Telephone"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                :items="RoleListData"
                item-text="roleName"
                item-value="roleId"
                label="Role"
                dense
                outlined
                v-model="RoleId"
              ></v-select>
            </v-col>
          </v-row>
          <hr class="ml-2 mr-2" v-if="RedemptionStatus" />
          <v-row class="mt-5" v-if="RedemptionStatus">
            <v-col cols="12" md="6">
              <v-select
                :items="DepartmentList"
                item-text="departmentName"
                item-value="departmentId"
                label="Redemption Department"
                dense
                outlined
                v-model="Department"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="RedemptionTypeList"
                item-text="redempType_Name"
                item-value="redempType_Id"
                label="Redemption Type"
                dense
                outlined
                v-model="RedemptionType"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12" md="6">
              <v-select
                :items="UserLevelList"
                item-text="userLevel_Name"
                item-value="userLevel_Id"
                label="User Level"
                dense
                outlined
                v-model="UserLevel"
                v-if="RoleId == 2 || RoleId == 1"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-radio-group row v-model="ActiveStatus">
                <v-radio label="Active User" value="1"></v-radio>
                <v-radio label="Inactive User" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="12" md="12">
              <h4 style="color: black">LINK STATUS</h4>
              <template v-if="StatusUse_User">
                <v-icon color="green">mdi-circle</v-icon>
              </template>
              <template v-else>
                <v-icon color="red">mdi-circle</v-icon>
              </template>
            </v-col>
          </v-row> -->
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3">
              <v-btn
                block
                x-large
                color="#5cb85c"
                style="color: white"
                @click="UpdateDataUser()"
                class="rounded-lg"
                >Update</v-btn
              >
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                block
                x-large
                color="#d9534f"
                style="color: white"
                class="rounded-lg"
                @click="UserDetailDialog = false"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="ChangeActiveUserDialog" persistent width="500">
      <v-card>
        <v-card-title>
          <template v-if="Active_Register">
            <h4>
              คุณต้องการ Cancel Username : {{ UserName_Register }} ใช่หรือไม่ ??
            </h4>
          </template>
          <template v-else>
            <h4>
              คุณต้องการ Active Username : {{ UserName_Register }} ใช่หรือไม่ ??
            </h4>
          </template>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn
                block
                color="#5cb85c"
                style="color: white"
                @click="ChangeActiveUsername()"
                class="rounded-lg"
                x-large
                >YES</v-btn
              >
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                block
                color="#d9534f"
                style="color: white"
                @click="CloseChangeActiveUserDialog()"
                class="rounded-lg"
                x-large
                >NO</v-btn
              >
            </v-col>
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
  name: "ManageUser",
  components: {},
  data() {
    return {
      url: enurl.apiUrl,

      LoadingDialog: false,
      UserDetailDialog: false,
      ChangeActiveUserDialog: false,

      items: [10, 15, 20, 50, 100],
      pageCount: 0, //จำนวนหน้าทั้งหมด
      page: 1, //อยู่หน้าที่เท่าไร
      itemsPerPage: 10, //จำนวนรายการต่อหน้า
      search: "",
      no_run: 0,

      UserName_Register: "",
      UserId_Register: 0,
      Active_Register: false,

      RoleName_User: "",
      StatusUse_User: false,

      ListData: [],
      RoleListData: [],
      RoleId: 0,
      UserID: null,
      MemberList: [],
      RedemptionTypeList: [],
      DepartmentList: [],
      UserLevelList: [],
      SearchMemberID: null,
      FirstName: "",
      LastName: "",
      Username: "",
      Password: "",
      MemberID: "",
      CardID: "",
      TenantID: "",
      Tenant: "",
      Email: "",
      Telephone: "",
      ShowPassword: false,
      RedemptionType: null,
      UserLevel: null,
      ActiveStatus: null,
      Department: null,
      RedemptionStatus: false,
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
          text: "Username",
          align: "left",
          sortable: false,
        },
        {
          text: "FullName",
          align: "left",
          sortable: false,
        },
        {
          text: "Email",
          align: "left",
          sortable: false,
        },
        // {
        //   text: "Telephone",
        //   align: "left",
        //   sortable: false,
        // },
        {
          text: "Role Name",
          align: "left",
          sortable: false,
        },
        {
          text: "MyQR",
          align: "center",
          sortable: false,
        },
        {
          text: "CallLift",
          align: "center",
          sortable: false,
        },
        {
          text: "PreRegister",
          align: "center",
          sortable: false,
        },
        {
          text: "Redemption",
          align: "center",
          sortable: false,
        },
        {
          text: "ManageUser",
          align: "center",
          sortable: false,
        },
        {
          text: "LinkProfile",
          align: "center",
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
          text: "Username",
          align: "left",
          sortable: false,
        },
        {
          text: "FullName",
          align: "left",
          sortable: false,
        },
        {
          text: "Email",
          align: "left",
          sortable: false,
        },
        {
          text: "Role Name",
          align: "left",
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
    await self.GetUserList();
    await self.getMasMember();
    await self.getRedemptionDepartment();
    await self.getDepartment();
    await self.getUserStampLevel();
  },

  methods: {
    TogglePassword() {
      let self = this;
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
        self.ShowPassword = false;
      } else {
        x.type = "password";
        self.ShowPassword = true;
      }
    },

    getMasMember() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}User/getMasMember`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.MemberList = response.data.data;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          self.ChangeActiveUserDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    getRedemptionDepartment() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Management/getRedemptionDepartment`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.RedemptionTypeList = response.data.data;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          self.ChangeActiveUserDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    getDepartment() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Management/getDepartment`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.DepartmentList = response.data.data;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          self.ChangeActiveUserDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    getUserStampLevel() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Management/getUserStampLevel`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.UserLevelList = response.data.data;
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          self.ChangeActiveUserDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    getMasMemberByMemberID(member) {
      let self = this;
      if(member != null){
      let temp = {
        MemberID: member,
      };
      axios
        .post(`${self.url}Management/getMasMemberByMemberID`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.UserID = response.data.data.userID;
            self.RoleId = response.data.data.roleID;
            self.SearchMemberID = response.data.data.member_Id;
            self.Username = response.data.data.username;
            self.Password = response.data.data.password;
            self.MemberID = response.data.data.member_Id;
            self.CardID = response.data.data.card_id;
            self.TenantID = response.data.data.tenantID;
            self.Tenant = response.data.data.tenant;
            self.FirstName = response.data.data.firstname;
            self.LastName = response.data.data.lastname;
            self.Email = response.data.data.email;
            self.Telephone = response.data.data.telephone;
            self.ActiveStatus =
              response.data.data.active == true
                ? "1"
                : response.data.data.active == false
                ? "2"
                : null;
            self.RedemptionType = response.data.data.redemptionType;
            self.UserLevel = response.data.data.userStampLevel;
            self.Department = response.data.data.departmentID;
            self.RedemptionStatus = response.data.data.redemption;
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
      }
      else{
        self.ClearDataUser();
      }
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
        .post(`${self.url}Management/GetUserList`, temp)
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
        .post(`${self.url}Management/GetUserList`, temp)
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

    GetUserList() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: self.search,
        page: self.page,
        perPage: self.itemsPerPage,
      };
      axios
        .post(`${self.url}Management/GetUserList`, temp)
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

    SearchDataUser(value) {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        search: value,
        page: 1,
        perPage: self.itemsPerPage,
      };
      axios
        .post(`${self.url}Management/GetUserList`, temp)
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
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    ChangeActiveUsername() {
      let self = this;
      let temp = {
        UserId: self.UserId_Register,
        Active: !self.Active_Register,
      };
      axios
        .post(`${self.url}Management/ChangeActiveUsername`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            Swal.fire({
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            });
            self.ChangeActiveUserDialog = false;
            self.GetUserList();
          }
        })
        .catch(function (error) {
          self.ChangeActiveUserDialog = false;
          // self.LoadingDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    GetMemberDetailByUserId() {
      let self = this;
      self.LoadingDialog = true;
      let temp = {
        UserId: self.UserId_Register,
      };
      axios
        .post(`${self.url}Management/GetMemberDetailByUserId`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            self.UserID = response.data.data.userID;
            self.RoleId = response.data.data.roleID;
            self.SearchMemberID = response.data.data.member_Id;
            self.Username = response.data.data.username;
            self.Password = response.data.data.password;
            self.MemberID = response.data.data.member_Id;
            self.CardID = response.data.data.card_id;
            self.TenantID = response.data.data.tenantID;
            self.Tenant = response.data.data.tenant;
            self.FirstName = response.data.data.firstname;
            self.LastName = response.data.data.lastname;
            self.Email = response.data.data.email;
            self.Telephone = response.data.data.telephone;
            self.ActiveStatus =
              response.data.data.active == true
                ? "1"
                : response.data.data.active == false
                ? "2"
                : null;
            self.RedemptionType = response.data.data.redemptionType;
            self.UserLevel = response.data.data.userStampLevel;
            self.Department = response.data.data.departmentID;
            self.RedemptionStatus = response.data.data.redemption;
          } else if (response.data.status == 1) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "warning",
              title: "warning",
              width: 500,
              text: response.data.message,
            });
          }
          self.LoadingDialog = false;
        })
        .catch(function (error) {
          self.LoadingDialog = false;
          self.ChangeActiveUserDialog = false;
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 500,
            text: error.response.data.message,
          });
        });
    },

    UpdateDataUser() {
      let self = this;
      let temp = {
        UserId: self.UserId_Register,
        MemberId: self.MemberID,
        roleId: self.RoleId,
        Username: self.Username,
        Password: self.Password,
        FirstName: self.FirstName,
        LastName: self.LastName,
        Telephone: self.Telephone,
        Email: self.Email,
        Tenant: self.TenantID,
        Department: self.Department == "" ? null : self.Department,
        RedemptionType: self.RedemptionType,
        UserStampLevel: self.UserLevel,
        active: self.ActiveStatus == "1" ? true : false,
      };
      if (temp.memberId === "") {
        Swal.fire({
          icon: "error",
          title: "Error...",
          width: 500,
          text: "กรุณาใส่กรอกข้อมูลให้ครบถ้วน",
        });
      } else {
        self.LoadingDialog = true;
        axios
          .post(`${self.url}Management/UpdateDataUser`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.LoadingDialog = false;
              Swal.fire({
                icon: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1500,
              });
              self.UserDetailDialog = false;
              self.GetUserList();
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.ChangeActiveUserDialog = false;
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

    GetRoleUser() {
      let self = this;
      axios
        .get(`${self.url}Management/GetRoleName`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.RoleListData = response.data.data;
          }
        })
        .catch(function (error) {
          Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.response.data.message,
            });
          self.ChangeActiveUserDialog = false;
        });
    },

    OpenUserDetailDialog(userid, statusUse) {
      let self = this;
      self.ClearDataUser();
      self.UserDetailDialog = true;
      self.UserId_Register = userid;
      self.StatusUse_User = statusUse;
      self.GetMemberDetailByUserId();
      self.GetRoleUser();
    },

    CloseUserDetailDialog() {
      let self = this;
      self.ClearDataUser();
      self.UserDetailDialog = false;
      self.MemberId_MasMember = "";
      self.CardId_MasMember = "";
      self.FullName_MasMember = "";
      self.TenantName_MasMember = "";
    },
    OpenChangeActiveUserDialog(username, userid, active) {
      let self = this;
      self.ChangeActiveUserDialog = true;
      self.UserName_Register = username;
      self.UserId_Register = userid;
      self.Active_Register = active;
    },

    CloseChangeActiveUserDialog() {
      let self = this;
      self.ChangeActiveUserDialog = false;
    },

    ClearDataUser() {
      let self = this;
      self.Username_Register = "";
      self.FirstName = "";
      self.LastName = "";
      self.Username = "";
      self.Password = "";
      self.MemberID = "";
      self.CardID = "";
      self.TenantID = "";
      self.Tenant = "";
      self.Email = "";
      self.RoleId = 0;
      self.Telephone = "";
      self.RedemptionType = null;
      self.UserLevel = null;
      self.ActiveStatus = null;
      self.Department = null;
      self.RedemptionStatus = false;
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
  },
};
</script>
<style scoped>
* >>> .v-data-table-header {
  background-color: black;
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
