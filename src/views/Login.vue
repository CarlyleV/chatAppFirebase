<template>
    <div class="loginbody">
       <div class="tittle"><strong>ログイン</strong></div>

        <form @submit.prevent="pressed">
            <div class="errorBox">
                <p><strong>{{error.message}}</strong></p>
            </div>
                
            <div class="email">
                <label for="email">メール</label>
                <input type="email" name="email" id="email" placeholder=" E-mail" class="emailInput" v-model="email"/>
            </div>
            <div class="pass">
                <label for="password">パスワード</label>
                <div class="passInput">
                <input :type="showPassword?'text':'password'" name="password" id="password" placeholder=" Password" v-model="password"/>
                <button type="button" id ="showButton" :value="showPassword?'unshow':'show'" @click='showPassword=!showPassword'><i :class="showPassword?'fa fa-eye':'fa fa-eye-slash'"></i></button>
                    </div>
            
            </div>
            <input type="submit" value="ログイン" class="loginBtn"/>
            <router-link to="/register" id="register">新規登録はこちら</router-link>
        </form>
        
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"

export default {
    data() {
        return{
            email: "",
            password: "",
            showPassword: false,
            error: ""
        }
    },
    methods: {
        async pressed(){
            try{
               await firebase.auth().signInWithEmailAndPassword(this.email,this.password)
               this.$router.replace({name: "Home"})
            }catch(error){
                this.error = error
            }
        }
    },
    updated() {
        console.log(this.error)
    }
}
</script>

<style scoped>
    .tittle{
        font-size:25px
    }
    a{
        color:black;
        text-decoration: none;
        margin-top:20px;
        font-size: 12px
    }
    
    .loginbody{
        position: fixed;
        top:20%;
        left:50%;
        transform: translate(-50%,0);
        -webkit-transform: translate(-50%, 0);
    }
    form{
        width: 80vw;
        max-width: 300px;
        display: flex;
        flex-direction: column;
    }
    .email{
        
        display: flex;
        justify-content: space-between
    }
    /* .loginbody label{
        display: inline-block;
        text-align: left;
        width: 7em;
    } */
    .pass{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }
    .loginBtn{

        margin-top: 50px;
        padding:0, 3px;
        border-radius: 10px;
        border:0;
        background: black;
        padding: 5px 15px;
        font-weight:bold;
        color: white
    }
    .emailInput{
        -webkit-appearance: none;
         border-style: solid;
        border-color: grey grey grey grey;
        background: white;
        border-width: 0.5px;
        width:200px;
        padding:0
    }
    .passInput{
        display: inline-flex;
        justify-content: flex-end;
        width:200px
    }
    .passInput input{
        width:100%;
        padding:0;
        border-style: solid;
        border-width: 0.5px;
        border-color: grey transparent grey grey;
    }
    .passInput button{
        padding:0;
        width:30px;
        border-style: solid;
        border-width: 0.5px;
        border-color: grey grey grey transparent;
        background: white;
    }
    .errorBox{
        height:6vh;
        position: relative;
        bottom: 0
    }
    .errorBox p{
        font-size: 12px;
        color: red;
    }
</style>