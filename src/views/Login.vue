<template>
  <div class="split-container">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          width="500"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
          shaped
        >
          <v-card-text style="width: auto">
            <v-tabs class="d-none" v-model="model"></v-tabs>
            <v-tabs-items v-model="model">
              <v-tab-item :value="`tab-1`">
                <div align="center">
                  <v-img
                    v-if="status == 'inactive'"
                    alt="Logo"
                    class="shrink app"
                    contain
                    :src="logo"
                    @click="OpenConFigDialog()"
                    transition="scale-transition"
                    width="200"
                  />
                  <v-img
                    v-else
                    alt="Logo"
                    class="shrink app"
                    contain
                    :src="logoimage"
                    @click="OpenConFigDialog()"
                    transition="scale-transition"
                    width="200"
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
                      v-if="themecolor != '' && status == 'active'"
                      block
                      :color="themecolor"
                      style="color: white"
                      @click="Login()"
                      class="rounded-lg"
                      x-large
                      >Sign In</v-btn
                    >
                    <v-btn
                      v-else
                      block
                      :color="'primary'"
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
          v-if="status == 'inactive'"
          src="@/assets/building.jpg"
          alt="welcome"
          style="width: 100%; height: 100%"
        />

        <img
          v-else
          :src="imagelogin"
          alt="welcome"
          style="width: 100%; height: 100%"
        />
      </v-col>
    </v-row>

    <v-dialog
      v-model="RegisterDialog"
      transition="dialog-top-transition"
      width="900"
    >
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseRegisterDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row style="margin-bottom: -10px">
            <v-col cols="12" md="6">
              <div align="left">
                <v-img width="150" height="150" :src="logoimage"></v-img>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1 style="color: black">Register | ลงทะเบียน</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Username"
                label="Username"
                type="text"
                outlined
                dense
                v-model="Username_Register"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                block
                large
                :color="themecolor"
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
                dense
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
                dense
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
                dense
                placeholder="First Name"
                label="First Name"
                type="text"
                outlined
                v-model="Firstname_Register"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                dense
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
                dense
                placeholder="Email"
                label="Email"
                type="email"
                outlined
                v-model="Email_Register"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                dense
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
                large
                @click="Register()"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="ConfigDialog"
      transition="dialog-top-transition"
      width="900"
    >
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon x-large @click="CloseConfig()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" align="center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Logo Image
              </h2>
              <div>
                <img :src="logoimage" width="270" height="200" />
                <v-btn
                  color="primary"
                  class="white--text mt-2 text-capitalize"
                  router
                  width="150"
                  @click="onPickFile"
                  >Upload
                </v-btn>
                <input
                  style="display: none"
                  ref="fileimagelogo"
                  id="file-upload"
                  accept="image/*"
                  name="file-input"
                  type="file"
                  @change="handleFileInputLogo"
                />
              </div>
            </v-col>
            <v-col cols="12" md="6" align="center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Image Login
              </h2>
              <div>
                <img :src="imagelogin" width="270" height="200" />
                <v-btn
                  color="primary"
                  class="white--text mt-2 text-capitalize"
                  router
                  width="150"
                  @click="onPickFileimage"
                  >Upload
                </v-btn>
                <input
                  style="display: none"
                  ref="fileimagelogin"
                  id="file-upload"
                  accept="image/*"
                  name="file-input"
                  type="file"
                  @change="handleFileInputimage"
                />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6" align="center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Color Text Footer
              </h2>
              <v-color-picker
                v-model="colortextfooter"
                dot-size="25"
                mode="hexa"
                swatches-max-height="200"
              ></v-color-picker>
            </v-col>

            <v-col cols="12" md="6" align="center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Theme Color
              </h2>
              <v-color-picker
                v-model="themecolor"
                dot-size="25"
                mode="hexa"
                swatches-max-height="200"
              ></v-color-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6" align="center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Footer Name
              </h2>
              <v-text-field
                clearable
                v-model="textfooter"
                label="textfooter"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <h2 style="font-weight: bold; font-size: 15px; color: text">
                Status
              </h2>
              <v-radio-group
                v-model="status"
                row
                class="d-flex flex-column align-center"
              >
                <v-radio
                  label="Active"
                  value="active"
                  color="green"
                  :style="{ fontSize: '1.2em', padding: '10px 20px' }"
                >
                  <v-icon left>mdi-check</v-icon>
                </v-radio>
                <v-radio
                  label="Inactive"
                  value="inactive"
                  color="red"
                  :style="{ fontSize: '1.2em', padding: '10px 20px' }"
                >
                  <v-icon left>mdi-close</v-icon>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" align="center">
              <v-btn
                width="250"
                color="green"
                class="rounded-lg white--text"
                large
                @click="SaveConfig()"
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

    <!--dialogconfiglogin-->
    <v-dialog v-model="showLoginDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Login</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <v-text-field
            v-model="loginUsername"
            label="Username"
            outlined
            dense
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="loginPassword"
            label="Password"
            type="password"
            outlined
            dense
            class="mb-4"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3 justify-end">
          <v-btn text color="grey" @click="showLoginDialog = false">Cancel</v-btn>
          <v-btn text :color="themecolor" @click="checkLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="LoginConfig"
      transition="dialog-top-transition"
      width="900"
    >
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon x-large @click="CloseRegisterDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
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

      ConfigDialog: false,
      logoimage: "",
      themecolor: "",
      textfooter: "",
      colortextfooter: "",
      status: false,
      logo: require("@/assets/sundae.png"),
      imagelogin: "",
      loginsetconfig: false,
      
      //loginconfig
      showLoginDialog: false,
      loginUsername: '',
      loginPassword: '',
    };
  },

  mounted: function () {
    let self = this;
    self.GetDataConfigFooter();
    self.GetDataConfigLoginPage();
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

    CloseConfig() {
      let self = this;
      // self.ClearData();
      self.ConfigDialog = false;
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
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
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
    OpenConFigDialog() {
      this.showLoginDialog = true;
    },

    checkLogin() {
      if (this.loginUsername === 'admin' && this.loginPassword === 'fsadmin') {
        this.showLoginDialog = false;
        this.ConfigDialog = true;
      } else {
        Swal.fire("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! กรุณากรอกใหม่");
      }
    },

    onPickFile() {
      let self = this;
      self.$refs.fileimagelogo.click();
    },

    onPickFileimage() {
      let self = this;
      self.$refs.fileimagelogin.click();
    },

    handleFileInputLogo(data) {
      let files = data.target.files;
      files = data.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (data) => {
        this.logoimage = data.target.result;

        // this.logoimageName = files[0].name;
      };
    },

    handleFileInputimage(data) {
      let files = data.target.files;
      files = data.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (data) => {
        this.imagelogin = data.target.result;
        // this.logoimageName = files[0].name;
      };
    },

    ReloadPage() {
      window.location.reload();
    },

    loginsetting() {
      let self = this;
      self.useradmin = "admin";
      self.passadmin = "password";

    },

    Opensetting() {
      let self = this;
      self.loginsetconfig = true;
    },

    SaveConfig() {
      let self = this;
      let temp = {
        logoimage: self.logoimage,
        themecolor: self.themecolor,
        textfooter: self.textfooter,
        colortextfooter: self.colortextfooter,
        imagelogin: self.imagelogin,
        status: self.status == "active" ? true : false,
      };
      axios
        .post(`${self.url}Login/SaveConfigLoginPage`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ReloadPage();
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
      self.ConfigDialog = false;
    },
    ToggleStatus(value) {
      this.status = value;
    },

    GetDataConfigLoginPage() {
      let self = this;
      axios
        .get(`${self.url}Login/GetDataConfigLoginPage`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.logoimage = response.data.data.logoimage;
            self.themecolor = response.data.data.themecolor;
            self.textfooter = response.data.data.textfooter;
            self.colortextfooter = response.data.data.colortextfooter;
            self.status =
              response.data.data.status == true ? "active" : "inactive";
            self.imagelogin = response.data.data.imagelogin;
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
    },

    GetDataConfigFooter() {
      let self = this;
      axios
        .get(`${self.url}Login/GetDataConfigFooter`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.themecolor = response.data.data.themecolor;
            self.textfooter = response.data.data.textfooter;
            self.colortextfooter = response.data.data.colortextfooter;
            self.status =
              response.data.data.status == true ? "active" : "inactive";
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error...",
            width: 900,
            text: error.response.data.message,
          });
        });
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
