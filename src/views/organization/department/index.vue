<template>
    <div class="career">
        <el-form ref="form" class="form" :model="form">
            <el-form-item label="部门层级" style="width:310px">
            <el-select v-model="form.levelId" style="width:224px;" filterable placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in levels" :key='item.levelId' :label="item.level" :value="item.levelId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索" style="width:290px;">
            <el-input v-model="form.deptName"  style="width:240px;" placeholder="按部门名称搜索"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="handleQueryForm">搜索</el-button>
            <el-button type="primary" @click="addDep">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table
        v-loading="loading"
        class="table-num"
        :data="data"
        >
        <tamplate slot='empty'>
            <p style="font-size:12px;margin:0;">暂无数据，<el-botton size="mini" type="text" @click="addDep" style="cursor:pointer;color: #409eff;">点击新增</el-botton></p>
        </tamplate>    
        <el-table-column label="部门名称" align="center" prop="deptName"/>
        <el-table-column label="所属单位" align="center" prop="unitName" />
        <el-table-column label="部门层级" align="center" prop="level" />
        <el-table-column label="上级部门" align="center" prop="parentName" />
        <el-table-column label="部门排序码" align="center" prop="sort" />
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
          <el-form-item label="部门名称" style="" prop="deptName">
            <el-input v-model="ruleForm.deptName" style="width:250px;" placeholder="输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="所属单位" style="" prop="unitId">
            <el-select v-model="ruleForm.unitId" filterable style="width:250px;" @change="change1" placeholder="请选择">
              <el-option v-for="item in unitList" :key='item.id' :label="item.name" :value="item.id"></el-option>
               
            
            </el-select>
          </el-form-item>

          <el-form-item label="部门层级" style="" prop="levelId">
            <el-select v-model="ruleForm.levelId" filterable style="width:250px;" @change="change2" placeholder="请选择">
            
            <el-option v-for="item in levels" :key='item.levelId' :label="item.level" :value="item.levelId"></el-option>
               
            </el-select>
          </el-form-item>
          <el-form-item label="上级部门" style="padding-left:10px"  prop="parent">
            <el-select v-model="ruleForm.parent" filterable style="width:250px;" @change="change3" :disabled="isdisabled" placeholder="请选择">
                <el-option label="无" value=""></el-option>
                <el-option v-for="item in deptList" :key='item.id' :label="item.deptName" :value="item.id"></el-option>

            </el-select>
            <span id="wuxu" v-show="isshow">无需填写</span>
          </el-form-item>
           <el-form-item label="部门排序码" style="padding-right:5px;" prop="sort">
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
import {getList,handleQuery,levels,addDept,getParent,getDept,addDept2,deleteDept} from "@/api/organization/department"
export default {
    name:'department',
    data(){
        return{
            data:[
                {
                    numb:'部门1',
                    schoolName:'单位1',
                    year:'',
                    className:'',
                    name:''
                }
            ],
            title:'新增',
            row:'',
            yearList:[],
            levels:[],
            classList:[],
            unitList:[],
            deptList:[],
            adata:[],
            total:10,
            loading:false,
            dialogFormVisible:false,
            isdisabled:false,
            isshow:false,
            form:{
                levelId:'',
                class:'',
                deptName:'',
                page:1,
                size:10,    
            },
            ruleForm:{
                deptName:'',
                level:'',
                levelId:'',
                unitId:'',
                unitName:'',
                sort:'',
                parent:'',
                parentName:'',

                id:''
            },
            rules:{
                deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
                unitId: [{ required: true, message: "所属单位不能为空", trigger: "blur" }],
                levelId: [{ required: true, message: "部门层级不能为空", trigger: "blur" }],
            }
        }
    },
    mounted(){
        this.handleQuery()
        this.getInfo()
        this.handleSelect()
    },
    methods:{
        getInfo(){
          getList().then(res=>{
              if(res.data.code==200){
                console.log(res.data.data)
                this.unitList=res.data.data
              }else{
                this.msgError(res.message)
              }
            })
            levels().then(res=>{
              if(res.data.code==200){
                this.levels=res.data.data
              }else{
                this.msgError(res.message)
              }
            })
        },
        handleruleForm(){
             //修改
             
             this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                  console.log(this.row)
                  if(this.row){
                    console.log(this.row,'修改')
                  addDept2(this.ruleForm).then(res=>{
                    if(res.data.code===200){
                      console.log(res)
                      this.dialogFormVisible=false
                      this.handleQuery()
                    }else{
                      this.msgError(res.message)
                    }  
                  })   
                  }else{
                     addDept(this.ruleForm).then(res=>{
                    if(res.data.code===200){
                      console.log(res)
                      this.dialogFormVisible=false
                      this.handleQuery()
                    }else{
                      this.msgError(res.message)
                    }  
                  })   
                }
                }
             })
            
        },
        getParent(id){
          getParent(id).then(res=>{
            if(res.data.code==200){
              this.deptList=res.data.data
              this.change3()
            }else{
              this.msgError(res.message)
            }
          })
        },
        change1(row){
            this.ruleForm.unitName=''
            this.ruleForm.unitName=this.unitList[row-1].name
            console.log(this.ruleForm.unitName)
            let id=this.ruleForm.unitId
            this.getParent(id)
            this.$forceUpdate()
        },
        change2(row){
            this.ruleForm.level=''
            this.ruleForm.level=this.levels[row-1].level
            console.log(this.ruleForm.level)
            if(this.ruleForm.levelId=='1'){
                this.ruleForm.parent=''
                this.isdisabled=true
                this.isshow=true
            }else{
              
                this.isdisabled=false
                this.isshow=false
            }
            this.$forceUpdate()
        },
        change3(){
            
            this.$forceUpdate()
        },
        handleQueryForm(){
          this.form.page=1
          this.handleQuery()
        },
        handleQuery(){
          this.loading=true
             handleQuery(this.form).then(res=>{
              if(res.data.code==200){
                this.total=res.data.data.total
                if(res.data.data.records.length===0){
                  this.data=[]
                }else{
                  this.data=res.data.data.records
                }
                this.loading=false
              }else{
                this.msgError(res.message)
              }
              this.$forceUpdate()
            })
        },
        handleSelect(){
          
        },
        addDep(row){
            this.dialogFormVisible=true
            if(row.id){
                this.ruleForm={deptName:'',
                level:'',
                levelId:'',
                unitId:'',
                unitName:'',
                sort:'',
                parent:'',
                parentName:'',

                id:''
                }
                this.title='修改'
                this.row=row.id
                getDept(row.id).then(res=>{
                  if(res.data.code==200){
                    this.ruleForm.id=row.id
                    this.ruleForm.deptName=res.data.data.deptName
                    this.ruleForm.unitId=res.data.data.unitId
                    this.ruleForm.unitName=res.data.data.unitName
                    this.ruleForm.level=res.data.data.level
                    this.ruleForm.levelId=res.data.data.levelId
                    if(res.data.data.parent===0){
                    this.ruleForm.parent=''
                    this.ruleForm.parentName=''
                    }else{
                    this.ruleForm.parent=res.data.data.parent
                    this.ruleForm.parentName=res.data.data.parentName
                    }
                    this.ruleForm.sort=res.data.data.sort
                    console.log(this.ruleForm)
                    // this.change1()
                    // this.change2()
                    // this.change3()
                     this.$forceUpdate()
                  }else{
                    this.ruleForm.unitId=res.data.data.unitId
                  }
                })
            }else{
                this.row=''
                this.ruleForm={
                  deptName:'',
                level:'',
                levelId:'',
                unitId:'',
                unitName:'',
                sort:'',
                parent:'',
                parentName:'',

                id:''
                }
                this.title='新增'
            }
        },
        deleteDep(row){
          if(row.id){
            this.$confirm("部门删除后将不可恢复", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(function () {
                return deleteDept(row.id);
              })
              .then((res) => {
                if(res.data.code===200){
                  this.handleQuery()
                }else{
                  this.msgError(res.message)
                }
              })
          }
        }
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
</style>