<template>
    <div :class="$route.path!=='/'?'topBar':'topBar End'">
        <div class="name">{{nickName}}</div>
        <!-- {{$store.state.uid}} -->
            <button class="back" @click="backward" v-if="$route.path!=='/'">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
            <input type="button" :class="$route.path!=='/login'?'logBtn':'logBtn invis'" @click="signInOut" :value="loggedIn?'ログアウト':'ログイン'" />


    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"

export default {
    created() {
            firebase.auth().onAuthStateChanged(user=> {
            this.loggedIn = !!user
            if(user !== null){
                this.nickName = user.displayName;
                this.uid = user.uid;
                }
            
        })        
    },
    data() {
        return{
            loggedIn: false,
            nickName: '',
            uid: ''
        }
    },
    methods: {
        signInOut(){
            return this.loggedIn?this.signOut():this.$router.push({name: "Login"})},
        async signOut(){
            try{
               await firebase.auth().signOut();
               this.nickName = '';
               this.$router.replace({name: "Login"})
            }catch(error){
                console.log(error)
            }
        },
        backward(){
            return this.$router.go(-1)
        }
    },
    watch:{
        loggedIn(){
            this.$store.state.logCheck = this.loggedIn
        },
        nickName(){
            this.$store.state.nickname = this.nickName
        },
        uid(){
            this.$store.state.uid = this.uid
        }
    }
}
</script>

<style scoped>
.topBar{
    background:rgb(240, 240, 240);
    border-radius:0% 0% 10px 10px; 
    display:flex;
    justify-content:space-between;
    align-items:center
}
.logBtn{
    margin-right: 5%;
    border-radius: 10px;
    border:0;
    background: white;
    padding: 5px 15px;
    font-weight:bold
}
.name{
    position: fixed;
    left:50%;
    transform: translate(-50%, 0)
}
.back{
    margin-left: 20px;
    background-color: transparent;
    border:0
}
.back>i{
    font-size: 15px;
}
.End{
    justify-content:flex-end;
}
.invis{
    visibility:hidden;
}
</style>
