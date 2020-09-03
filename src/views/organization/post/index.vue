<template>
    <div class="career">
        <el-button type="primary" style="margin:20px;" @click="addDep">新增</el-button>
        <el-table
        v-loading="loading"
        class="table-num"
        :data="data"
        >
        <tamplate slot='empty'>
            <p style="font-size:12px;margin:0;">暂无数据，<el-botton size="mini" type="text" @click="addDep" style="cursor:pointer;color: #409eff;">点击新增</el-botton></p>
        </tamplate>    
        <el-table-column label="岗位名称" align="center" prop="numb"/>
        <el-table-column label="岗位职责" align="center" prop="schoolName" />
        <el-table-column label="岗位状态" align="center" prop="status" >
          <tamplate slot-scope="scope">
              <span v-if="scope.row.status=='启用'" style="color:#11CAB0">{{scope.row.status}}</span>
              <span v-else style="color:#FF0000">{{scope.row.status}}</span>
          </tamplate>  
        </el-table-column>
        <el-table-column label="岗位排序码" align="center" prop="name" />
        <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
                <el-button size="mini" type="text" style="font-size:12px;color: #409eff;" @click="addDep(scope.row)">修改</el-button>
                <el-button size="mini" type="text" style="font-size:12px;color: #409eff;" @click="deleteDep(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pos">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="form.page"
          :limit.sync="form.pageSize"
          @pagination="handleQuery"
        />
      </div>
      <el-dialog
        :title="title"
        class="dialogFormVisible"
        :visible.sync="dialogFormVisible"
        append-to-body
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="岗位名称" style="" prop="depName">
            <el-input v-model="ruleForm.depName" style="width:250px;" placeholder="输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责" style="" prop="company">
            <el-input v-model="ruleForm.company" type="textarea" style="width:250px;" placeholder="请输入简要的岗位职责，如管理哪些信息及事务。"></el-input>
          </el-form-item>
          <el-form-item label="岗位状态" style="" prop="zindex">
            <el-select v-model="ruleForm.zindex" style="width:250px;" filterable @change="change2" placeholder="请选择">
              <el-option label="启用" value="1"></el-option> 
              <el-option label="禁用" value="2"></el-option>  
            </el-select>
          </el-form-item>
           <el-form-item label="岗位排序码" style="padding-right:5px;" prop="sort">
            <el-input v-model="ruleForm.depName" style="width:250px;" placeholder="如0001，不输入默认排在最后"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleruleForm">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>

</template>

<script>

export default {
    name:'post',
    data(){
        return{
            data:[
                {
                    numb:'岗位1',
                    schoolName:'岗位1',
                    year:'',
                    status:'启用',
                    className:'',
                    name:''
                },
                {
                    numb:'岗位2',
                    schoolName:'岗位2',
                    year:'',
                    status:'停用',
                    className:'',
                    name:''
                }
            ],
            title:'新增',
            yearList:[],
            classList:[],
            adata:[],
            total:10,
            loading:false,
            dialogFormVisible:false,
            isdisabled:false,
            isshow:false,
            form:{
                year:'',
                class:'',
                seachInfo:'',
                page:1,
                pageSize:10,    
            },
            ruleForm:{
                depName:'',
                company:'',
                zindex:'',
                aboveDep:'',
                sort:''
            },
            rules:{
                depName: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
                company: [{ required: true, message: "请输入岗位职责", trigger: "blur" }],
                zindex: [{ required: true, message: "请选择岗位状态", trigger: "blur" }],
            }
        }
    },
    methods:{
        handleruleForm(){
             this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false
                }
             })
        },
        change1(){
            this.$forceUpdate()
        },
        change2(){
            
            this.$forceUpdate()
        },
        change3(){
            this.$forceUpdate()
        },
        handleQueryForm(){

        },
        handleQuery(){
            
        },
        handleSelect(){
          
        },
        handleQueryForm(){

        },
        addDep(row){
            this.dialogFormVisible=true
            if(row.numb){
                this.title='修改'
            }else{
                this.title='新增'
            }
        },
        deleteDep(){

        }
    },
    created(){
        this.handleQuery()

        this.handleSelect()
    }
}
</script>
<style lang="scss" scoped>
.career{
  width: calc(100% - 40px);
  margin: 0px 20px 75px 20px;
  background: #fff;

  border-radius: 20px;
  min-height: calc(100vh - 178px);
  padding:  30px;
  position: relative;
}
/deep/ .el-form-item{
    display:inline-block;
}
.pos{
    position: absolute;
    right:10px;
    bottom:20px;
}
/deep/ .el-dialog{
    width:600px;
}
.dialogFormVisible {
  /deep/ .el-form-item {
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
  }
  /deep/ .el-dialog__body {
    padding: 30px 20px 0 20px;
  }
  #wuxu{
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
    color:#999;
  }
}
/deep/ .el-textarea__inner{
    height:80px;
}
</style>