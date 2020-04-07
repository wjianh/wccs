<template>
  <el-container>
    <el-header style="border-bottom: 1px solid rgb(128, 120, 120); height: auto;padding-left: 0px;padding-right: 0px;">
      <el-collapse>
        <el-collapse-item title="查询条件操作">
          <div>
            <el-form :inline="true" :model="formXtdm" class="demo-form-inline">
              <el-form-item label="代码标识">
                <el-input v-model="formXtdm.dmbs" placeholder="代码标识" style="width: 150px;"></el-input>
              </el-form-item>
              <el-form-item label="代码名称">
                <el-input v-model="formXtdm.dmmc" placeholder="代码名称" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item label="代码分类编码">
                <el-input v-model="formXtdm.dmflbm" placeholder="代码分类编码" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item label="代码状态">
                <el-select v-model="formXtdm.dmzt" placeholder="代码状态" style="width: 150px;">
                  <el-option label="在用" value="1"></el-option>
                  <el-option label="停用" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="selectXtdm">查询系统代码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-header>
    <el-main style="padding-left: 0px; padding-right: 0px; border: 1px solid #eee">
      <div>
        <el-button type="danger" @click="delCheckXtdm" style="float: left; height: 30px; padding: 2px;" v-if="checkXtdmList.length != 0">删除选中</el-button>
        <el-button type="primary" @click="createXtdmChild" style="float: left; height: 30px; padding: 2px;" v-if="checkXtdmList.length == 1">创建节点</el-button>
        <el-table
        ref="multipleTable"
        :data="xtdmDataList"  
        :lazy=true
        :default-expand-all="false"
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        height= "400"
        row-key="dmbs"
        @select="checkRow"
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
          prop="dmbs"
          label="代码标识"
          width="150">
        </el-table-column>
        <el-table-column
          prop="dmmc"
          label="代码名称"
          width="200">
        </el-table-column>
        <el-table-column
          width="100"
          prop="dmbh"
          label="代码编号">
        </el-table-column>
        <el-table-column
          width="200"
          prop="dmflbm"
          label="代码分类编码">
        </el-table-column>
        <el-table-column
          prop="dmzt"
          :formatter="formatDmzt"
          label="代码状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              @onConfirm="handleDelete(scope.$index, scope.row)"
              title="这是一段内容确定删除吗？">
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              plain >删除</el-button>
            </el-popconfirm>
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer style="margin-top: 10px;">
      <Pagenation :pageFaData = "pageData" v-on:changeSize="changeSizeFa"></Pagenation>
    </el-footer>
    <el-dialog :before-close="handleClose" title="编辑系统代码" :visible.sync="dialogFormVisible" :modal-append-to-body='false' center>
      <el-form :inline="true" ref="formDialogData" :rules="rules"  :model="formDialogData" style="text-align: center;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="字典标识"  prop="dmbs">
              <el-input v-model="formDialogData.dmbs" :disabled="editAble" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典名称" prop="dmmc">
              <el-input v-model="formDialogData.dmmc"  autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="字典编号" prop="dmbh">
              <el-input v-model="formDialogData.dmbh"  autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="上级标识" prop="dmsjdm">
              <el-input placeholder="请输入上级代码，如果没有则不填" v-model="formDialogData.dmsjdm" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="分类编码" prop="dmflbm">
              <el-input v-model="formDialogData.dmflbm" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典状态" prop="dmzt">
              <el-select v-model="formDialogData.dmzt" placeholder="代码状态" @change="handleSelect" style="width: 150px;">
                <el-option label="停用" value="0"></el-option>
                <el-option label="在用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitXtdm(formDialogData)">提交后台</el-button>
              <el-button @click="dialogFormVisible = false">取消提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    </el-container>
</template>

<script>
  export default {
    components: {
      Pagenation: ()=> import('../../components/Pagenation'),
    },
    data(){
      return{
        submitType: '',//edit是编辑，add是新增
        editAble: false,
        checkXtdmList: [],
        xtdmDataList: [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        pageData: {
          pageSize: 10,
          pageSizes: [10,20,50,100],
          total: 0,
        },
        formDialogData: {
          dmbs: '',
          dmmc: '',
          dmbh: '',
          dmflbm: '',
          dmzt: '',
          dmsjdm: '',
        },
        formXtdm: {
          dmbs: '',
          dmmc: '',
          dmbh: '',
          dmflbm: '',
          dmzt: '',
          size: 10,
          start: 1,
        },
        rules:{
          dmbs :[{required: true, message: '请输入', trigger: 'blur'}],
          dmmc :[{required: true, message: '请输入', trigger: 'blur'}],
          dmbh :[{required: true, message: '请输入', trigger: 'blur'}],
          dmzt :[{required: true, message: '请输入', trigger: 'blur'}],
        }
      }
    },
    methods: {
      handleClose(done){//对话框关闭前调用
        this.editAble = false;
        this.submitType = '';
        done();
      },
      load(tree, treeNode, resolve) {//懒加载子节点
        const response = this.$store.dispatch("loadXtdmChild", {"dmbs": tree.dmbs});
        response.then(res => {
          resolve(res.data);
        });
      },
      handleSelect(dmzt){
        this.formDialogData.dmzt = dmzt;
      },
      formatDmzt(row,column){//格式化代码状态，1为在用，0为不在用
        if(row.dmzt == '1'){
          return "在用";
        }else{
          return "失效";
        }
      },
      selectXtdm(){//查询系统代码
        this.xtdmDataList = [];
        console.log(this.formXtdm);
        const response = this.$store.dispatch("getXtdm",this.formXtdm);
        response.then(res => {
          console.log(res.data.xtdmlist);
          let that = this;
          this.pageData.total = res.data.total;
          res.data.xtdmlist.forEach(xtdmxx => {
            if(xtdmxx.dmbh == '0'){//说明为父节点，则给该对象添加一个children属性
              that.$set(xtdmxx,'hasChildren',true);
              this.xtdmDataList.push(xtdmxx);
            }else{
              this.xtdmDataList.push(xtdmxx);
            }
          })
        });
      },
      checkRow(selection,row){//点击左侧选择框调用，
        this.checkXtdmList = [];
        this.checkXtdmList = selection;
      },
      createXtdmChild(){
        this.submitType = 'add';
        this.editAble = false;
        this.formDialogData.dmbs=this.checkXtdmList[0].dmbs;
        this.formDialogData.dmsjdm = this.checkXtdmList[0].dmbs;
        this.dialogFormVisible=true;
      },
      submitXtdm(formDialogData){
        this.$refs['formDialogData'].validate((valid) => {
            if (!valid) {         
                this.$message({
                  message: "请输入必填项！",
                  type: "error",
                });
            }else{//通过验证后才能提交
              let response;
              if(this.submitType == 'add'){
                response = this.$store.dispatch("addXtdm",formDialogData);
              }else{
                response = this.$store.dispatch("updateXtdm",formDialogData);
              }
              response.then(res => {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: res.data.type,
                });
                if(res.data.type === 'success'){//如果成功，刷新列表
                  this.reloadXtdmList();
                }
              })
            }
        });
      },
      handleEdit(index,row){//编辑代码
        this.submitType='edit';
        this.editAble = true;
        this.formDialogData = row;
        this.dialogFormVisible = true;
      },
      delCheckXtdm(){//删除选中的系统代码
        let xtdmDmbsList = [];
        this.checkXtdmList.forEach(item => {
          xtdmDmbsList.push(item.dmbs);
        });
        const response = this.$store.dispatch("delSelectXtdm",{"dmbslist": xtdmDmbsList});
        response.then(res => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: res.data.type,
          });
          if(res.data.type === 'success'){//如果删除成功，刷新列表
            this.reloadXtdmList();
          }
        })
        //请求删除
      },
      handleDelete(index,row){//逐条删除系统代码，点击右侧的按钮
        const response = this.$store.dispatch("deleteXtdm",{"dmbs": row.dmbs});
        response.then(res => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: res.data.type
          });
          if(res.data.type === 'success'){//如果删除成功，刷新列表
            reloadXtdmList();
          }
        })
      },
      reloadXtdmList(){//重新请求获取系统代码列表
        this.xtdmDataList = [];
        const response = this.$store.dispatch("getXtdm",this.formXtdm);
        response.then(res => {
          this.pageData.total = res.data.total;
          this.xtdmDataList = res.data.xtdmlist; 
        });
      },
      changeSizeFa(childData){
        if(childData.pageSize){
          this.pageData.pageSize = childData.pageSize;
        }
        if(childData.currentPage){
          this.pageData.currentPage = childData.currentPage;
        }
        this.formXtdm.size = childData.pageSize;//设置formXtgly对象里面的size和start
        this.formXtdm.start = childData.currentPage;
        if(this.xtdmDataList.length != 0){//在还没有查询后不能触发
          const response = this.$store.dispatch("getXtdm",this.formXtdm);
          response.then(res => {
            this.pageData.total = res.data.total;
            this.xtdmDataList = res.data.xtdmlist; 
          });
        }
      },
    },
    watch:{
      xtdmDataList(newValue,oldValue){
        if(this.xtdmDataList != newValue){
          this.xtdmDataList = newValue;
        }
      },
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: medium;
    padding-left: 20px;
    background-color: rgb(237, 249, 250);
  }
  .el-table__header-wrapper .el-checkbox{
	  display:none
  }
  .el-main {
    padding-top: 10px;
  }
</style>