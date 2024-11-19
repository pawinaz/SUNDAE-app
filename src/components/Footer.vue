<template>
  <v-footer
    color="white"
    style="margin-top: auto"
    class="text-caption footer-shadow"
  >
    <v-row no-gutters>
      <v-col cols="12" align="center">
        <div class="py-2 inline-container">
          <v-img
            class="inline-item"
            src="@/assets/fs.svg"
            width="80"
          ></v-img>
          <span class="inline-item copyright-text" style="color:black" > 
            Copyright © 2024 Forward System Co. Ltd.
          </span>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {};
  },
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
  color: #fff8f8;
  padding-left: 15px;
}

.footer-shadow {
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
