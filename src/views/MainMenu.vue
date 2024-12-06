<template>
  <v-container fluid class="menu-container">
    <v-row justify="center" align="center" style="min-height: 80vh;">
      <v-col cols="12" class="text-center">
        <div class="menu-row">
          <div 
            v-for="item in CardList" 
            :key="item.id" 
            class="menu-item"
            :style="{ '--index': item.index }"
          >
            <v-card
              class="menu-card"
              v-hover="{ value: hover }"
              :class="{ 'menu-card-hover': hover }"
              @click="NavigatePage(item.name)"
            >
              <v-img
                :src="item.src"
                height="250"
                class="menu-image"
                cover
              ></v-img>
              
              <div class="menu-content">
                <div class="menu-header">
                  <h3 class="menu-title">{{ item.name }}</h3>
                  <div class="menu-icon">
                    <v-icon small color="primary">
                      {{ getMenuIcon(item.name) }}
                    </v-icon>
                  </div>
                </div>
                
                <p class="menu-description">{{ getMenuDescription(item.name) }}</p>
                
                <v-btn
                  text
                  color="primary"
                  class="learn-more-btn"
                  small
                >
                  Learn More
                  <v-icon small right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>

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
  </v-container>
</template>

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
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.menu-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
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
  color: #333;
  margin: 0;
}

.menu-icon {
  background: rgba(var(--v-primary-base), 0.1);
  padding: 10px;
  border-radius: 50%;
}

.menu-description {
  color: #666;
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

/* Responsive Adjustments */
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

<script>
import enurl from "@/api/environment";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "MainMenu",
  components: {},
  data() {
    return {
      url: enurl.apiUrl,
      LoadingDialog: false,
      CardList: [],
    };
  },

  async mounted() {
    let self = this;
    self.getDataMenuPermission();
  },

  methods: {
    getDataMenuPermission() {
      let self = this;
      self.LoadingDialog = true;
      axios
        .get(`${self.url}Permission/getDataMenuPermission`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.LoadingDialog = false;
            let MenuPermission = response.data.data;
            self.CardList = [];
            let cardIndex = 0;
            if (MenuPermission.qr == true && MenuPermission.qr != null) {
              let item = {
                src: require("@/assets/QR.jpg"),
                name: "MyQR",
                id: 1,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.redemption == true &&
              MenuPermission.redemption != null
            ) {
              let item = {
                src: require("@/assets/qr-code-payments.jpg"),
                name: "Redemption",
                id: 2,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.callLift == true &&
              MenuPermission.callLift != null
            ) {
              let item = {
                src: require("@/assets/CallLift.jpg"),
                name: "Call Lift",
                id: 3,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
            if (
              MenuPermission.preRegister == true &&
              MenuPermission.preRegister != null
            ) {
              let item = {
                src: require("@/assets/preregister.jpg"),
                name: "Pre Register",
                id: 4,
                index: cardIndex++
              };
              self.CardList.push(item);
            }
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

    NavigatePage(PageName){
      let self = this;
      if(PageName == "MyQR"){
        self.$router.push("/MyQR");
      }
      if(PageName == "Redemption"){
        self.$router.push("/Main");
      }
      if(PageName == "Pre Register"){
        self.$router.push("/ManagePreRegister");
      }
    },

    getMenuIcon(name) {
      const icons = {
        'MyQR': 'mdi-qrcode',
        'Redemption': 'mdi-gift',
        'Call Lift': 'mdi-elevator',
        'Pre Register': 'mdi-account-plus'
      };
      return icons[name] || 'mdi-apps';
    },

    getMenuDescription(name) {
      const descriptions = {
        'MyQR': 'Scan and manage your personal QR codes for quick access',
        'Redemption': 'Redeem your Parking Redemption',
        'Call Lift': 'Smart elevator calling system',
        'Pre Register': 'Pre Register Management'
      };
      return descriptions[name] || '';
    }
  },
};
</script>