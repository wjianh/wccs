<template>
  <div id="nav_top">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
      background-color="#fff"
      text-color="#304156"
      active-text-color="#ffd04b"
      style="border-bottom: none; box-shadow: 0 1px 4px rgba(0,21,41,.08);">
      <el-menu-item index = "0">
        <div>
          <span>系统首页</span>
        </div>
      </el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-menu-item index="5">管理员</el-menu-item>
      <el-submenu index="6" style="margin-left: 26%;">
        <template slot="title">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span><i class="el-icon-arrow-right"></i>尊敬的{{username}}欢迎您</span>
        </template>
        <el-menu-item index="/aboutMe">关于我</el-menu-item>
        <el-menu-item index="/login">重新登陆</el-menu-item>
        <el-menu-item index="/login">退出登陆</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: this.$store.state.userStore.xtglyObj.username,
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key==="/login"){
          this.$options.methods.loginOut(this.$store,this.$router);
        }
        
      },
      loginOut(store,router){   // 退出登录
        //console.log(store);
        store.commit('RMV_TOKEN');    // 清除store里面的token信息
        alert("登出成功！")
      }
    },
    watch:{
      username(newValue, oldValue){
        if(newValue != oldValue){
          this.username = newValue;
        }
      }
    }
  }
</script>
<style scoped>

</style>