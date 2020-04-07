<template>
  <el-select v-model="jsbh" placeholder="请输入角色编号" @change="handleSelect" style="width: 150px;">
    <el-option label="总管理员" value="1"></el-option>
    <el-option label="省管理员" value="2"></el-option>
    <el-option label="市管理员" value="3"></el-option>
    <el-option label="区管理员" value="4"></el-option>
    <el-option label="县管理员" value="5"></el-option>
    <el-option label="镇管理员" value="6"></el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      fatherData: {
        type: String,
        immediate: true,
      }
    },
    data(){
      return{
        jsbh: '',
      }
    },
    methods: {
      handleSelect(jsbh){
        this.$emit("chooseJsbh", jsbh);//传参给父组件
      },
    },
    watch: {
      jsbh(newValue, oldValue){
        if(oldValue != newValue){
          this.jsbh = newValue;
        }
      },
      fatherData(newValue,oldValue){
        this.jsbh = newValue;
      },
    }
  }
</script>
