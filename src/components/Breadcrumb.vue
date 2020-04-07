<template>
  <div class="grid-content bg-purple-dark" style="padding: 7px 0px; padding-left: 10px; border-bottom: solid 1px rgb(197, 192, 192);">
    <el-breadcrumb style="font-size: small;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(route, index) in routeList" :key="index" :to="route">{{route.name}} <i class="el-icon-error" @click="closeMbx(index)"></i></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data(){
        return {
          routeList: this.$store.state.xtglStore.mbxRouteList,
        }
    },
    methods: {
      closeMbx(index){
        if(index === 0){//说明是第一个路由，那么直接删除，如果后面一个还存在，那么跳转后面一个路由，否则跳转home
          if(this.routeList.length > 1){//说明列表里面还存在两个以上的路由
            this.$router.push({//页面跳转到后一个页面
              path: this.routeList[index+1].path,
            });
          }
          else{//只剩下一个了，直接清空，然后跳转home界面
            this.$router.replace({//页面跳转到后一个页面
              path: '/home',
            });
          }
          this.routeList.splice(index,1);//点击右边的按钮后，从面包屑列表里面删除该路由
          this.$store.commit("SET_MBXROUTE",this.routeList);//更新store里面的面包屑路由列表
        }else{//那么是第二个或者第二个以上,肯定说明列表长度大于1
          this.$router.push({//页面跳转到前一个页面
            path: this.routeList[index-1].path,
          });
          this.routeList.splice(index,1);//点击右边的按钮后，从面包屑列表里面删除该路由
          this.$store.commit("SET_MBXROUTE",this.routeList);//更新store里面的面包屑路由列表
        }
      }
    },
    watch: {
      routeList(newValue, oldValue){
        if(this.routeList != newValue){
          this.routeList = newValue;
        }
      },
    }
  }
</script>
<style>
</style>