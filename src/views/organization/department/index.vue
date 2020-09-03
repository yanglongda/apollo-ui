<template>
    <div class="career">
        <el-form ref="form" class="form" :model="form">
            <el-form-item label="部门层级" style="width:310px">
            <el-select v-model="form.year" style="width:224px;" filterable placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="一级部门" value="1"></el-option>
                <el-option label="二级部门" value="2"></el-option>
                <el-option label="三级部门" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索" style="width:290px;">
            <el-input v-model="form.seachInfo"  style="width:240px;" placeholder="按部门名称搜索"></el-input>
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
        <el-table-column label="部门名称" align="center" prop="numb"/>
        <el-table-column label="所属单位" align="center" prop="schoolName" />
        <el-table-column label="部门层级" align="center" prop="year" />
        <el-table-column label="上级部门" align="center" prop="className" />
        <el-table-column label="部门排序码" align="center" prop="name" />
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
          <el-form-item label="部门名称" style="" prop="depName">
            <el-input v-model="ruleForm.depName" style="width:250px;" placeholder="输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="所属单位" style="" prop="company">
            <el-select v-model="ruleForm.company" filterable style="width:250px;" @change="change1" placeholder="请选择">
              <el-option label="教育厅" value="1"></el-option> 
            </el-select>
          </el-form-item>

          <el-form-item label="部门层级" style="" prop="zindex">
            <el-select v-model="ruleForm.zindex" filterable style="width:250px;" @change="change2" placeholder="请选择">
            
              <el-option label="一级部门" value="1"></el-option> 
              <el-option label="二级部门" value="2"></el-option> 
              <el-option label="三级部门" value="3"></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="上级部门" style="padding-left:10px"  prop="aboveDep">
            <el-select v-model="ruleForm.aboveDep" filterable style="width:250px;" @change="change3" :disabled="isdisabled" placeholder="请选择">
  
              <el-option label="委厅领导" value="1"></el-option> 
            </el-select>
            <span id="wuxu" v-show="isshow">无需填写</span>
          </el-form-item>
           <el-form-item label="部门排序码" style="padding-right:5px;" prop="sort">
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
                depName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
                company: [{ required: true, message: "所属单位不能为空", trigger: "blur" }],
                zindex: [{ required: true, message: "部门层级不能为空", trigger: "blur" }],
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
            console.log(3)
            if(this.ruleForm.zindex=='1'){
                this.ruleForm.aboveDep=''
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
</style>