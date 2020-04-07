<template>
  <div id="aboutMe">
    <el-container>
      <el-header>管理员详情</el-header>
      <el-main>
        <el-form ref="xtglyForm" inline :model="xtglyForm" label-width="150px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="管理员名称">
                <el-input v-model="xtglyForm.glymc" :disabled=editAble></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员编号">
                <el-input v-model="xtglyForm.glybh" :disabled=true></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="所属组织">
                <el-input v-model="xtglyForm.zzbm" :disabled=true></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色编号">
                <el-input v-model="xtglyForm.jsbh" :disabled=true></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="职称">
                <el-input v-model="xtglyForm.glyzc" :disabled=editAble></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input v-model="xtglyForm.glylxfs" :disabled=editAble></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="出身日期">
                <el-date-picker
                  v-model="xtglyForm.glycsrq"
                  type="date"
                  :disabled=editAble
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登陆账号">
                <el-input :disabled=true v-model="xtglyForm.dlzh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="可登陆失败次数">
                <el-input type="number" v-model="xtglyForm.kydlsbcs" :disabled=true></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" :disabled=!editAble @click="edit">点击完善资料</el-button>
                <el-button type="primary" v-if="!editAble" @click="onSubmit">提交更改</el-button>
                <el-button @click="backToHome">返回主页</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {message} from '@/utils/message.js';
  export default {
    data(){
      return{
        editAble: true,
        xtglyForm: {
          glymc: '',
          glybh: '',
          zzbm: '',
          jsbh: '',
          glyzc: '',
          glylxfs: '',
          glycsrq: '',
          dlzh: '',
          kydlsbcs: '',
        }
      }
    },
    methods: {
      edit(){
        this.editAble = false;
      },
      onSubmit() {
        if(this.xtglyForm.glybh != '' && this.xtglyForm.zzbm !=''){
          this.$store.dispatch("updateXtglyData",this.xtglyForm).then(res => {
            message(true, res.data.message, res.data.type);
            if(res.data.type === "success"){
              this.editAble = true;
            }
          }).catch(error => {
            message(true, error.message, "error");
          });
        }else{
          message(true, "请输入组织编码和管理员编号！", "error");
        }
      },
      backToHome(){
        if (this.$route.query.goindex === 'true') {
          this.$router.push('/');
        } else {
          this.$router.back(-1);
        }
      }
    },
    mounted(){
      const glybh = this.$store.state.userStore.xtglyObj.glybh;
      const zzbm = this.$store.state.userStore.xtglyObj.zzbm;
      this.$store.dispatch("loadXtglyData",{"glybh": glybh,"zzbm": zzbm}).then(res => {
        this.xtglyForm.glybh = glybh;
        this.xtglyForm.zzbm = zzbm;
        this.xtglyForm.glymc = res.data.glymc;
        this.xtglyForm.jsbh = res.data.jsbh;
        this.xtglyForm.glyzc = res.data.glyzc;
        this.xtglyForm.glylxfs = res.data.glylxfs;
        this.xtglyForm.glycsrq = res.data.glycsrq;
        this.xtglyForm.dlzh = res.data.dlzh;
        this.xtglyForm.kydlsbcs = res.data.kydlsbcs;
      });
    }
    
  }
</script>
<style>
  #aboutMe {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    position: fixed;
    background-color: rgb(252, 252, 252);
  }
</style>