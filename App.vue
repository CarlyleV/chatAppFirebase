<template>
  <nav-header class="navHeader"></nav-header>
  <!-- <div>
    <ul class="nav">
      <router-link to="/" tag="li" active-class="routerColor">Home</router-link> 
      <router-link v-show="!$store.state.logCheck" to="/login" tag="li" exact-active-class="routerColor">Login</router-link> 
      <router-link v-show="!$store.state.logCheck" to="/register" tag="li" exact-active-class="routerColor">Register</router-link>
    </ul>
  </div> -->
  <router-view/>
</template>

<script>
import NavHeader from "./components/Nav-header.vue"

export default {
  components: {
    'nav-header': NavHeader
  }
}
</script>

<style>
body {
  height: 100%;
  margin:0;
  padding: 0;
}
.navHeader{
  height: 5vh
}
#app {
  text-align: center;
}
a{
    color:grey;
}
.nav a{
  font-weight: bold;
  text-decoration: none
}

.routerColor{
  color:green
}


</style>
