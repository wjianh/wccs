<template>
  <div style="height: 100%;" >
      <el-menu id="leftNavMain"
      class="el-menu-vertical"
        @open="handleOpen" 
        @close="handleClose"
        background-color="#304156"
        text-color="#f0f0f0"
        router
        :collapse="isCollapse"
        @select="handleSelect"
        active-text-color="#ffd04b" style="height: 100%;border: none;">
        <el-menu-item @click="changeNavStaut" index="" style="background-color: #304156;">
          <i :class="{ 'el-icon-d-arrow-right':isCollapse==true,'el-icon-d-arrow-left':isCollapse==false}" style="color: seashell; font-size: x-large;"></i>
        </el-menu-item>
        <el-submenu v-for="item in menuList" :key="item.gnbh" v-if="item.children" :index="item.gnbh">
          <template slot="title">
            <i class="item.gnicon"></i>
            <span>{{item.gnmc}}</span>
          </template>
        <i class="item.gnicon"></i>          
        <el-menu-item v-for="child in item.children" :key="child.gnbh" :index="'/home'+item.gnljdz+child.gnljdz">
          {{ child.gnmc }}
        </el-menu-item>           
        </el-submenu>
        <i class="item.gnicon"></i>          
        <el-menu-item   v-for="item in menuList" :index="'/home'+item.gnljdz" :key="item.gnbh"  v-if="!item.children">
          {{ item.gnmc }}
        </el-menu-item> 
      </el-menu>      
  </div>
  
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: true,
        menuList: [],
        leftNavWidth: '',
      };
    },
    methods: {
      changeNavStaut(){
        this.collapseBtnClick = this.isCollapse;
        this.isCollapse = !this.isCollapse;
      },
      handleOpen(key, keyPath) {//菜单选项打开时调用
      },
      handleClose(key, keyPath) {//菜单关闭时调用
      },
      handleSelect(key, keyPath){//菜单点击时调用
        
      },
    },
    // computed: {
      
    // },
    mounted() {
      this.menuList=this.$store.state.xtglStore.xtMenuList;
      if(this.$store.state.xtglStore.xtMenuList.length == 0){
        const response = this.$store.dispatch("getMenuItem");//调用store 里面的getMenu方法返回一个promise对象
          response.then(res => {
            if(res.data[0]){
              this.menuList = res.data[0];
            }
        });
      }else{
        this.menuList=this.$store.state.xtglStore.xtMenuList;
      }
    },
}

  window.onload=function(){
  }
</script>
<style>
   .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
</style>