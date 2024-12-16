
  <template>
  <div class="split-container">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          width="500"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
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
  </div>
</template>
  
  <script>
//   import axios from "axios";
import enurl from "@/api/environment";
//   import LoadingComponent from "@/components/Loading";
//   import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "Login",
  components: {},
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

  mounted: function () {},

  methods: {},
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
  