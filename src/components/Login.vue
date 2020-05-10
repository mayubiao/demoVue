<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登陆</span>
      </div>
      <div>
        <el-input v-model="account" placeholder="请输入账号" clearable></el-input>
      </div>
      <div>
        <el-input v-model="pwd" placeholder="请输入密码" clearable type="password"></el-input>
      </div>
      <div>
        <el-alert v-if="alert_err"
                  title=""
                  type="error"
                  :closable="false"
                  show-icon
        ><span>{{alert_err_msg}}</span>
        </el-alert>
      </div>
      <div>
        <el-button type="primary" v-on:click="login">登陆</el-button>
      </div>
    </el-card>
  </el-row>

</template>

<script>
  import Qs from 'qs'

  export default {
    name: "login",
    data() {
      return {
        account: "",
        pwd: "",
        id: "",
        alert_err: false,
        alert_err_msg: "",

      }
    },
    methods: {

      login: function () {
        var that = this
        if (this.account == "" || this.pwd == "") {
          this.alert_err = true
          this.alert_err_msg = "请输入账号或密码"
          return
        } else {
          this.alert_err = false
        }
        this.$http.post(this.HOST + '/adminLogin', Qs.stringify({
          account: this.account,
          password: this.pwd
        })).then(function (response) {
          console.log(response);
          if (response.data == "-1") {
            that.alert_err_msg = "账号或密码错误!"
            that.alert_err = true

          } else {
            that.$router.push({name: "Home"});
          }

        }).catch(function (err) {
          console.log(err);
        });

      }
    }
  }
</script>

<style scoped>

  .el-input {
    margin-bottom: 16px;
    width: 280px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-button {
    width: 280px;
    margin-top: 10px;
  }

  .el-alert {
    width: 280px;
    margin-left: 20px;
    margin-bottom: 5px;

  }

  .box-card {
    border-radius: 4px;
    width: 360px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -180px;
    margin-top: 150px
  }
</style>
