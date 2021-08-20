<template>
    <div>
        <!-- {{data}} -->
        <div class="allMessage" ref="box" touchstart="">
        <div class="noneS"></div>

        <div v-for="(message,index) in messages" :key="message.key">
            <div v-if="index===0?true:exMD(message.messageTime)!==exMD(messages[index-1].messageTime)">
                <span :ref="el=>{if(el)absoluteDateList.push(el)}"></span>
                 <div class="messageDate" :ref="el=>{if(el)dateList.push(el)}">{{exMD(message.messageTime)}}</div>
                </div>
            <div :class="message.uid==$store.state.uid?'message thisLogged':'message others'">
                <div class="nickname" v-if="message.uid!==$store.state.uid">{{message.nickName}}</div>
                <div class="spacer"></div>
                <div class="content">
                    <div class="contentAlign">
                    {{message.content}}</div>
                    </div>
                  <div class="spacer"></div>
                <div class="messageTime">
                    {{dDight(exDate(message.messageTime).getHours())}}:
                    {{dDight(exDate(message.messageTime).getMinutes())}}</div>
            </div>
        </div>
        </div>
        <div ref="footSpace"></div>
        <footer ref="footerRef">
            <form @submit.prevent="sendMessage" class="sendMessageForm">
                <textarea
                    name="sendMessageText"
                    id="sendMessageText"
                    v-model="sendMessageText"
                    :placeholder="!$store.state.logCheck?'ログインしてください':''"
                    class="writeMessage" 
                    :disabled="!$store.state.logCheck"/>
                <button type="submit" :class="sendMessageText?'writeMessageButton able':'writeMessageButton disable'">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
            </form>
        </footer>
    </div>
</template>

<script>
import { databaseRef } from '/src/main'
import firebase from "firebase/app"
import "firebase/auth"

export default {
    data(){
        return {
            nickname: null,
            sendMessageText: "",
            messages: [],
            data:null,
            watchFlag:false,
            dateList:[],
            absoluteDateList:[],
        }
        },

    methods: {
        dDight(num){
                return ('0'+num).slice(-2)
        },
        exDate(num){
                return new Date(num)
        },
        exMD(num){
            const year = new Date(num).getFullYear().toString();
            const month = (new Date(num).getMonth()+1).toString();
            const date = new Date(num).getDate().toString();
            return year+"/"+month+"/"+date
        },
        sendMessage(){
            const time = new Date().getTime();

            const messageRef = databaseRef.database().ref('messages');
            const message = {
                            uid:this.$store.state.uid,
                            nickName: this.nickname,
                            messageTime: time,
                            content: this.sendMessageText
            };
            messageRef.push({message});

            this.sendMessageText = ""
            },
        scrollH(){
        //   console.log(this.$refs.box.offsetTop);
        //   console.log(document.documentElement.scrollTop);
          if(this.dateList.length===1){
              this.dateList[0].style.position="fixed";
              this.dateList[0].style.top=this.$refs.box.offsetTop+10+"px"
              this.dateList[0].style.left="calc(50% - "+ this.dateList[0].offsetWidth +"px/2)";
            //   console.log('moving + 0')
          }else if(document.documentElement.scrollTop < (this.absoluteDateList[this.absoluteDateList.length-1].offsetTop-this.$refs.box.offsetTop)){
             for(let i=0; i < this.dateList.length-1; i++){
                 if(document.documentElement.scrollTop+this.$refs.box.offsetTop>this.absoluteDateList[i].offsetTop && 
                    document.documentElement.scrollTop < (this.absoluteDateList[i+1].offsetTop-this.$refs.box.offsetTop-40)){
                        this.dateList[i].style.position="fixed";
                        this.dateList[i].style.top=this.$refs.box.offsetTop+10+"px"
                        this.dateList[i].style.left="calc(50% - "+ this.dateList[i].offsetWidth +"px/2)";
                        // console.log('moving '+i)
            }              
            else{
              this.dateList[i].style.position="static";
              this.dateList[i].style.left=="";
              this.dateList[i].style.top=""
            //   console.log("failed"+i);
              this.dateList[this.dateList.length-1].style.position="";
              this.dateList[this.dateList.length-1].style.top=""
              this.dateList[this.dateList.length-1].style.left="";
            //   console.log('cancel Last')
            }
          }
          }else if(document.documentElement.scrollTop > (this.absoluteDateList[this.absoluteDateList.length-1].offsetTop-this.$refs.box.offsetTop)){
              this.dateList[this.dateList.length-1].style.position="fixed";
              this.dateList[this.dateList.length-1].style.top=this.$refs.box.offsetTop+10+"px"
              this.dateList[this.dateList.length-1].style.left="calc(50% - "+ this.dateList[this.dateList.length-1].offsetWidth +"px/2)";
            //   console.log('moving Last')
          }
        }
    },     
    mounted(){
        this.nickname = this.$store.state.nickname;
         const messageRef = databaseRef.database().ref('messages');
         messageRef.on('value', every =>{
             const data = every.val();
             let messages = [];
             Object.keys(data).forEach(key => {
                messages.push({
                id: key,
                uid: data[key].message.uid,
                nickName: data[key].message.nickName,
                content: data[key].message.content,
                messageTime: data[key].message.messageTime
          });
        });
            this.messages = messages;
            this.data = data;
         });

        this.$refs.footSpace.style.height=this.$refs.footerRef.offsetHeight+10+'px'
        window.onscroll = this.scrollH;
        firebase.auth().onAuthStateChanged(user=> {
            if(user !== null){
                // console.log(user.displayName)
                this.nickname = user.displayName;
                }
        })
    },
    beforeUpdate(){
        this.dateList = [];
        this.absoluteDateList = [];
        
    },
    watch:{
        messages(){
            //to bottom
            if(this.watchFlag){
                this.$nextTick(() =>{
                    document.documentElement.scrollTop = this.$refs.box.scrollHeight})
            }else{ 
                this.watchFlag = !this.watchFlag
            }

        }
    }
    }

</script>

<style scoped>
.noneS{
    height: 10px
}
.allMessage{
    margin-left:auto;
    margin-right:auto;
    width: 100%;
    height: 80%;
    overflow-y: hidden;
    word-break: break-word;
    max-width: 1000px;
}
/* @supports (overflow-y: hidden) {
  @media screen and (max-device-width: 1024px) {
    .allMessage {
      overflow-y: overlay;
    }
  }
}
.allMessage:hover{
    overflow-y: overlay;
} */
/* ::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    display:none;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(158, 158, 158, 0.5);
  border-radius: 10px;
  box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
} */
.message{
    margin: 2vh 3vh 0 3vh;    
} 
.nickname, .content{
    display: inline-flex;
    margin-bottom:2px
}
.nickname{
    font-size:small;
    font-weight: bold
}
.thisLogged{
    text-align:right;
}
.others{
    text-align: left;
} 
.messageTime{
    font-size: x-small;
    color: grey;
    font-weight: bold;
    margin: 0 5px
}
.messageDate{
    font-weight: bold;
    display:inline;
    border-radius: 30px;
    color:white;
    font-size: x-small ;
    background-color:grey;
    padding:2px 20px;
    letter-spacing: 0.1em
}
.spacer {
     width: 100%;
}
.content{
    font-size: 15px;
    background:lightgreen;
    padding: 5px 10px;
    max-width:65%;
    border-radius:10px;
    white-space: pre-wrap;
}
.contentAlign{
    text-align: left;
}
.writeMessage{
    border-radius: 10px 0px 0px 10px;
    border-width: 0.5px;
    border-color: rgb(214, 214, 214) transparent rgb(214, 214, 214) rgb(214, 214, 214);
    height: 60%;
    width: 70vw;
    font-size: 15px;
}
.writeMessageButton{
    border-style: solid;
    border-radius: 0px 10px 10px 0px;
    border-width: 0.5px;
    border-color: rgb(214, 214, 214) rgb(214, 214, 214) rgb(214, 214, 214) transparent;

    font-size: 20px;
}
.disable{
    pointer-events: none;
    color:white
}
.able{
    background-color:rgb(132, 221, 132);
    color:white;
}
.writeMessage::placeholder{
    color:grey;
    font-weight: bold;
    text-align:center    
}
.sendMessageForm{
    display: inline-flex;
    max-width: 800px;
}
footer{
    border-radius: 10px 10px 0% 0%;
    background-color:rgb(240, 240, 240);
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content:center;
    align-items: center;
    position: -webkit-fixed;
    position: fixed;
    bottom:0;

}
</style>