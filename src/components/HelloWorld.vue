<template>
  <div class="hello">
    <h1>{{ msg }} ({{nickName}})</h1>
    <div class="login" v-show="showLogin">
        <p>输入你的昵称</p>
        <input type="text" v-model="nickName"><button @click="enterRoom">进入聊天</button>
    </div>
    <div id="rooWrap">
        <ul>
          <li v-for="(item,index) in list" >
            <img src="../assets/user1.jpg" alt="">
            <p>{{item.name}} <span>{{item.time}}</span></p>
            <div class="message">{{item.msg}}</div>

          </li>
        </ul>
    </div>


    <input type="text" v-model="textMes">
    <button @click="sendMessageToServer">发送</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to room',
      blogList:[],
      textMes:'',
      list:[],
      nickName:'',
      showLogin:true,
    }
  },
  methods:{
     getlist(){
       this.$store.dispatch("getApplist").then(res => {
            console.log(res);
        });

     },
     sendMessageToServer(){
       let nowTime=new Date();
       let message={
         name:this.nickName,
         msg:this.textMes,
         time:`${nowTime.getHours()}:${nowTime.getMinutes()}`
       }
       this.$socket.emit('chat',message);
     },
     enterRoom(){
       if(!this.nickName){
         alert('请输入昵称');
       }else{
         this.showLogin=false;
       }
     }
   },
   created(){
     this.getlist();
     this.$options.sockets.res = (data) => {
            console.log('组件监听', data);
            const tmpData = {
                name:data.name,
                msg: data.msg,
                time: data.time
            }
            this.$data.list.push(tmpData);
      }
   },
   watch:{
     list(){
       console.log('jian');
       const wrapper=document.getElementById('rooWrap');
       this.$nextTick(()=>{
         console.log('gun');
         wrapper.scrollTop=wrapper.scrollHeight;
       })
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login{
    width: 500px;
    height: 700px;
    background: #ccc;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    margin: 0 auto;

}
#rooWrap{
  border:1px solid #333;
  width: 300px;
  height: 500px;
  margin: 0 auto;
}
img{
  width: 30px;
  height: 30px;
}
ul{
  width: 100%;

}
ul li{
    width:100%;
    text-align: left;
  }
ul li p{
  display: inline-block;
}
.message{
  margin-left: 30px;
}
</style>
