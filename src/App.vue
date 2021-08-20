<template>
<div class="full" ref="full">
  <nav-header class="navHeader"></nav-header>
  <!-- <div>
    <ul class="nav">
      <router-link to="/" tag="li" active-class="routerColor">Home</router-link> 
      <router-link v-show="!$store.state.logCheck" to="/login" tag="li" exact-active-class="routerColor">Login</router-link> 
      <router-link v-show="!$store.state.logCheck" to="/register" tag="li" exact-active-class="routerColor">Register</router-link>
    </ul>
  </div> -->
  <router-view class="router"/>
  </div>
</template>

<script>
import NavHeader from "./components/Nav-header.vue"

export default {
  components: {
    'nav-header': NavHeader
  },
  mounted() {
    const vh = window.innerHeight;
    this.$refs.full.style.height=vh+'px';
  },


}
</script>

<style>
*{
  font-family: 'Sawarabi Gothic', sans-serif;
}
.navHeader{
  height:5%
}
input{
  -webkit-appearance: none;
  border-radius: 0;
}
.full{

  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  
}
body {
  margin:0;
  padding: 0;
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
