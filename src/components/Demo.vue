<template>

  <div >
    <p>{{ userinfo.account}}</p>
    <button v-on:click="reverseMessage">逆转消息</button>
    <button @click="test">get请求</button>
    <br/>
    <div id="app-3">
    <p v-if="seen">现在你看到我了</p>
    </div>
    <div id="app-4">
      <ol>
        <li v-for="todo in todos">
          {{ todo.text }}
        </li>
      </ol>
    </div>

  </div>
</template>

<script>





    export default {
        name: "demo",

        data() {
            return{
              message: 'Hello Vue.js!',
              seen: true,
              todos: [
                { text: '学习 JavaScript' },
                { text: '学习 Vue' },
                { text: '整个牛项目' }
              ],
              userinfo:{
                id:"",
                account:"",
                pwd:"",
                tel:"",
                addr:"",
                idcard:"",
                name:""
              }
          }
        },
        methods: {
          reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
          },
          test: function () {
            var that=this
            this.$http.get(this.HOST+'/Login',{
              params:{
                account:"abc",
                pwd:"123"
              },
            }).then(function(response){
                console.log(response);
                that.userinfo=response.data;

              }).catch(function(err){
                console.log(err);
              });

          }
        }


    }
</script>

<style scoped>
  p {
    color: #42b983;
    background: darkcyan;
  }
</style>
