<template>
  <div>
    <el-container>
      <el-aside style="width: auto;">
        <div style="display: inline-block;">
          <el-menu
          class="el-menu-vertical"
          text-color="#f0f0f0"
          :collapse="isCollapse"
          style="height: 100%;border: none;">
          <div style="display: inline-block;">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="xtglyList"
              :filter-node-method="filterNode"
              node-key="zzbm"
              ref="tree"
              @node-click="handleNodeClick"
              style="min-height: 500px; border-radius: 10px; border: 1px solid rgb(224, 224, 224);">
            </el-tree>
          </div>
        </el-menu>    
        </div>
        
      </el-aside>
      <div style="border-radius: 10px;display:inline-block; width: 30px; height: 100%; background-color: rgb(253, 150, 150);">
        <div style="width: 30px; height: 30px; position: absolute; margin: auto 0; top: 0; bottom: 0;">
          <i :class="{ 'el-icon-d-arrow-right':isCollapse==true,'el-icon-d-arrow-left':isCollapse==false}" style="font-size: x-large;" @click="changeArrow"></i>
        </div>
      </div>
    <el-container>
      <el-main style="border-left: 2px solid rgb(228, 226, 226);">
      <div style="text-align: center; height: 100%;">
        <el-transfer
          style="text-align: center; display: inline-block; height: 100%; width: 100%;"
          :titles="['未分配功能', '已分配功能']"
          :button-texts="['取消', '添加']"
          v-model="modellist"
          :data="allGnList"
          :props="{
            key: 'gnbh',
            label: 'gnmc',
          }"
          @change="selectNode">
        </el-transfer>
      </div>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-transfer-panel {
    width: 300px;
    height: 100%;
    
  }
  .el-transfer-panel__body {
    text-align: left;
    height: 100%;
  }
  .el-checkbox-group.el-transfer-panel__list {
    overflow: auto;
    height: 100%;
  }
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        isCollapse: false,
        xtglyList: [],
        allGnList: [],
        modellist: [],
        filterText: "",
        glybh: ""
      }
    },
    methods: {
      changeArrow(){
        this.isCollapse = !this.isCollapse;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      
      handleNodeClick(xtglyObj) {
        if(xtglyObj.glybh == undefined || xtglyObj.glybh != null){//如果查找该属性不为空，则判断为系统管理员
          this.glybh = xtglyObj.glybh;//动态设置系统管理员角色编号以方便传给后台
          const response = this.$store.dispatch("getXtAllGn",xtglyObj.glybh);//调用store中的action方法发送网络请求
          response.then(res => {
            const data = res.data;
            if(data != undefined){
              this.allGnList = data.leftGnxx;//穿梭框左边
              this.modellist = data.rightGnxx;//穿梭框右边
            }
          });
        }
      },
      selectNode(value, direction, movedKeys){
        if(direction === 'right'){//添加功能
          console.log(movedKeys);
          let Obj = {
            "moveKeyList": movedKeys,
            "glybh": this.glybh,
            "mode": "add"
          };

          const response = this.$store.dispatch("addXtGn",Obj);
          response.then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: res.data.type,
            });
          });
        }else if(direction === 'left'){//取消功能
          let Obj = {
            "moveKeyList": movedKeys,
            "glybh": this.glybh,
            "mode": "remove"
          };
          const response = this.$store.dispatch("addXtGn",Obj);
          response.then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: res.data.type,
            });
          });
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      modellist(newValue, oldValue){
        if(newValue != oldValue){
          this.modellist=newValue;
        }
      }
    },
    mounted() {
      if(this.$store.state.xtglStore.xtZzxxList.length == 0){
        const response = this.$store.dispatch("getXtzzxx");//调用store 里面的getMenu方法返回一个promise对象
        response.then(res => {
          this.xtglyList=res.data;
        }); 
      }else{
        this.xtglyList=this.$store.state.xtglStore.xtZzxxList;
      }
    }
  }
</script>