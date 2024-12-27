<template>
  <v-container fluid class="menu-container">
    <v-row justify="center" align="center" style="min-height: 80vh">
      <v-col cols="12" class="text-center">
        <div class="menu-row">
          <div
            v-for="item in CardList"
            :key="item.id"
            class="menu-item"
            :style="{ '--index': item.index }"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                class="menu-card"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click="NavigatePage(item.id)"
              >
                <v-img
                  :src="item.src"
                  height="250"
                  class="menu-image"
                  cover
                ></v-img>
                <v-card-text class="menu-content pa-4">
                  <div class="menu-header">
                    <h3 class="menu-title">{{ item.title }}</h3>
                    <v-avatar size="40" class="menu-icon">
                      <v-icon color="text">
                        {{ getMenuIcon(item.title) }}
                      </v-icon>
                    </v-avatar>
                  </div>
                  <p class="menu-description">
                    {{ item.description }}
                  </p>
                </v-card-text>
              </v-card>
            </v-hover>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      v-if="StatusAdmin"
      fab
      bottom
      right
      fixed
      color="primary"
      @click="GetDataConfigMainmenuSetting()"
      class="settings-btn"
    >
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-dialog v-model="showSettings" persistent max-width="800">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Settings</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <v-data-table
            :headers="headers"
            :items="ConfigCardList"
            :items-per-page="5"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tr v-for="item in items" :key="item.id">
                <td class="text-center">{{ item.title }}</td>
                <td class="text-center">{{ item.description }}</td>
                <td class="text-center">
                  <v-icon>{{ item.status ? "mdi-check" : "mdi-close" }}</v-icon>
                </td>
                <td class="text-center">
                  <v-btn icon color="primary" @click="editItem(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3 justify-end">
          <v-btn text color="grey" @click="showSettings = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showEditDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Edit Card</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <v-text-field
            v-model="editedItem.title"
            label="Title"
            outlined
            dense
            class="mb-4"
          ></v-text-field>
          <v-textarea
            v-model="editedItem.description"
            label="Description"
            outlined
            dense
            rows="3"
            class="mb-4"
          ></v-textarea>
          <div style="text-align: center">
            <img
              :src="editedItem.src"
              style="align-items: center"
              width="270"
              height="200"
            />
            <br />
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
          <v-switch
            v-model="editedItem.status"
            :label="editedItem.status ? 'Active' : 'Inactive'"
          ></v-switch>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3 justify-end">
          <v-btn text color="grey" @click="showEditDialog = false"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="LoadingDialog" persistent width="auto">
      <v-card class="loading-box">
        <div class="inter-load">
          <div class="rect rect1"></div>
          <div class="rect rect2"></div>
          <div class="rect rect3"></div>
          <div class="rect rect4"></div>
          <div class="rect rect5"></div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import enurl from "@/api/environment";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "MainMenu",
  components: {},
  data() {
    return {
      A: [],
      url: enurl.apiUrl,
      LoadingDialog: false,
      CardList: [],
      ConfigCardList: [],
      editedItem: {},
      showEditDialog: false,
      showSettings: false,
      ConfigData: [],
      StatusAdmin: false,
      headers: [
        { text: "Title", align: "center", sortable: false, value: "name" },
        {
          text: "Description",
          align: "center",
          value: "description",
          sortable: false,
        },
        { text: "Status", align: "center", value: "status", sortable: false },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },
  async mounted() {
    let self = this;
    await self.GetDataConfigMainmenu();
    await self.getDataMenuPermission();
  },

  methods: {
    NavigatePage(id) {
      let self = this;
      if (id === 1) {
        self.$router.push("/MyQR");
      }
      if (id === 2) {
        self.$router.push("/Main");
      }
      if (id === 4) {
        self.$router.push("/ManagePreRegister");
      }
    },

    getMenuIcon(name) {
      const icons = {
        MyQR: "mdi-qrcode",
        Redemption: "mdi-account-cash-outline",
        "Call Lift": "mdi-elevator",
        "Pre Register": "mdi-account-plus",
      };
      return icons[name] || "mdi-apps";
    },

    editItem(item) {
      this.editedItem = item;
      this.showEditDialog = true;
    },

    saveItem() {
      let self = this;
      if (!self.editedItem.title || !self.editedItem.description) {
        Swal.fire({
          title: "title กับ description ห้ามว่างนะขร่ะ",
          width: 600,
          padding: "3em",
          color: "#ff0000",
          // background: "#fff url(/images/trees.png)",
          backdrop: `
    rgba(255,0,0,0.3)
    url("https://media1.tenor.com/m/mytocViGXrcAAAAd/cat-error.gif")
    left top
    no-repeat
  `,
        });

        return;
      }

      let temp = {
        card_id: self.editedItem.id,
        title: self.editedItem.title,
        description: self.editedItem.description,
        image: self.editedItem.src,
        status: self.editedItem.status,
      };
      axios
        .post(`${self.url}Mainmenu/SaveConfigMainmenuPage`, temp)
        .then(function (response) {
          if (response.data.status == 0) {
            self.GetDataConfigMainmenu();
            self.getDataMenuPermission();
            self.showEditDialog = false;
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "บันทึกข้อมูลไม่สำเร็จ",
              width: 500,
              text: response.data.message,
            });
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

    async GetDataConfigMainmenu() {
      let self = this;
      await axios
        .get(`${self.url}Mainmenu/GetDataConfigMainmenu`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ConfigData = response.data.data;
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

    GetDataConfigMainmenuSetting() {
      let self = this;
      axios
        .get(`${self.url}Mainmenu/GetDataConfigMainmenu`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.ConfigCardList = response.data.data;
            self.showSettings = true;
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
    async getDataMenuPermission() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Permission/getDataMenuPermission`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            let MenuPermission = response.data.data;
            self.StatusAdmin = response.data.data.manageUser;

            self.CardList = [];
            let CardMainmenu = [];
            let cardIndex = 0;

            if (MenuPermission.qr == true && MenuPermission.qr != null) {
              let item = {
                src: require("@/assets/qr-code-payments.jpg"),
                name: "qr",
                id: 1,
                index: cardIndex++,
              };
              CardMainmenu.push(item);
            }
            if (
              MenuPermission.redemption == true &&
              MenuPermission.redemption != null
            ) {
              let item = {
                src: require("@/assets/qr-code-payments.jpg"),
                name: "Redemption",
                id: 2,
                index: cardIndex++,
              };
              CardMainmenu.push(item);
            }
            if (
              MenuPermission.callLift == true &&
              MenuPermission.callLift != null
            ) {
              let item = {
                src: require("@/assets/CallLift.jpg"),
                name: "Call Lift",
                id: 3,
                index: cardIndex++,
              };
              CardMainmenu.push(item);
            }
            if (
              MenuPermission.preRegister == true &&
              MenuPermission.preRegister != null
            ) {
              let item = {
                src: require("@/assets/preregister.jpg"),
                name: "Pre Register",
                id: 4,
                index: cardIndex++,
              };
              CardMainmenu.push(item);
            }
            if (self.ConfigData.length > 0 && CardMainmenu.length > 0) {
              for (let i = 0; i < CardMainmenu.length; i++) {
                for (let j = 0; j < self.ConfigData.length; j++) {
                  if (CardMainmenu[i].id == self.ConfigData[j].id) {
                    if (self.ConfigData[j].status == true) {
                      let item = {
                        src: self.ConfigData[j].src,
                        title: self.ConfigData[j].title,
                        description: self.ConfigData[j].description,
                        id: 4,
                        index: cardIndex++,
                      };
                      self.CardList.push(item);
                    } else {
                      if (self.ConfigData[j].id == 1) {
                        let item = {
                          src: require("@/assets/QR.jpg"),
                          title: "myQR",
                          description:
                            "Scan and manage your personal QR codes for quick access",
                          id: 1,
                          index: cardIndex++,
                        };
                        self.CardList.push(item);
                      }
                      if (self.ConfigData[j].id == 2) {
                        let item = {
                          src: require("@/assets/qr-code-payments.jpg"),
                          title: "Redemption",
                          description: "Redeem your Parking Redemption",
                          id: 2,
                          index: cardIndex++,
                        };
                        self.CardList.push(item);
                      }
                      if (self.ConfigData[j].id == 3) {
                        let item = {
                          src: require("@/assets/CallLift.jpg"),
                          title: "Call Lift",
                          description: "Smart elevator calling system",
                          id: 3,
                          index: cardIndex++,
                        };
                        self.CardList.push(item);
                      }
                      if (self.ConfigData[j].id == 4) {
                        let item = {
                          src: require("@/assets/preregister.jpg"),
                          title: "Pre Register",
                          description: "Pre Register Management",
                          id: 4,
                          index: cardIndex++,
                        };
                        self.CardList.push(item);
                      }
                    }
                  }
                }
              }
            }
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
    },

    onPickFile() {
      let self = this;
      self.$refs.fileimagelogo.click();
    },
    handleFileInputLogo(data) {
      let files = data.target.files;
      files = data.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (data) => {
        this.editedItem.src = data.target.result;
      };
    },
  },
};
</script>

<style scoped>
.menu-container {
  max-width: 100%;
  padding: 20px;
}

.menu-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 30px;
  flex-wrap: wrap;
  padding: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.menu-row::-webkit-scrollbar {
  display: none;
}

.menu-item {
  flex: 0 0 auto;
  width: 350px;
  max-width: 400px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.menu-card {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: primary;
  display: flex;
  flex-direction: column;
}

.menu-card.on-hover {
  transform: translateY(-10px) scale(1.03);
}

.menu-image {
  transition: all 0.3s ease;
  height: 250px;
  object-fit: cover;
}

.menu-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.menu-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: text;
  margin: 0;
}

.menu-icon {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 50%;
}

.menu-description {
  color: text;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.learn-more-btn {
  text-transform: none;
  padding: 0;
  align-self: flex-start;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@media (max-width: 1200px) {
  .menu-row {
    justify-content: center;
    gap: 25px;
    padding: 15px;
  }

  .menu-item {
    width: 300px;
    max-width: 350px;
  }
}

@media (max-width: 768px) {
  .menu-container {
    padding: 10px;
  }

  .menu-row {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 10px;
  }

  .menu-item {
    width: 90%;
    max-width: 400px;
  }

  .menu-image {
    height: 200px;
  }

  .menu-title {
    font-size: 1.3rem;
  }

  .menu-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .menu-item {
    width: 95%;
    max-width: 95%;
  }

  .menu-image {
    height: 180px;
  }

  .menu-title {
    font-size: 1.2rem;
  }
}
</style>
