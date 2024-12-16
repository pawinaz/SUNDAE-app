import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
      dark: false, // ใช้ธีมแบบ Light เป็นค่าเริ่มต้น
      themes: {
        light: {
          primary: '#23B5D3', // Pacific Cyan
          secondary: '#75ABBC', // Moonstone
          accent: '#A2AEBB', // Cadet Gray
          error: '#FF5252', // สีแดงสำหรับ Error
          background: '#DFE0E2', // Platinum (สีพื้นหลังหลัก)
          text:'#000000'
        },
        dark: {
          primary: '#071013', // Rich Black
          secondary: '#23B5D3', // Pacific Cyan (สามารถใช้เป็น Secondary)
          accent: '#75ABBC', // Moonstone สำหรับไฮไลต์
          error: '#FF5252', // สีแดงสำหรับ Error
          background: '#212121', // สีดำเจ็ท
          text:'#ffffff'
        },
          
      },
    },
});
