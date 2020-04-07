<template>
  <el-container>
    <el-header style="border-bottom: 1px solid rgb(128, 120, 120); height: auto;padding-left: 0px;padding-right: 0px;">
      <el-collapse>
        <el-collapse-item title="查询条件操作">
          <div>
            <el-form :inline="true" :model="formXtgly" class="demo-form-inline">
              <el-form-item label="单位组织">
                <SelectTree v-on:choseZzbm="selectZz"></SelectTree>
              </el-form-item>
              <el-form-item label="管理员编号">
                <el-input v-model="formXtgly.glybh" placeholder="管理员编号" style="width: 150px;"></el-input>
              </el-form-item>
              <el-form-item label="角色编号">
                <JsbhSelect :fatherData="formXtgly.jsbh" v-on:chooseJsbh="closeJsbhSelect"></JsbhSelect>
              </el-form-item>
              <el-form-item label="管理员名称">
                <el-input v-model="formXtgly.glymc" placeholder="管理员名称" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item label="管理员登陆账号">
                <el-input v-model="formXtgly.dlzh" placeholder="管理员登陆账号" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item label="管理员状态">
                <el-input v-model="formXtgly.glyzt" placeholder="管理员状态" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询管理员</el-button>
                <el-button type="primary" @click="addXtgly">添加管理员</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-header>
    <el-main style="padding-left: 0px; padding-right: 0px; border: 1px solid #eee">
      <div>
        <el-popconfirm
          @onConfirm="delCheckXtglys"
          title="确定删除选中吗？" v-if="checkXtglyList.length > 0">
          <el-button slot="reference" type="danger" style="float: left; height: 30px; padding: 2px;" v-if="checkXtglyList.length > 0">删除选中</el-button>
        </el-popconfirm>
        <el-button type="primary" @click="resetGlyPassword" style="float: left; height: 30px; padding: 2px;" v-if="checkXtglyList.length > 0">重置密码</el-button>
        
        <el-table
        :default-sort = "{
          prop: 'jsbh', 
          order: 'ascending'
        }"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :row-class-name="tableRowClassName"
        :data="xtglyDataList"
        height= "400"
        @select="checkRows"
        @select-all="checkAll"
        style="width: 100%; overflow: auto;">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          type= "index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="glybh"
          label="管理员编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="glymc"
          label="管理员名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zzbm"
          :formatter="formatter"
          label="组织名称">
        </el-table-column>
        <el-table-column
          width="100"
          sortable
          prop="jsbh"
          label="角色编号">
        </el-table-column>
        <el-table-column
          width="150"
          prop="glylxfs"
          label="联系方式">
        </el-table-column>
        <el-table-column
          width="120"
          prop="dlzh"
          label="登陆账号">
        </el-table-column>
        <el-table-column
          width="100"
          :formatter="formatDmzt"
          prop="glyzt"
          label="管理员状态">
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="rowEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm 
              @onConfirm="delCheckXtgly(scope.$index, scope.row)"
              title="这是一段内容确定删除吗？">
              <el-button
              slot="reference"
              size="mini"
              type="danger"
              plain>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer style="margin-top: 10px;">
      <Pagenation :pageFaData = "pageData" v-on:changeSize="changeSizeFa"></Pagenation>
    </el-footer>
    <el-dialog :before-close="handleClose" title="编辑管理员" :visible.sync="dialogFormVisible" :modal-append-to-body='false' center>
      <el-form :inline="true" ref="xtglyEditForm" :rules = "rules" :model="formData" style="text-align: center;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="zzbm" label="单位组织" :label-width="formLabelWidth">
              <SelectTree :selectFaData = "childZzmc" v-on:choseZzbm="selectZz"></SelectTree>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="glybh" label="管理员编号"  :label-width="formLabelWidth">
              <el-input v-model="formData.glybh" :disabled="editInput" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="glymc" label="管理员名称" :label-width="formLabelWidth">
              <el-input :disabled = true v-model="formData.glymc" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="jsbh" label="角色编号" :label-width="formLabelWidth">
              <JsbhSelect :fatherData="popJsbh" v-on:chooseJsbh="closeJsbhSelect"></JsbhSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="dlzh" label="管理员登陆账号" :label-width="formLabelWidth">
              <el-input v-model="formData.dlzh" :disabled="editInput"  autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可登陆失败次数" :label-width="formLabelWidth">
              <el-input type="number" v-model="formData.kydlsbcs" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span = "12">
            <el-form-item prop="glyzt" label="管理员状态">
              <el-select v-model="formData.glyzt" placeholder="管理员状态" style="width: 150px;">
                <el-option label="在用" value="1"></el-option>
                <el-option label="锁定" value="2"></el-option>
                <el-option label="停用" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input :disabled=true v-model="formData.glylxfs" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitXtgly">提交后台</el-button>
              <el-button @click="dialogFormVisible = false">取消提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
      
  </el-container>
  
</template>

<script>

import aes from '@/utils/aseutil.js'; 
import {message} from '@/utils/message.js'
  export default {
    data() {
      return {
        order: '',//打开弹出框的命令，add为添加管理员，update为更新管理员
        editInput: false,//默认可以编辑输入框
        formLabelWidth: '120px',
        dialogFormVisible: false,//默认不显示弹出框
        xtglyDataList:[],//查询出来的管理员列表
        childZzmc: '',//父组件传给弹出框的组织名称
        popJsbh: '',//弹出框传给子组件jsbhSelect的参数
        pageData:{//分页初始分页信息
          pageSize: 10,
          pageSizes: [10,20,50,100],
          total: 0,
        },
        formXtgly: {//查询管理员的formdata,分页查询
          zzbm: '',
          glybh: '',
          jsbh: '',
          glymc: '',
          dlzh: '',
          glyzt: '',
          size: 10,
          start: 1,
        },
        formData: {//查看/更新管理员的form data
          glybh: '',
          glymc: '',
          jsbh: '',
          dlzh: '',
          glyzt: '',
          zzbm: '',
          glylxfs: '',
          kydlsbcs: '',
        },
        checkXtglyList: [],//被选中的系统管理员集合
        rules:{//表单的验证规则
          glybh :[{required: true, message: '请输入管理编号', trigger: 'blur'}],
          zzbm :[{required: true, message: '请选择所属组织', trigger: 'blur'}],
          jsbh :[{required: true, message: '请选择管理员角色', trigger: 'blur'}],
          dlzh :[{required: true, message: '请输入登陆账户', trigger: 'blur'}],
          glyzt: [{required: true, message: '请选择管理员状态', trigger: 'blur'}]
        },
      }
    },
    components: {
      Pagenation: () => import('../../components/Pagenation'),
      SelectTree: () => import('../../components/SelectTree.vue'),
      JsbhSelect: () => import('../../components/JsbhSelect.vue'),
    },
    methods: {
      formatDmzt(row,column){
        if(row.dmzt == '1'){
          return "在用";
        }else if(row.dmzt == '2'){
          return "锁定";
        }else{
          return "停用";
        }
      },
      handleClose(done){//在关闭之前调用，清除缓存的zzbm,zzmc,jsbh
        this.popJsbh = '';
        this.childZzmc = '';
        this.formData.zzbm = '';
        this.formXtgly.zzbm = '';
        this.order = '';
        this.editInput = false;//回归默认能编辑
        done();
      },
      closeJsbhSelect(childJsbh){//角色编号选择器子组件传参给父组件方法
        this.formData.jsbh=childJsbh;
      },
      selectZz: function(childrenZz){//select框的选择调用函数
        this.formData.zzbm=childrenZz;
      },
      rowEdit(index, row){//点击右侧编辑按钮，弹出编辑界面
        this.order = 'update';
        let response = this.$store.dispatch("selectXtglyByPrimery", {"glybh":row.glybh,"zzbm":row.zzbm});
        response.then(res => {
          this.formData = res.data;
          let formatList = this.$store.state.xtglStore.formatObj.ZZLBDM;//获取加载号的代码格式化列表
          this.editInput = true;//不能编辑用户编号和用户组织编码
          this.popJsbh = res.data.jsbh;//赋值给子组件，然后子组件才能更新显示当前用户的角色编号
          let flag = false;
          formatList.forEach(item => {
            if(row.zzbm === item.dmbs){
              flag = true;
              this.childZzmc = item.dmmc;//赋值给子组件，然后子组件才能更新显示当前用户的单位名称
              return;
            }
          });
          if(flag == false){
            flag = true;
          }
          this.dialogFormVisible = true;//当数据请求完成后，把弹出框设置为显示
        }).catch(error => {
          message(true,error.message, "error");
        });
      },
      checkRows(selection,row){//选中一行，返回被选中行
        this.checkXtglyList = [];
        if(selection != undefined && selection.length != 0){
          selection.forEach(item =>{
            let xtglyObj = {
              glybh: item.glybh,
              zzbm: item.zzbm,
            }
            this.checkXtglyList.push(xtglyObj);
          });
        }
      },
      checkAll(selection){//选中全部
        this.checkXtglyList = [];
        if(selection != undefined && selection.length != 0){
          selection.forEach(item =>{
            let xtglyObj = {
              glybh: item.glybh,
              zzbm: item.zzbm,
            }
            this.checkXtglyList.push(xtglyObj);
          })
        }
      },
      tableRowClassName({row, rowIndex}) {//动态设置表格列的背景颜色，根据角色编号级别来设置颜色深浅
        switch(row.jsbh){
          case "1":
            return 'row-type1';
            break;
          case "2":
            return 'row-type2';
            break;
          case "3":
            return 'row-type3';
            break;
          case "4":
            return 'row-type4';
            break;
          case "5":
            return 'row-type5';
            break;
          case "6":
            return 'row-type6';
            break;
          default:
            return '';
            break;
        }
      },
      formatter(row, column) {//格式化组织名称
        let formatList = this.$store.state.xtglStore.formatObj.ZZLBDM;//获取加载号的代码格式化列表
        let zzmc = row.zzbm;
        formatList.forEach(item => {
          if(row.zzbm === item.dmbs){
            zzmc = item.dmmc;
          }
        });
        return zzmc;
      },
      changeSizeFa: function(childData){//分页子传父调用方法
        if(childData.pageSize){
          this.pageData.pageSize = childData.pageSize;
        }
        if(childData.currentPage){
          this.pageData.currentPage = childData.currentPage;
        }
        this.formXtgly.size = childData.pageSize;//设置formXtgly对象里面的size和start
        this.formXtgly.start = childData.currentPage;
        if(this.xtglyDataList.length != 0){//在还没有查询后不能触发
          const response = this.$store.dispatch("getXtgly",this.formXtgly);
          response.then(res => {
            this.pageData.total = res.data.total;
            this.xtglyDataList = res.data.xtglylist; 
          }).catch(error => {
            message(true,error.message, "error");
          });
        }
      },
      onSubmit() {//查询提交方法
        const response = this.$store.dispatch("getXtgly",this.formXtgly);
        response.then(res => {
          this.pageData.total = res.data.total;
          this.xtglyDataList = res.data.xtglylist; 
        }).catch(error => {
          message(true,error.message, "error");
        });
      },
      addXtgly() {//添加系统管理员的提交事件，先清空弹出框的数据，然后输入后在弹出
        this.order = 'add';
        this.editInput = false;
        this.formData.zzbm = '';
        this.formData.jsbh = '';
        //遍历对象然后清空对象中存的值
        Object.keys(this.formData).forEach(key => (this.formData[key] = ''));
        this.dialogFormVisible=true;
      },
      submitXtgly(){//提交管理员，看看提交前是要更新管理员还是要添加管理员
        this.$refs['xtglyEditForm'].validate((valid) => {
          if (!valid) {         
            message(true,"请输入必填项！", "error");
          }else{//通过验证后才能提交
            if(this.order === 'add'){//是点击添加，执行添加管理员操作
              this.$store.dispatch("addXtgly",this.formData).then(res => {
                message(true,res.data.message, res.data.type);
                if(res.data.type === 'success'){
                  this.onSubmit();
                }
                this.dialogFormVisible = false;
              }).catch(error => {
                message(true,error.message, "error");
              });
            }else if(this.order ==='update'){//点击更新，执行更新管理员操作
              this.$store.dispatch("updateXtgly",this.formData).then(res => {
                message(true,res.data.message, res.data.type);
                if(res.data.type === 'success'){
                  this.onSubmit();
                }
                this.dialogFormVisible = false;
              }).catch(error => {
                message(true,error.message, "error");
              });
            }
          }
        });
      },
      delCheckXtgly(index, row){
        let removeData = {
          glybh: row.glybh,
          zzbm: row.zzbm,
        }
        this.$store.dispatch('removeXtgly',removeData).then(res => {
          message(true,res.data.message, res.data.type);
          if(res.data.type=="success"){
            this.onSubmit();
          }
        }).catch(error => {
          message(true,error.message, "error");
        });
      },
      delCheckXtglys(){//删除选中的管理员
        console.log(this.checkXtglyList);
        if(this.checkXtglyList.length != 0){
          this.$store.dispatch("delCheckXtglys",this.checkXtglyList).then(res=>{
              message(true,res.data.message, res.data.type);
              if(res.data.type === 'success'){
                this.onSubmit();
              }
          }).catch(error => {
            message(true,error.message, "error");
          });
        }else{
          message(true,"选中的list为空！", "error");
        }
      },
      resetGlyPassword(){//重置管理员密码
        this.$store.dispatch("resetGlyPassword", this.checkXtglyList).then(res => {
          message(true,res.data.message,res.data.type);
        }).catch(error => {
          message(true,error.message,"error");
        });
      },
    },
    watch: {
      popJsbh(newValue, oldValue){
        if(newValue != oldValue){
          this.popJsbh = newValue;
        }
      }
    }
    
  }
</script>
<style>
  .el-form.demo-form-inline.el-form--inline {
    padding-top: 10px;
  }
  .el-collapse-item__content{
    padding-bottom: 0px;
  }
  .el-collapse-item__header{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: medium;
    padding-left: 20px;
    background-color: rgb(237, 249, 250);
  }
  .el-table .row-type1 {
    background: #ff0101a6;
  }

  .el-table .row-type2 {
    background: rgba(253, 82, 52, 0.650);
  }
  .el-table .row-type3 {
    background: rgba(245, 114, 63, 0.650);
  }
  .el-table .row-type4 {
    background: rgba(250, 176, 66, 0.650);
  }
  .el-table .row-type5 {
    background: rgba(228, 247, 62, 0.65);
  }
  .el-table .row-type6 {
    background: rgba(165, 236, 127, 0.650);
  }

  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    min-width: 900px;
    max-width:calc(100% - 30px);
    max-height:calc(100% - 30px);
    /* max-width:calc(100% - 10px); */
}
.el-dialog .el-dialog__body{
  flex:1;
  overflow: auto;
}
</style>