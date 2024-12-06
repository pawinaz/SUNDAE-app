<template>
  <div class="split-container">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          width="500"
          height="550"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
          shaped
        >
          <v-card-text style="width: auto">
            <v-tabs class="d-none" v-model="model"></v-tabs>
            <v-tabs-items v-model="model">
              <v-tab-item :value="`tab-1`">
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
                <br />
                <v-row style="margin-bottom: -10%">
                  <v-col cols="12" md="1"></v-col>
                  <v-col cols="12" md="10">
                    <v-text-field
                      placeholder="Username"
                      name="login"
                      type="text"
                      outlined
                      v-model="username"
                      @keyup.enter="Login"
                    />
                  </v-col>
                  <v-col cols="12" md="1"></v-col>
                </v-row>
                <v-row style="margin-bottom: -50px">
                  <v-col cols="12" md="1"></v-col>
                  <v-col cols="12" md="10">
                    <v-text-field
                      outlined
                      placeholder="Password"
                      :append-icon="ShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="ShowPassword ? 'text' : 'password'"
                      @click:append="ShowPassword = !ShowPassword"
                      id="password"
                      @keyup.enter="Login"
                      v-model="password"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="1"></v-col>
                  <v-col cols="12" md="10">
                    <v-btn
                      block
                      color="#3A5A40"
                      style="color: white"
                      @click="Login()"
                      class="rounded-lg"
                      x-large
                      >Sign In</v-btn
                    >
                  </v-col>
                  <v-col cols="12" md="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" align="center">
                    <p
                      style="
                        font-size: large;
                        color: black;
                        text-decoration: underline;
                        cursor: pointer;
                      "
                      @click="OpenRegisterDialog()"
                    >
                      Register New Account
                    </p>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" v-show="$vuetify.breakpoint.smAndDown == false">
        <img
          src="@/assets/building.jpg"
          alt="welcome"
          style="width: 100%; height: 100%"
        />
      </v-col>
    </v-row>


    <v-dialog v-model="RegisterDialog" transition="dialog-top-transition" width="900">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            x-large
            @click="CloseRegisterDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <div align="left">
                <v-img
                  width="250"
                  height="auto"
                  src="@/assets/sundae.png"
                ></v-img>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1 style="color: black;">Register | ลงทะเบียน</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Username"
                label="Username"
                type="text"
                outlined
                v-model="Username_Register"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                block
                x-large
                color="primary"
                style="color: white"
                @click="CheckDuplicateUsername(Username_Register)"
                class="rounded-lg"
                >ตรวจสอบ Username</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                placeholder="Password"
                label="Password"
                :append-icon="ShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="ShowPassword ? 'text' : 'password'"
                @click:append="ShowPassword = !ShowPassword"
                id="Password_Register"
                v-model="Password_Register"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                placeholder="Re Password"
                label="Re Password"
                :append-icon="ShowRePassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="ShowRePassword ? 'text' : 'password'"
                @click:append="ShowRePassword = !ShowRePassword"
                id="RePassword_Register"
                v-model="RePassword_Register"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="First Name"
                label="First Name"
                type="text"
                outlined
                v-model="Firstname_Register"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Last Name"
                label="Last Name"
                type="text"
                outlined
                v-model="Lastname_Register"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Email"
                label="Email"
                type="email"
                outlined
                v-model="Email_Register"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Telephone"
                label="Telephone"
                type="number"
                outlined
                v-model="Telephone_Register"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" align="center">
              <v-btn
                width="250"
                color="green"
                class="rounded-lg white--text"
                x-large
                @click="Register()"
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
  </div>
</template>

<script>
import axios from "axios";
import enurl from "@/api/environment";
import LoadingComponent from "@/components/Loading";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "Login",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      model: "tab-1",
      url: enurl.apiUrl,
      LoadingDialog: false,

      flagPassword: false,
      username: "",
      password: "",

      RegisterDialog: false,
      ShowPassword: false,
      ShowRePassword: false,
      
      //Register
      Username_Register: "",
      Password_Register: "",
      RePassword_Register: "",
      Firstname_Register: "",
      Lastname_Register: "",
      Telephone_Register: "",
      Email_Register: "",
    };
  },

  mounted: function () {
    let self = this;
    let isLoggedIn = this.$cookies.get("isLoggedIn");
    if (isLoggedIn == "true") {
      let token = this.$cookies.get("Token");
      if (token != null) {
        self.$store
          .dispatch("CheckToken", { token })
          .then(function () {
            self.$router.push("/MainMenu");
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.data.message,
            });
          });
      }
    }
  },

  methods: {
    Login() {
      let self = this;
      if (!self.username || !self.password) {
        Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน !");
      } else {
        self.LoadingDialog = true;
        let temp = {
          Username: self.username,
          Password: self.password,
        };
        self.$store
          .dispatch("LoginUser", temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.LoadingDialog = false;
              self.$router.push("/MainMenu");
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Something went wrong !",
              width: 500,
              text: error.data.message,
            });
          });
      }
    },

    Register() {
      let self = this;
      if (
        !self.Username_Register ||
        !self.Password_Register ||
        !self.RePassword_Register ||
        !self.Firstname_Register ||
        !self.Lastname_Register ||
        !self.Email_Register ||
        !self.Telephone_Register
      ) {
        Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน !");
      } else {
        self.LoadingDialog = true;
        let temp = {
          Username: self.Username_Register,
          Password: self.Password_Register,
          RePassword: self.RePassword_Register,
          Firstname: self.Firstname_Register,
          Lastname: self.Lastname_Register,
          Email: self.Email_Register,
          Telephone: self.Telephone_Register,
        };
        axios
          .post(`${self.url}Login/Register`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.LoadingDialog = false;
              Swal.fire({
                icon: "success",
                title: "Register Success",
                showConfirmButton: false,
                timer: 1500,
              });
              self.CloseRegisterDialog();
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.data.message,
            });
          });
      }
    },

    CheckDuplicateUsername(username) {
      let self = this;
      if (!username) {
        Swal.fire({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        self.LoadingDialog = true;
        let temp = {
          Username: username,
        };
        axios
          .post(`${self.url}Login/CheckDuplicateUsername`, temp)
          .then(function (response) {
            if (response.data.status == 0) {
              self.LoadingDialog = false;
              if (response.data.data.isDuplicate) {
                self.LoadingDialog = false;
                Swal.fire({
                  icon: "error",
                  title: "Error...",
                  width: 500,
                  text: "Username : " + username + " ซ้ำกับในระบบ",
                });
              } else {
                self.LoadingDialog = false;
                Swal.fire({
                  icon: "success",
                  title: "Ok...",
                  width: 500,
                  text: "Username : " + username + " สามารถใช้งานได้",
                });
              }
            }
            self.LoadingDialog = false;
          })
          .catch(function (error) {
            self.LoadingDialog = false;
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: error.data.message,
            });
          });
      }
    },

    OpenRegisterDialog() {
      let self = this;
      self.ClearDataRegister();
      self.RegisterDialog = true;
    },

    ClearDataRegister() {
      let self = this;
      self.Username_Register = "";
      self.Password_Register = "";
      self.RePassword_Register = "";
      self.Firstname_Register = "";
      self.Lastname_Register = "";
      self.Telephone_Register = "";
      self.Email_Register = "";
    },

    CloseRegisterDialog() {
      let self = this;
      self.ClearDataRegister();
      self.RegisterDialog = false;
    },

    CheckLoginToken(value) {
      let self = this;
      let temp = {
        token: value,
      };
      axios
        .post(`${self.url}Login/CheckLoginToken`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.$router.push("/MainMenu");
          } else if (
            response.data.status == 1 &&
            response.data.message == "Token หมดอายุ"
          ) {
            Swal.fire({
              icon: "error",
              title: "Error...",
              width: 500,
              text: response.data.message,
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    TogglePassword() {
      let self = this;
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
        self.flagPassword = false;
      } else {
        x.type = "password";
        self.flagPassword = true;
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 14rem;
}
.form {
  min-width: 50%;
}
.img-intersection {
  width: 100%;
  height: 100vh;
  max-width: 100%;
}
@media only screen and (max-width: 959px) {
  .logocss {
    display: none;
  }
  .rescss {
    margin: 1rem;
    width: 100% !important;
  }
}
.centered-input-header >>> input {
  text-align: center;
  color: black;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
.image-container {
  width: 150px;
  height: 120px;
  text-align: center;
}
.image-container img {
  height: 100%;
}
.Header_Color {
  font-weight: bold;
}

.split-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.split {
  width: 50%;
  height: 100%;
}

.centered-form {
  width: 100%;
  max-width: 50px;
  padding: 20px;
}

.left {
  background-color: white;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

}

.right {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered-content {
  color: white;
  text-align: center;
  padding: 2rem;
}

/* Responsive layout */
@media only screen and (max-width: 959px) {
  .split-container {
    flex-direction: column;
  }
  
  .split {
    width: 100%;
  }
  
  .right {
    display: none;
  }
}
</style>
