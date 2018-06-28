<template>
  <section>
    <el-row>
      <div class="tit" style="font-weight: 600;margin-bottom: 20px">当前角色名:<span>{{form.name}}</span></div>
    </el-row>
    <el-row>
      <el-col :span="11" style="margin-right: 15px">
        <div class="tit">用户列表</div>
        <div>
          <el-select class="tit" style="width:70%"
                     v-model="chooseUser"
                     multiple
                     filterable
                     remote
                     placeholder="请输入关键词添加"
                     :remote-method="remoteMethodUser"
                     :loading="loading">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="addUser">确定添加</el-button>
        </div>
        <el-table :data="tableDataUser" border style="width:100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="账户"></el-table-column>
          <el-table-column prop="fullName" label="全名"></el-table-column>
          <el-table-column prop="createdAt" label="创建日期"></el-table-column>
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="11" style="margin-left: 15px">
        <div class="tit">权限列表</div>
        <div>
          <el-select class="tit" style="width:70%"
                     v-model="chooseAu"
                     multiple
                     filterable
                     remote
                     placeholder="请输入关键词添加"
                     :remote-method="remoteMethodAu"
                     :loading="loading">
            <el-option
              v-for="item in auOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="addAu">确定添加</el-button>
        </div>
        <el-table :data="tableDataAu" border style="width:100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="权限名"></el-table-column>
          <el-table-column prop="conditions" label="条件"></el-table-column>
          <el-table-column prop="entity" label="操作对象"></el-table-column>
          <el-table-column prop="type" label="类型" width="80"></el-table-column>
          <el-table-column label="操作"  fixed="right" width="90">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteAu(scope.row)">删除权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        form:{
          name:''
        },
        tableDataUser:[],   // 用户
        tableDataAu:[],      // 权限
        userOptions: [],     // 用户选项
        chooseUser: [],      // 添加的用户
        list:[],
        auOptions:[],        // 权限选项
        chooseAu:[],         // 添加的权限
        loading:true,
//        loading:true,
      }
    },
    created(){
      const self = this;
      self.form.roleId =localStorage.getItem('roleId');
      self.$api.get('/role/'+self.form.roleId, null, r =>{        // 用户&权限
        console.log(r.data);
        if (r.code === 200) {
//          self.total = data.total;
          self.form.name = r.data.name;
          self.tableDataUser = r.data.users;    // 用户
          self.tableDataAu = r.data.rights;     // 权限
          for(let i = 0;i<self.tableDataUser.length;i++){
            let date =  self.tableDataUser[i].createdAt;
            self.tableDataUser[i].createdAt = self.getDate(date);
          }
          self.loading = false;
        }else{
          alert(r.message);
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      });
//      self.$api.get('/au', null, r =>{          // 权限
//        console.log(r.data);
//        if (r.code === 200) {
//          self.total = data.total;
//          self.tableDataAu = data.content;
//          console.log(self.tableDataAu);
//          for(let i = 0;i<self.tableDataAu.length;i++){
//            let date =  self.tableDataAu[i].createdAt;
//            self.tableDataAu[i].createdAt = self.getDate(date);
//          }
//          self.loading = false;
//        }
//      },res=>{
//        this.$router.push({
//          path: '/login',
//        });
//      })
    },
    methods:{
      remoteMethodUser(query) {          // 选择添加用户
        if (query !== '') {
          this.loading = true;
          const self = this;
          setTimeout(() => {
            self.$api.get('/user/keyword/'+ query, null, r =>{
              console.log(r.data);
              if (r.code === 200) {
                self.list = r.data.content;
                if(r.data.content.length !== 0){
                  for(let i=0; i<r.data.content.length;i++){
                    self.list[i].label = r.data.content[i].fullName;
                    self.list[i].value = r.data.content[i].id;
                    self.userOptions = self.list;
                  }
                }else{
                  self.userOptions = self.list;
                }
                this.loading = false;
//                console.log(self.userOptions);
              }else{
                alert(r.message);
              }
            },res=>{
              this.$router.push({
                path: '/login',
              });
            })
          }, 500);
        } else {
          this.userOptions = [];
        }
      },
      remoteMethodAu(query) {          // 选择权限
        if (query !== '') {
          this.loading = true;
          const self = this;
          setTimeout(() => {
            self.$api.get('/right/keyword/'+ query, null, r =>{
              console.log(r.data);
              if (r.code === 200) {
                self.list = r.data.content;
                if(r.data.content.length !== 0){
                  for(let i=0; i<r.data.content.length;i++){
                    self.list[i].label = r.data.content[i].name;
                    self.list[i].value = r.data.content[i].id;
                    self.auOptions = self.list;
                  }
                }else{
                  self.auOptions = self.list;
                }
//                console.log(self.auOptions);
                this.loading = false;
              }else{
                alert(r.message);
              }
            },res=>{
              this.$router.push({
                path: '/login',
              });
            })
          }, 500);
        } else {
          this.auOptions = [];
        }
      },
      addUser(){                     // 添加用户
        const self = this;
        console.log('要添加的是'+ self.chooseUser);
        let param={
          roleId:self.form.roleId,
          userIds:self.chooseUser
        };
        self.$api.post('/role/users', param, r =>{        // 用户
          console.log(r.data);
          if (r.code === 200) {
            self.$router.go(0);
            self.$message({
              message: "操作成功！",
              type: 'success'
            });
          }else{
            alert(r.message);
          }
        },res=>{
          this.$router.push({
            path: '/login',
          });
        })
      },
      addAu(){                      // 添加权限
        const self = this;
        console.log('要添加的是'+ self.chooseAu);
        let param={
          roleId:self.form.roleId,
          rightIds:self.chooseAu
        };
        self.$api.post('/role/rights', param, r =>{        // 权限
          if (r.code === 200) {
            self.$router.go(0);
            self.$message({
              message: "操作成功！",
              type: 'success'
            });
          }else{
            alert(r.message);
          }
        },res=>{
          this.$router.push({
            path: '/login',
          });
        })
      },
      deleteUser(row){    // 删除
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.form = Object.assign({}, row);
          console.log(self.form.id);
          self.form.roleId =localStorage.getItem('roleId');
          self.$api.delete('/role/user?roleId='+self.form.roleId+'&userId=' + self.form.id, null, r => {
            if (r.code === 200) {
              self.$router.go(0);
            } else {
              alert(r.message);
            }
          }, res => {
            this.$router.push({
              path: '/login',
            });
          })
        }).catch(() => {
        });
      },
      deleteAu(row){    // 删除
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.form = Object.assign({}, row);
          console.log(self.form.id);
          self.form.roleId =localStorage.getItem('roleId');
          self.$api.delete('/role/right?roleId='+self.form.roleId+'&rightId=' + self.form.id, null, r => {
            if (r.code === 200) {
              self.$router.go(0);
            } else {
              alert(r.message);
            }
          }, res => {
            this.$router.push({
              path: '/login',
            });
          })
        }).catch(() => {
        });
      },
      
    }
  }
</script>
