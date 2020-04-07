<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageChData.currentPage"
      :page-sizes="pageChData.pageSizes"
      :page-size="pageChData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageFaData.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      pageFaData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data(){
      return{
        pageChData: {
          currentPage: 1,
          pageSize: this.pageFaData.pageSize,
          pageSizes: this.pageFaData.pageSizes,
          total: this.pageFaData.total,
        } 
      }
    },
    methods: {
      handleSizeChange(val) {//分页每页条数改变
        this.pageChData.pageSize = val;
        let sendFaData = {
          currentPage: this.pageChData.currentPage,
          pageSize: val,//当pageSize改变时，将pageSize传给父组件，然后执行查询
        }
        if(this.pageChData.total > this.pageChData.pageSize){//如果查询的总数小于当前的pageSize，则改变pageSize就不用再次查询
          this.$emit("changeSize", sendFaData);//提交给父组件
        }
      },
      handleCurrentChange(val) {//改变分页当前页码
        this.pageChData.currentPage=val;
        let sendFaData = {
          currentPage: val,//当当前页码改变时，给父组件传入改变后的当前页码
          pageSize: this.pageChData.pageSize,
        }
        this.$emit("changeSize", sendFaData);
      },
    },
  }
</script>