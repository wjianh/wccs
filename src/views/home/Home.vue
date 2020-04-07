<template>
  <div class="home" style="position: fixed; height: 100%; width: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="240px;height:100%;">
      <div style="height: 100%;">
          <LeftNav/>
      </div>
      </el-aside>
      <el-container style="height: 100%;">
        <el-header style="padding: 0px;">
          <div id="nav_top">
            <TopNav/>
          </div>
        </el-header>
        <div>
          <Breadcrumb></Breadcrumb>
        </div>
        <el-main style="height: auto; padding: 0px;">
          <div style="padding: 10px;">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import LeftNav from '../../components/LeftNav';//引入侧边导航栏
  import TopNav from '../../components/TopNav.vue';//引入顶部导航栏
  import Footer from '../../components/Footer.vue';//引入脚页
  import Breadcrumb from '../../components/Breadcrumb.vue';//引入面包屑模块
  export default {
    data() {
      return {
        message1: 'fjadfasdfa',
        activeIndex: '1',
        activeIndex2: '1',
        todos:[],
      }
    },
    components: {
      LeftNav,
      TopNav,
      Footer,
      Breadcrumb,
    },
    methods: {
      
    },
    created(){
      
    },
    mounted() {
      
      // const a = axios.get("http://jsonplaceholder.typicode.com/todos/10").then(res=>{
      //   console.log(a.json());
        
      // });
      // fetch("http://jsonplaceholder.typicode.com/todos").then(res => {
      //   return res.json();
      // }).then(tods=>{
      //   this.todos=tods;
      // });
      },
  }
  window.onload = function(){
    
  }

</script>
<style scoped>

  .el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(238, 241, 246);
    color: #333;
    text-align: center;
    overflow-y: auto;
  }
  
  .el-main {
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>