<template>
  <el-select :value="valueTitle" :clearable=true @clear="clearHandle">
    <el-input
      class="selectInput"
      placeholder="请输入组织单位名称"
      v-model="filterText">
    </el-input>

    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree  id="tree-option"
        :expand-on-click-node="false"
        ref="selectTree"
        :accordion="accordion"
        :data="xtzzList"
        node-key="zzbm"    
        :props="{ 
          label: 'zzmc',
          children: 'children',
        }" 
        :filter-node-method="filterNode"
        @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    selectFaData: {
      type: String,
      immediate: true,
      default: '',
    }
  },
  data() {
    return {
      accordion: false,
      xtzzList: [],
      filterText: '',
      valueTitle: this.selectFaData,
    }
  },
  methods: {
    // 切换选项
    handleNodeClick(node){
      this.valueTitle = node.zzmc;
      this.$emit('choseZzbm', node.zzbm);
    },
    // 清除选中
    clearHandle(){
      this.valueTitle = '';
      this.$emit('choseZzbm', '');//清除选择后应该返回空的组织编码，以防止store里面换存的有
      this.clearSelected();
    },
    /* 清空选中样式 */
    clearSelected(){
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element)=>element.classList.remove('is-current'))
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.zzmc.indexOf(value) !== -1;
    }
  },
  mounted(){
    if(this.$store.state.xtglStore.xtZzList.length == 0){
        const response = this.$store.dispatch("getXtZz");//调用store 里面的getMenu方法返回一个promise对象
        response.then(res => {
          this.xtzzList=res.data;
        });
      }else{
        this.xtzzList=this.$store.state.xtglStore.xtZzList;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.selectTree.filter(val);
    },
    selectFaData(val) {
      this.valueTitle = val
    },
    valueTitle(val,old) {
      if (old !== val) {
        this.valueTitle = val;
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
  .selectInput{
    padding: 0 5px;
    box-sizing: border-box;
  }
</style>

