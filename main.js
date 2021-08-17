import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios'
import firebase from "firebase/app";
import "firebase/database"


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL:"",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };


export const databaseRef = firebase.initializeApp(firebaseConfig);

const app = createApp(App);
      app.use(store);
      app.use(router);
      app.use(VueAxios, axios);
      app.mount('#app');
