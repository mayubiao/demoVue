<template>
  <el-container>
    <el-header>
      <el-row :gutter="2" class="header_right">

        <el-col :span="3">
          <div>
            <el-button type="primary" size="mini" @click="logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="1" class="header_left">
        <span>管理系统</span>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs type="border-card" style="width: 100%">

        <el-tab-pane label="用户管理">
          <el-table

            :data="userList"
            style="width: 100%">
            <el-table-column
              align="center"
              label="ID"
              width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="名称"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="权限"
              width="180">
              <template slot-scope="scope">

                <span v-if="scope.row.level===0">用户</span>
                <span v-if="scope.row.level===-1">游客</span>
                <span v-if="scope.row.level===2">管理员</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="240">
              <template slot-scope="scope">
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="userDelete(scope.row.id, scope.row)">删除
                </el-button>
                <el-button
                  v-show="scope.row.level===-1"
                  icon="el-icon-check"
                  size="mini"
                  type="success"
                  @click="annDelete(scope.row.id, scope.row)">通过认证</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div/>
          <el-button
            class="el-bottom_btn"
            size="mini"
            type="primary"
            @click="dialogAddUser=true">添加用户
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="公告管理">
          <el-table

            :data="annList"
            style="width: 100%">
            <el-table-column
              align="center"
              label="ID"
              width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="标题"
              width="300">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.title
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="内容"
              width="300">
              <template slot-scope="scope">
                <span>{{ scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="发布时间"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.date}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="annDelete(scope.row.id, scope.row)">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
          <div/>
          <el-button
            class="el-bottom_btn"
            size="mini"
            type="primary"
            @click="dialogAddAnn=true">添加公告
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="发布管理">
          <el-table

            :data="sjList"
            style="width: 100%">
            <el-table-column
              align="center"
              label="ID"
              width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.sjid }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="标题"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.title
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="回收价(元)"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="图片"
              width="100">
              <template slot-scope="scope">
                <img :src="scope.row.pic" width="100">
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="sjDelete(scope.row.sjid, scope.row)">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
          <div/>
          <el-button
            class="el-bottom_btn"
            size="mini"
            type="primary"
            @click="dialogAddSj=true">添加发布
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="订单管理">
          <el-table

            :data="orderList"
            style="width: 100%">
            <el-table-column
              align="center"
              label="ID"
              width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.oid }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="标题"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.sjBean.title
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="系统"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.xt
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="内存"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.neicun
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="型号"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.xinghao
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="颜色"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.yanse
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="屏幕外观"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.pingmuwaiguang
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="机身外观"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.jishenwaiguang
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="摄像头"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.shexiangtou
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="维修史"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.weixiushi
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="订单状态"
              width="180">
              <template slot-scope="scope">
                  <span>{{
                    scope.row.status
                    }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="报价(元)"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.baojia}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->

                <el-button
                  v-show="scope.row.status==='待报价'"
                  size="mini"
                  type="primary"
                  @click="baojiaform.id=scope.row.oid,dialogBj=true">报价</el-button>
                <el-button
                  v-show="scope.row.status==='待验收'"
                  size="mini"
                  type="primary"
                  @click="setwc(scope.row.oid)">完成</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div/>

        </el-tab-pane>
      </el-tabs>

    </el-main>
    <el-dialog title="添加用户" :visible.sync="dialogAddUser" class="addUserdialog" center width="30%">
      <el-form :model="userform">
        <el-form-item label="账号 : " :label-width="formLabelWidth">
          <el-input v-model="userform.account" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
        <el-form-item label="密码 : " :label-width="formLabelWidth">
          <el-input v-model="userform.pwd" auto-complete="off" type="password" class="userinput"></el-input>
        </el-form-item>
        <!--<div>-->
        <el-form-item class="flex-center">
          <el-radio-group v-model="rd_group">
            <el-radio :label="1">用户</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--</div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加公告" :visible.sync="dialogAddAnn" class="addUserdialog" center width="50%">
      <el-form :model="annform">
        <el-form-item label="标题 : " :label-width="240">
          <el-input v-model="annform.title" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
        <el-form-item label="内容 : " :label-width="240">
          <el-input v-model="annform.content" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddAnn = false">取 消</el-button>
        <el-button type="primary" @click="addAnn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加发布" :visible.sync="dialogAddSj" class="addUserdialog" center width="50%">
      <el-form :model="sjform">
        <el-form-item label="标题 : " :label-width="240">
          <el-input v-model="sjform.title" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
        <el-form-item label="回收价 : " :label-width="240">
          <el-input v-model="sjform.price" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
        <el-form-item label="图片链接 : " :label-width="240">
          <el-input v-model="sjform.pic" auto-complete="off" class="userinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddSj = false">取 消</el-button>
        <el-button type="primary" @click="addSj">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="报价" :visible.sync="dialogBj" class="addUserdialog" center width="50%">
      <el-form :model="baojiaform">

        <el-form-item label="回收价 : " :label-width="240">
          <el-input v-model="baojiaform.price" auto-complete="off" class="userinput"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBj = false">取 消</el-button>
        <el-button type="primary" @click="setbj">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import Qs from 'qs'

  export default {
    data() {
      return {
        rd_group: 1,
        userList: [],
        annList: [],
        sjList:[],
        orderList:[],
        dialogAddAnn: false,
        dialogAddUser: false,
        dialogAddSj: false,
        dialogBj: false,
        formLabelWidth: '120px',

        userform: {
          pwd: "",
          account: ""
        },
        sjform:{
          title:"",
          pic:"",
          price:""

        },
        annform: {
          title: "",
          content: ""
        },
        baojiaform: {
          price: "",
          id: ""
        }
      }
    },
    mounted() {
      this.initUsers()
      this.initAnn()
      this.initsj()
      this.initorder()

    },
    methods: {
      userDelete(index, row) {
        var that = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.HOST + '/delUser', Qs.stringify({
            id: index,
          })).then(function (response) {
            console.log(response);
            that.initUsers()
          }).catch(function (err) {
            console.log(err);
          });

        }).catch(() => {

        });
      },
      annDelete(index, row) {
        var that = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.HOST + '/delAnn', Qs.stringify({
            id: index,
          })).then(function (response) {
            console.log(response);
            that.initAnn()
          }).catch(function (err) {
            console.log(err);
          });

        }).catch(() => {

        });
      },
      sjDelete(index, row) {
        var that = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.HOST + '/delsj', Qs.stringify({
            id: index,
          })).then(function (response) {
            console.log(response);
            that.initsj()
          }).catch(function (err) {
            console.log(err);
          });

        }).catch(() => {

        });
      },

      initAnn() {
        var that = this
        this.$http.post(this.HOST + '/getAnnList', {}).then(function (response) {
          that.annList = response.data
          console.log(that.annList)
        }).catch(function (err) {
          console.log(err);
        });
      },
      initsj() {
        var that = this
        this.$http.post(this.HOST + '/getSjList', {}).then(function (response) {
          that.sjList = response.data
        }).catch(function (err) {
          console.log(err);
        });
      },
      initorder() {
        var that = this
        this.$http.post(this.HOST + '/getOrderList', {}).then(function (response) {
          that.orderList = response.data
        }).catch(function (err) {
          console.log(err);
        });
      },

      initUsers() {
        var that = this
        this.$http.post(this.HOST + '/getAllUser', {}).then(function (response) {
          that.userList = response.data
          console.log(that.userList)
        }).catch(function (err) {
          console.log(err);
        });
      },

      addUser() {
        var that = this
        this.dialogAddUser = false
        var level = 0;
        if (that.rd_group == '1') {
          level = 0
        } else if (that.rd_group == '2') {
          level = 2
        }
        this.$http.post(this.HOST + '/register', Qs.stringify({
          account: this.userform.account,
          password: this.userform.pwd,
          level: level

        })).then(function (response) {
          that.initUsers()
        }).catch(function (err) {

        });
      },

      addAnn() {
        var that = this
        this.dialogAddAnn = false
        this.$http.post(this.HOST + '/addAnn', Qs.stringify({
          title: this.annform.title,
          content: this.annform.content,
        })).then(function (response) {
          that.initAnn()
        }).catch(function (err) {

        });
      },
      addSj() {
        var that = this
        this.dialogAddSj = false
        this.$http.post(this.HOST + '/addSj', Qs.stringify({
          title: this.sjform.title,
          pic: this.sjform.pic,
          price: this.sjform.price,
        })).then(function (response) {
          that.initsj()
        }).catch(function (err) {

        });
      },
      setbj() {
        var that = this
        this.dialogBj = false
        this.$http.post(this.HOST + '/setBj', Qs.stringify({
          id: this.baojiaform.id,
          price: this.baojiaform.price,
        })).then(function (response) {
          that.initorder()
        }).catch(function (err) {

        });
      },
      setwc(index) {
        var that = this
        this.$http.post(this.HOST + '/setOrderStatus', Qs.stringify({
          id: index,
          status:"已完成"
        })).then(function (response) {
          that.initorder()
        }).catch(function (err) {

        });
      },
      logout() {
        this.$router.push({name: "Login"});
      }
    },

  }
</script>

<style scoped>

  .el-header {
    background-color: #409eff;
    color: white;
    line-height: 60px;
    box-shadow: 0px 1px 5px #888888;
  }

  .el-bottom_btn {
    float: left;
    margin-top: 10px;

  }

  .el-tabs {
    margin: -10px;

  }

  .el-adduser {
    float: left;
    margin-top: 10px;
  }

  .addUserdialog {

  }

  .userinput {
    width: 80%;

  }

  .dialog-footer {
  }

  .header_right {
    float: right;
  }

  .header_left {
    float: left;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
