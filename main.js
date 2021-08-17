import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios'
import firebase from "firebase/app";
import "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyAkmQ12qMiCzrYS7MAW9cfZoqASDW1odOc",
    authDomain: "vue-chat-36815.firebaseapp.com",
    databaseURL:"vue-chat-36815-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vue-chat-36815",
    storageBucket: "vue-chat-36815.appspot.com",
    messagingSenderId: "14261960732",
    appId: "1:14261960732:web:006d4003f4e22cdea85fd9"
  };


export const databaseRef = firebase.initializeApp(firebaseConfig);

const app = createApp(App);
      app.use(store);
      app.use(router);
      app.use(VueAxios, axios);
      app.mount('#app');
