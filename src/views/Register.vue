<template>
    <div class="registerbody">
        <div class="tittle">新規登録</div>
        <div v-if="error" style="color:red"><strong>{{error.message}}</strong></div>
       <form @submit.prevent="pressed">
            <div class="nickname">
            <label for="nickname">ユーザー名</label>
            <input type="text"
                   id="nickname" 
                   name="nickname" 
                   required  
                   v-model="nicknameText"/>
            </div>
            <div class="email">
            <label for="mail">メール </label>
            <input type="email"
                   id="email" 
                   name="email" 
                   required  
                   v-model="emailText"
                   :style="[emailStyle,emailCheckRStyle]"
                   @change="emailCheckR"
                   @input="fullToHalf"/>
            </div>
            <div class="password">
            <label for="password">パスワード </label>
            <div class="showPassword">
            <input :type="showPassword?'text':'password'"
                    id="password" 
                    name="password" 
                    required 
                    v-model="passwordT" 
                    minlength="8"
                   :style="passwordStyle"/>
            <button type="button" 
                    class="show" 
                    @click='showPassword=!showPassword'>
                    <i :class="showPassword?'fa fa-eye':'fa fa-eye-slash'"></i>
            </button>
            </div>
            </div>
            <div class="repeatPassword">
            <label for="repeatPassword">パスワード再入力 </label>
            <div class="showPassword">
            <input :type="againShowPassword?'text':'password'" 
                  id="repeatPassword" 
                  name="repeatPassword" 
                  required 
                  v-model="repeatPasswordT" 
                  minlength="8"
                 :style="repeatPasswordStyle"/>
            <button type="button"
                    class="show" 
                    @click='againShowPassword=!againShowPassword'>
                    <i :class="againShowPassword?'fa fa-eye':'fa fa-eye-slash'"></i>
            </button>
            </div>
            </div>
           <button type="submit" class="submit" :disabled="!allCheck">登録</button>
        </form>

   
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"

export default { 
    data(){
        return {
        nicknameText:'',
        passwordT: '',
        repeatPasswordT: '',
        emailText: '',
        mailReg: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
        emailCheckRFlag: true,
        showPassword: false,
        againShowPassword: false,
        passwordCheckRFlag: true,
        error: ""
        }
    },
    computed: {
        emailStyle(){
            return 'background:'+(this.mailReg.test(this.emailText)?'#90ee90':'')
        },
        emailCheckRStyle(){
            return 'background:'+(this.emailCheckRFlag?'':'rgb(255, 182, 182)')
        },
        passwordStyle() {
            return 'background:'+(this.passwordT.length>7?'#90ee90':'')
        },
        repeatPasswordStyle() {
            return 'background:'+(this.passwordT === this.repeatPasswordT&&
            this.passwordT.length>7?'#90ee90':'')
        },
        allCheck(){
            return this.mailReg.test(this.emailText)&&this.passwordT===this.repeatPasswordT&&this.passwordT.length>7&&this.passwordT.length>7&&this.nicknameText!==''
        },
    },
 
    methods: {
        emailCheckR(){
            this.emailCheckRFlag = this.mailReg.test(this.emailText)
            //  console.log(this.emailCheckRFlag)
        },
        fullToHalf() {
            this.emailText = this.emailText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, 
            function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
             });
        },
        pressed(){
            firebase.auth().createUserWithEmailAndPassword(this.emailText, this.passwordT)
                .then((result)=>{
                     return result.user.updateProfile({displayName: this.nicknameText})
                })
                .then(() => {
                     this.$router.replace({ name: "Home" });
                }).catch(error => (this.error = error));
        }
    }
}
</script>

<style scoped>
.tittle{
    font-size:25px;
    font-weight:bold
}
input{
    border-style: solid;
    border-width: 0.5px;
}
.registerbody{
    position: fixed;
    top:20%;
    left:50%;
    transform: translate(-50%,0);
    -webkit-transform: translate(-50%, 0);
    width:95vw;
    max-width: 500px;
}
.nickname,
.email,
.password,
.repeatPassword{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}
.showPassword{
    display: inline-flex;
    justify-content: flex-end;
    width:200px
}
.showPassword input{
        width:100%;
        padding:0;
        border-style: solid;
        border-width: 0.5px;
        border-color: grey transparent grey grey;
}
.showPassword button{
        padding:0;
        width:30px;
        border-style: solid;
        border-width: 0.5px;
        border-color: grey grey grey transparent;
        background: white;
}
.nickname input,
.email input{
    width:200px
}
.submit{
    width: 300px;
    margin-top: 50px;
    padding:0, 3px;
    border-radius: 10px;
    border:0;
    background: black;
    padding: 5px 15px;
    font-weight:bold;
    color: white;
}
</style>

