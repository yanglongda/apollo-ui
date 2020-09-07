<template>
    <div class="career">
        <el-button type="primary" style="margin:20px;" @click="addPost">新增</el-button>
        <el-table
        v-loading="loading"
        class="table-num"
        :data="data"
        >
        <tamplate slot='empty'>
            <p style="font-size:12px;margin:0;">暂无数据，<el-botton size="mini" type="text" @click="addPost" style="cursor:pointer;color: #409eff;">点击新增</el-botton></p>
        </tamplate>    
        <el-table-column label="岗位名称" align="center" prop="name"/>
        <el-table-column label="岗位职责" align="center" prop="duty" />
        <el-table-column label="岗位状态" align="center" prop="status" >
          <tamplate slot-scope="scope">
              <span v-if="scope.row.status=='0'" style="color:#11CAB0">启用</span>
              <span v-else style="color:#FF0000">未启用</span>
          </tamplate>  
        </el-table-column>
        <el-table-column label="岗位排序码" align="center" prop="sort" />
        <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
                <el-button size="mini" type="text" style="font-size:12px;color: #409eff;" @click="addPost(scope.row)">修改</el-button>
                <el-button size="mini" type="text" style="font-size:12px;color: #409eff;" @click="deletePost(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pos">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="form.page"
          :limit.sync="form.size"
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
          <el-form-item label="岗位名称" style="" prop="name">
            <el-input v-model="ruleForm.name" style="width:250px;" placeholder="输入岗位名称"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责" style="" prop="duty">
            <el-input v-model="ruleForm.duty" type="textarea" style="width:250px;" placeholder="请输入简要的岗位职责，如管理哪些信息及事务。"></el-input>
          </el-form-item>
          <el-form-item label="岗位状态" style="" prop="status">
            <el-select v-model="ruleForm.status" style="width:250px;" filterable @change="change2" placeholder="请选择">
              <el-option v-for='item in statusList' :key='item.value' :label="item.label" :value="item.value"></el-option> 
            </el-select>
          </el-form-item>
           <el-form-item label="岗位排序码" style="padding-right:5px;" prop="sort">
            <el-input v-model="ruleForm.sort" style="width:250px;" placeholder="如0001，不输入默认排在最后"></el-input>
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
import {getPage,addPost,addPost2,getPost,deletePost} from '@/api/organization/post'
export default {
    name:'post',
    data(){
        return{
            data:[
                
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
            statusList:[
              {
                value:0,label:'启用'
              },{
                value:1,label:'未启用'
              }
            ],
            form:{
                status:'',
                postName:'',
                seachInfo:'',
                page:1,
                size:10,    
            },
            ruleForm:{
                name:'',
                duty:'',
                status:'',
                sort:'',
                id:''
            },
            rules:{
                name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
                duty: [{ required: true, message: "请输入岗位职责", trigger: "blur" }],
                status: [{ required: true, message: "请选择岗位状态", trigger: "blur" }],
            }
        }
    },
    mounted(){
      this.handleQuery()   
    },
    methods:{
        handleruleForm(){
             this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                  if(this.ruleForm.id){
                    addPost2(this.ruleForm).then(res=>{
                      if(res.data.code===200){
                        this.handleQuery()
                        this.dialogFormVisible=false
                      }else{
                        this.msgError(res.message)
                      }
                    })
                  }else{
                    addPost(this.ruleForm).then(res=>{
                      if(res.data.code===200){
                        this.handleQuery()
                        this.dialogFormVisible=false
                      }else{
                        this.msgError(res.message)
                      }
                    })
                  }
                }
             })
        },
   
        change2(){
            
            this.$forceUpdate()
        },
   
        handleQuery(){
          this.loading=true
            getPage(this.form).then(res=>{
              
              if(res.data.code===200){
                this.loading=false
                this.data=res.data.data.records
                this.total=res.data.data.total
              }else{
                this.msgError(res.message)
              }
            })
        },
        
        addPost(row){
            this.dialogFormVisible=true
            if(row.id){
                this.title='修改'
                this.ruleForm={name:'',duty:'',status:'',sort:'',id:''}
                this.ruleForm.id=row.id
                getPost(row.id).then(res=>{
                  if(res.data.code===200){
                   this.ruleForm.name=res.data.data.name
                   this.ruleForm.duty=res.data.data.duty
                   this.ruleForm.status=res.data.data.status
                   this.ruleForm.sort=res.data.data.sort
                   this.change2()
                    this.$forceUpdate()
                  }else{
                    this.msgError(res.message)
                  }
                })
            }else{
                this.title='新增'
                this.ruleForm={name:'',duty:'',status:'',sort:'',id:''}
            }
        },
        deletePost(row){
        
            this.$confirm("岗位删除后将不可恢复", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(function () {
                return deletePost(row.id);
              })
              .then((res) => {
                if(res.data.code===200){
                  this.handleQuery()
                }else{
                  this.msgError(res.message)
                }
              })
        
        }
    },
    
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