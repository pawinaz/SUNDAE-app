import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        dark: false,
        themes: {
          light: {
            primary: '#126496',
            secondary: '#8E8E8E',
            white: '#ffffff',
            pink: '#E27278',
            warning: '#FAA91B',
            darkprimary: '#0A3957',
            
            
          },
          dark: {
            primary: '#126496',
            secondary: '#8E8E8E',
            white: '#ffffff',
            
          }
          
        },
      },
});
