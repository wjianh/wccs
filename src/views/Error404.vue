<template>
  <div id="errorDiv">
    <el-button id="backToFirstPage" type="primary" icon="el-icon-arrow-left" @click ="backToFirstPage">返回首页</el-button>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    methods: {
      backToFirstPage(){
        if (this.$route.query.goindex === 'true') {
          this.$router.push('/');
        } else {
          this.$router.back(-1);
        }
      }
    }
  }
</script>
<style>
  #errorDiv {
    position: fixed;
    background: url('../assets/error.gif') no-repeat center;
    background-size: cover;
  }

  #backToFirstPage {
    margin-top: 20px;
    margin-left: 20px;
    float: left;
  }
</style>