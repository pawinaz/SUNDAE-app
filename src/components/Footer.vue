<template>
  <v-footer
    :color="statustheme == false ? 'primary' : themecolor"
    style="margin-top: auto"
    class="text-caption footer-shadow"
  >
    <v-row no-gutters>
      <v-col cols="12" align="center">
        <div class="py-2 inline-container">
          <v-img
            class="inline-item"
            src="@/assets/fs-white-removebg-preview.png"
            width="80"
            height="33"
          ></v-img>
          <span v-if = "statustheme" class="inline-item copyright-text" :style="{color:colortextfooter}" > 
            
             {{ textfooter }}
          </span>
          <span v-else class="inline-item copyright-text" style="color:text" > 
            Copyright © 2024 Forward System Co. Ltd.
             
          </span>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import axios from "axios";
import enurl from "@/api/environment";
// import LoadingComponent from "@/components/Loading";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  data() {
    return {    
      LoadingDialog: false,
      url: enurl.apiUrl,

      ConfigDialog:false,
      themecolor:"",
      textfooter:"",
      colortextfooter:"",
      statustheme:false

    };
  },

  mounted: function () {
    let self = this;
    self.GetDataConfigFooter()
  },

  methods:{
    GetDataConfigFooter(){
      let self =this;
      axios
        .get(`${self.url}Login/GetDataConfigFooter`)
        .then(function (response) {
          if (response.data.status == 0) {
            self.themecolor = response.data.data.themecolor
            self.textfooter = response.data.data.textfooter
            self.colortextfooter = response.data.data.colortextfooter
            self.statustheme = response.data.data.status
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

    }
  }
};

</script>
<style>
.inline-container {
  text-align: center;
}

.inline-item {
  display: inline-block;
  vertical-align: middle;
}

.copyright-text {
  font-size: 0.875rem;
  margin-bottom: 0;
  /* color: text; */
  padding-left: 15px;
}

.footer-shadow {
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
