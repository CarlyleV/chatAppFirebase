<template>
    <div :class="$route.path!=='/'?'topBar':'topBar End'">

        <!-- {{$store.state.uid}} -->
            <button class="back" @click="backward($route.path)" v-if="$route.path!=='/'">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
            <button type="button" :class="$route.path!=='/login'?'logBtn':'logBtn invis'" @click="signInOut">
            {{loggedIn?'ログアウト':'ログイン'}}</button>


    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"

export default {
    beforeUpdate() {
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
            return this.loggedIn?this.signOut():this.$router.replace({name: "Login"})},
        async signOut(){
            try{
               await firebase.auth().signOut();
               this.nickName = '';
               this.$router.replace({name: "Login"})
            }catch(error){
                console.log(error)
            }
        },
        backward(path){
            if(path==='/login'){return this.$router.replace({name: 'Home'})}
            else if(path==='/register'){return this.$router.replace({name: 'Login'})}

            
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
    align-items:center;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
}
.logBtn{
    margin-right: 5%;
    border-radius: 10px;
    border:0;
    background: white;
    padding: 5px 15px;
    font-weight:bold
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
