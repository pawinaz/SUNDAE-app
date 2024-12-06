<template>
  <nav style="z-index: 3; background-color: white;">
    <v-toolbar color="white" height="60">
      <!-- <v-img
        alt="Logo"
        class="shrink app"
        contain
        @click="NavigateToMain()"
        src="@/assets/punn-logo.png"
        transition="scale-transition"
        width="100"
      /> -->
      <v-img
        alt="Logo"
        class="shrink app"
        contain
        @click="NavigateToMain()"
        src="@/assets/sundae.png"
        transition="scale-transition"
        width="100"
        style="float: left;"
      />
      <p
        v-show="!$vuetify.breakpoint.smAndDown"
        style="
          color: black;
          margin-left: 1rem;
          font-size: 18px;
          margin-top: 14px;
          cursor: default;
          float: left;
        "
      >
      </p>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu }">
          <v-btn icon v-on="{ ...menu }">
            <v-icon color="#126496">mdi-menu-down</v-icon>
          </v-btn>
          <div>
            <span style="font-size: 18px; color: black; padding-right: 10px">{{
              Username
            }}</span>
          </div>
        </template>
        <v-list v-if="StatusAdmin">
          <v-list-item v-for="(item, index) in itemsMenuAdmin" :key="index">
            <v-list-item-title
              style="cursor: pointer"
              @click="ActionMenu(item.title)"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item v-for="(item, index) in itemsMenu" :key="index">
            <v-list-item-title
              style="cursor: pointer"
              @click="ActionMenu(item.title)"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-dialog v-model="EditUserDialog" persistent width="800">
      <v-card>
        <v-card-title>
          <p>Change Password</p>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-top: -10px; z-index: 1"
            icon
            @click="CloseEditUserDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="ml-5 mr-2">
            <v-col cols="12" md="6">
              <p style="font-size: 13px; color: black">Username</p>
              <v-text-field
                disabled
                outlined
                placeholder="Username"
                v-model="Username"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p style="font-size: 13px; color: black">Old Password</p>
              <v-text-field
                outlined
                placeholder="Old Password"
                type="password"
                id="oldpassword"
                v-model="EditOldPassword"
                :append-icon="flagOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="TogglePassword"
              />
            </v-col>
          </v-row>
          <v-row class="ml-5 mr-2">
            <v-col cols="12" md="6">
              <p style="font-size: 13px; color: black">New Password</p>
              <v-text-field
                outlined
                placeholder="New Password"
                type="password"
                id="newpassword"
                v-model="EditPassword"
                :append-icon="flagPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="ToggleNewPassword"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p style="font-size: 13px; color: black">Confirm Password</p>
              <v-text-field
                outlined
                placeholder="Confirm Password"
                type="password"
                id="confirmpassword"
                v-model="EditConfirmPassword"
                :append-icon="flagConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="ToggleConfirmPassword"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <v-btn
                height="40"
                width="150"
                color="success"
                @click="ChangePassword()"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </nav>
</template>
<script>
import axios from "axios";
import enurl from "@/api/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  data() {
    return {
      url: enurl.apiUrl,
      Username: this.$cookies.get("Username"),
      StatusAdmin: false,

      EditUserDialog: false,
      flagOldPassword: false,
      flagPassword: false,
      flagConfirmPassword: false,

      itemsMenuAdmin: [
        { title: "Manage User" },
        { title: "Manage Role" },
        { title: "Change Password" },
        { title: "Logout" },
      ],
      itemsMenu: [{ title: "Change Password" }, { title: "Logout" }],

      EditUsername: "",
      EditOldPassword: "",
      EditPassword: "",
      EditConfirmPassword: "",
    };
  },

  mounted() {
    let self = this;
    self.GetDataPermission();
  },

  methods: {
    NavigateToMain() {
      let self = this;
      self.$router.push("/MainMenu");
    },

    ActionMenu(data) {
      let self = this;
      if (data == "Manage User") {
        self.$router.push("/ManageUser");
      } else if (data == "Change Password") {
        self.EditUser();
      } else if (data == "Manage Role") {
        self.ManageRole();
      } else {
        self.Logout();
      }
    },

    EditUser() {
      let self = this;
      let token = this.$cookies.get("Token");
      self.GetDataUserByToken(token);
    },

    ManageRole(){
      let self = this;
      self.$router.push("/ManageRole");
    },

    GetDataPermission() {
      let self = this;
      axios
        .get(`${self.url}Permission/getDataMenuPermission`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.StatusAdmin = response.data.data.manageUser;
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },

    GetDataUserByToken(token) {
      let self = this;
      let temp = {
        token: token,
      };
      axios
        .post(`${self.url}Login/GetDataUserByToken`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.MappingEditUser(response.data.data);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },

    ChangePassword(){
      let self = this;
      if(self.EditPassword != self.EditConfirmPassword){
        Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: "กรุณากรอก Password ให้ถูกต้องและตรงกัน",
          });
      }
      self.LoadingDialog = true;
      let temp = {
        oldPassword: self.EditOldPassword,
        newPassword: self.EditPassword
      };
      axios
        .post(`${self.url}Login/ChangePassword`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            });
            self.Logout();
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

    MappingEditUser(data) {
      let self = this;
      self.EditUsername = data.username;
      self.EditUserDialog = true;
    },

    CloseEditUserDialog() {
      let self = this;
      self.EditOldPassword = "";
      self.EditPassword = "";
      self.EditConfirmPassword = "";
      self.EditUserDialog = false;
    },

    TogglePassword() {
      let self = this;
      var x = document.getElementById("oldpassword");
      if (x.type === "password") {
        x.type = "text";
        self.flagOldPassword = false;
      } else {
        x.type = "password";
        self.flagOldPassword = true;
      }
    },

    ToggleNewPassword() {
      let self = this;
      var x = document.getElementById("newpassword");
      if (x.type === "password") {
        x.type = "text";
        self.flagPassword = false;
      } else {
        x.type = "password";
        self.flagPassword = true;
      }
    },

    ToggleConfirmPassword() {
      let self = this;
      var x = document.getElementById("confirmpassword");
      if (x.type === "password") {
        x.type = "text";
        self.flagConfirmPassword = false;
      } else {
        x.type = "password";
        self.flagConfirmPassword = true;
      }
    },

    Logout() {
      let self = this;
      self.$store
        .dispatch("Logout")
        .then(function () {
          self.$router.push("/Login");
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
<style>
.app {
  margin-left: 1rem;
  cursor: pointer;
}
.list {
  cursor: pointer;
}
.apptitle {
  font-family: "Roboto", sans-serif;
  font-size: 20px !important;
}
.v-list-item__content {
  font-family: "Roboto", sans-serif;
  font-size: 20px !important;
}
.mdi-menu-down::before {
  color: black;
}
.white-color {
  background-color: red;
  color: red;
}
.item-title {
  font-size: 16px;
  font-weight: 500;
}
.v-application--is-ltr
  .v-list-group--no-action.v-list-group--sub-group
  .v-list-group__items
  .v-list-item {
  padding-left: 20px !important;
}
.v-toolbar {
  background-color: white !important;
}
</style>
