import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import firebase from "firebase/app";
import "firebase/auth"


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path==="/register"||to.path==="/login"){
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
          next("/");
        } else {
          next();
        }

    unsubscribe();
  });}
  else{
    next();
  }
});

export default router
