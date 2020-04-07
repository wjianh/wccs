<template>
  <div>
    <div class="top">
      <ul>
        <li><a href="#none" class="hover">系统主页</a></li>
        <li><a href="#none">账号注册</a></li>
        <li><a href="#none">合格成绩公示</a></li>
        <li><a href="#none">报名流程</a></li>
        <li><a href="#none">常见问题</a></li>
        <li><a href="#none">返回首页</a></li>
      </ul>
    </div>
    
    <div class="main">
      <div class="denglu">
        <div class="text" style="font-size:13px;"><strong>重要提示：</strong><br />
          一、考生登录本系统可查看考试结果，还可查看并保存电子合格证书。<br />
          二、国网系统外考生可申请邮寄合格证书，付款一周后在“网银交费”页面可查看邮寄状态及快递单号。<br />
        <font color="red">三、2014年2月24日后不再每日邮寄一次，将改成每两周邮寄一次，整体邮寄工作截止到5月15日。</font></div>
        <div class="dlk" style="padding-left: 10px;">
          <el-form
            autocomplete="on"
            :model="loginForm"
            label-position="left"
            ref="loginForm"
          > 
          <table width="292"  cellpadding="0" cellspacing="0">
            <tr>
              <td height="76" colspan="3"></td>
            </tr>
            <tr>
              <td style="height:30px;font-size:14px;"><i class="el-icon-user" style="font-size: large;"></i></td>
              <td colspan="2" style="height:30px;">
                <el-input  v-model="loginForm.username" placeholder="请输入账号"></el-input>
              </td>
            </tr>
            <tr>
              <td height="16" colspan="3"></td>
            </tr>
            <tr>
              <td width="65" style="font-size:14px;"><i class="el-icon-lock" style="font-size: large;"></i></td>
              <td colspan="2">
               <el-input  v-model="loginForm.password" placeholder="请输入密码"></el-input>
              </td>
            </tr>
            <tr>
              <td height="16" colspan="3"></td>
            </tr>
            <tr>
              <td><i class="el-icon-s-check" style="font-size: large;"></i></td>
              <td width="100"><el-input v-model="loginForm.check" placeholder="请输入验证码" maxlength="4"></el-input></td>
              <td width="127"><img :src="imgurl" height="27" @click="changeImage()"/></td>
            </tr>
            <tr>
              <td height="16" colspan="3"></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><el-button :loading="loading" style="width: 100%;" type="primary" @click="handleLogin('loginForm')">登陆</el-button></td>
              <td style="text-align: right;"><el-button @click="resetForm('loginForm')">重置</el-button></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td colspan="2"><table width="224" cellspacing="0" cellpadding="0">
                <tr>
                  <td height="24"><a href="#none" class="mm">忘记登录密码？</a></td>
                  <td align="right"></td>
                </tr>
              </table></td>
            </tr>
          </table>
          </el-form>
        </div>
      </div>
    </div>
    <div>
      <FooterNav></FooterNav>
    </div>
  </div>
</template>

<script>
  import aes from '../../utils/aseutil.js';
  export default {
    name:'login',
    data() {
      return {
        loading: false,
        imgurl: '/xtgly/getimage?',
        loginForm: {
          username: '',
          password: '',
          check: '', 
        },
      }
    },
    components: {
      FooterNav: () => import('../../components/Footer.vue'),
    },
    methods: {
      changeImage(){
        this.imgurl="/xtgly/getimage?"+Math.random();
      },
      resetForm(loginForm) {
        this.loginForm.username="";
        this.loginForm.password="";
        this.loginForm.check="";
      },
      test(res){
        console.log(res);
      },
      handleLogin(loginForm) {
        console.log("开始登陆");
        if(this.loginForm.username === "" || this.loginForm.password === ""){//判断用户名和密码是否为空
          this.$message({
          showClose: true,
          message: '用户名和密码不能为空！',
          type: 'warning'
        });
        }else{//判断验证码是否为空？
          if(this.loginForm.check ===""){
            this.$message({
              showClose: true,
              message: '验证码不能为空！',
              type: 'warning'
            });
          }else{
			      this.loading = true;
            //调用vuex里面actions的login方法然后调用配置号的axios去发送请求
            const password = aes.encrypt(this.loginForm.password.trim());//调用aes加密
            //console.log(password);
            const username = this.loginForm.username.trim();
            
            const yzm = this.loginForm.check;
            const response = this.$store.dispatch("Login", {username,password,yzm});
            //console.log(response);
            response.then(res => {
              const data = res.data;
              const glybh = res.data.glybh;
              const zzbm = res.data.zzbm;
              this.loading = false;
              if (res.data.code === "200") {//登陆成功后在进行设置更新token，和isLogin,
                this.$store.commit('SET_ISLOGIN',"1");//调用vuex的mutations改变isLogin状态
                this.$store.commit('SET_TOKEN',data.token); //提交一个 mutation，通知状态改变
                this.$store.commit('SET_NAME',{"username":username,"glybh":glybh,"zzbm":zzbm});
                
                this.$message({
                  showClose: true,
                  message: '登陆成功！正跳转主页面',
                  type: 'success'
                });
                if(window.sessionStorage.getItem("isLogin") && this.$store.state.userStore.isLogin){
                  this.$router.push({
                    path: "/home",
                  });
                }
              } else {
                this.imgurl=this.imgurl+Math.random();
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
            
          }
        }
      },
    }
  }
  
</script>

<style scoped>
  @import "../../assets/login/style.css";
</style>