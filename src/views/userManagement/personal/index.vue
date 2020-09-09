<template>
  <div class="career">
    <el-form :model="ruleForm" class="personal" :rules="rules" ref="ruleForm">
        <div class="ruleForm-l">
          <el-form-item label="所属单位" style prop="unitId" >
            <el-select
              v-model="ruleForm.unitId"
              filterable
              style="width:250px;"
              @change="change1"
              placeholder="请选择"
            >
              <el-option v-for="item in unitList" :key='item.id' :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" style prop="deptId">
            <el-select
              v-model="ruleForm.deptId"
              filterable
              style="width:250px;"
              @change="change2"
              placeholder="请选择"
            >
             <el-option v-for="item in deptList" :key='item.id' :label='item.deptName' :value='item.id'></el-option>
             
            </el-select>
          </el-form-item>
          <el-form-item label="人员编制" style prop="rybz">
            <el-select
              v-model="ruleForm.rybz"
              filterable
              style="width:250px;"
              @change="change3"
              placeholder="请选择"
            >
            <el-option v-for="item in rybzList" :key='item.label' :label='item.label' :value='item.value'></el-option>
              
            </el-select>
          </el-form-item>
          <el-form-item label="职级" style prop="level">
            <el-select
              v-model="ruleForm.level"
              filterable
              style="width:250px;"
              @change="change4"
              placeholder="请选择"
            >
              <el-option v-for="item in levelList" :key='item.label' :label='item.label' :value='item.value'></el-option>
             
            </el-select>
          </el-form-item>
          <el-form-item label="人员岗位" style prop="postId">
            <el-select
              v-model="ruleForm.postId"
              filterable
              style="width:250px;"
              @change="change5"
              placeholder="请选择"
            >
             <el-option v-for="item in postList" :key='item.id' :label='item.name' :value='item.id'></el-option>
           
            </el-select>
          </el-form-item>

          <el-form-item
            label="人员排序码"
            prop="sort"
          >
            <el-input
              v-model="ruleForm.sort"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公地址" style prop="oa">
            <el-input
              v-model="ruleForm.oa"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style prop="email">
            <el-input
              v-model="ruleForm.email"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话" style prop="phone">
            <el-input
              v-model="ruleForm.phone"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="传真" style prop="fax">
            <el-input
              v-model="ruleForm.fax"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="直接领导" style prop="zzld">
            <el-input
              v-model="ruleForm.zzld"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="参加工作时间" style prop="cjgzsj">
            <el-input
              v-model="ruleForm.cjgzsj"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="进入本单位时间" style prop="jrbdwsj">
            <el-input
              v-model="ruleForm.jrbdwsj"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
        </div>
        <div class="ruleForm-r">
          <el-form-item label="姓名" style prop="name">
            <el-input
              v-model="ruleForm.name"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" style prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" style prop="sex">
            <el-select
              v-model="ruleForm.sex"
              filterable
              style="width:250px;"
            
              placeholder="请选择"
            >
              <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" style prop="idCard">
            <el-input
              v-model="ruleForm.idCard"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>

          <el-form-item label="出生日期" style prop="birthday">
            <el-input
              v-model="ruleForm.birthday"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭邮编" style prop="jtyb">
            <el-input
              v-model="ruleForm.jtyb"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭电话" style prop="homePhone">
            <el-input
              v-model="ruleForm.homePhone"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" style prop="address">
            <el-input
              v-model="ruleForm.address"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="政治面貌" style prop="zzmm">
            <el-input
              v-model="ruleForm.zzmm"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" style prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              style="width:250px;"
              placeholder="暂无"
            ></el-input>
          </el-form-item>
          <span style="font-size:14px;color:#ff0000;margin:80px 0 0 30px;display:inline-block;">如若信息有误，可反馈给部门负责人/管理员修改</span>
        </div> 
        
    </el-form>
   
    
  </div>
</template>

<script>
import { getPage,getPage2,getPage3,getList,getUnit,addPerson,addPerson2,getPerson,deletePerson} from "@/api/userManagement/userList";
import {apiBase} from "../../../../build/apiBase.js"
export default {
  name: "personal",
  data() {
    return {
      data: [],
      title: "新增",
      yearList: [],
      classList: [],
      adata: [],
      atemplate:false,
      title2:'模板导入',
      total: 10,
      unitList:[],
      deptList:[],
      postList:[],
      apiBase,
      sexList:[
        {label:'男',value:1},
        {label:'女',value:0},
        {label:'未知',value:2},
      ],
      rybzList:[
        {
          label:'公务员编制',value:'公务员编制'
        },{
          label:'事业单位编制',value:'事业单位编制'
        },{
          label:'其他',value:'其他'
        }
      ],
      levelList:[
        {
          label:'国家级正职',value:'国家级正职'
        },{
          label:'国家级副职',value:'国家级副职'
        },{
          label:'省部级正职',value:'省部级正职'
        },{
          label:'省部级副职',value:'省部级副职'
        },{
          label:'厅局级正职',value:'厅局级正职'
        },{
          label:'厅局级副职',value:'厅局级副职'
        },{
          label:'县处级正职',value:'县处级正职'
        },{
          label:'县处级副职',value:'县处级副职'
        },{
          label:'乡科级正职',value:'乡科级正职'
        },{
          label:'乡科级副职',value:'乡科级副职'
        },{
          label:'股所级正职',value:'股所级正职'
        },{
          label:'股所级副职',value:'股所级副职'
        }
      ] ,    
      loading: false,
      dialogFormVisible: false,
      isdisabled: false,
      isshow: false,
      id:'',
      form: {
        deptId: "",
        keyword: "",
        postId: "",
        page: 1,
        size: 10,
      },
      ruleForm: {deptName:'',unitName:'',account: "",address: null,birthday: null,cjgzsj: null,contacts: null,createAt: "",delFlag: "",deptId: "",deptName: "",eid: "",email: null,fax: null,homeAddress: null,homePhone: null,id: "",idCard: null,jrbdwsj: null,jtyb: null,level: "",lxdh: null,mobile: "",name: "",oa: null,phone: null,post: null,postId: null,postLevel: null,remark: null,role: "",rybz: null,sex: "",shortMobile: null,sort: null,unitId: null,unitName: "",unitSort: null,updateAt: null,zzld: null,zzmm: null,
      },
      
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        name:"source_file",
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // 上传的地址
        url: apiBase + "/api/person/import",
      },
      rules: {
        unitId: [
          { required: true, message: "所属单位不能为空", trigger: "blur" },
        ],
        deptId: [
          { required: true, message: "所属部门不能为空", trigger: "blur" },
        ],
        rybz: [
          { required: true, message: "人员编制不能为空", trigger: "blur" },
        ],
        level: [{ required: true, message: "职级不能为空", trigger: "blur" }],
        postId: [
          { required: true, message: "人员岗位不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.handleQuery();
    this.handleQuery2();
    this.handleQuery3();
    this.handleSelect()
  },
  methods: {
    handleruleForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if(this.ruleForm.id){
            addPerson2(this.ruleForm).then(res=>{
              if(res.data.code===200){
                this.handleQuery()
                this.dialogFormVisible = false;
                console.log(res.data)
              }else{
                this.msgError(res.message)
              }
            })
          }else{
            addPerson(this.ruleForm).then(res=>{
              if(res.data.code===200){
                console.log(res.data)
                this.dialogFormVisible = false;
                this.handleQuery()
              }else{
                this.msgError(res.message)
              }
            })
          }
          
        }
      });
    },
    unique(arr){
    var result = [];
    var hash = {};
    for ( var i=0;i<arr.length;i++){
        var key = (typeof arr[i]) + arr[i];
        if(!hash[key]){
            result.push(arr[i]);
            hash[key] = true;
        }
    }
    return result;
}
,

    handleQueryForm() {
      this.form.page=1
      this.handleQuery()
    },
    handleQuery() {
      this.loading = true;
      getPage(this.form).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data.records;
          this.total = res.data.data.total;
          this.loading = false;
        } else {
          this.msgError(message);
        }
      });
    },
    handleQuery2() {
   
      getPage2(this.form).then((res) => {
        if (res.data.code === 200) {
          let len=res.data.data.records
          
            this.deptList=len;
        } else {
          this.msgError(message);
        }
      });
    },
    handleQuery3() {
      getPage3(this.form).then((res) => {
          if (res.data.code === 200) {
          let len=res.data.data.records
          
            this.postList=len
        } else {
          this.msgError(message);
        }
      });
    },
    handleSelect() {
      getList().then(res=>{
        if(res.data.code===200){
          this.unitList=res.data.data
        }else{
          this.msgError(res.message)
        }
      })
    },
    change1(row){
      let id=this.ruleForm.unitId
      let index=this.unitList.map(item=>item.id).indexOf(row)
      this.ruleForm.unitName=this.unitList[index].name
      console.log(this.ruleForm.unitName)
      getUnit(id).then(res=>{
        if(res.data.code===200){
        let len=res.data.data
            this.deptList=len
         //this.deptList=this.unique(this.deptList)
        console.log(this.deptList)
        }
      })
      this.$forceUpdate()
    },
    change2(row){
      if(row){
        let index=this.deptList.map(item=>item.id).indexOf(row)
      this.ruleForm.deptName=this.deptList[index].deptName
      }
      console.log(this.ruleForm.deptName)
      this.$forceUpdate()
    },
    change3(){
      this.$forceUpdate()
    },
    change4(){
      this.$forceUpdate()
    },
    change5(row){
      if(row){
        let index=this.postList.map(item=>item.id).indexOf(row)
        this.ruleForm.post=this.postList[index].name
      }
       console.log(this.ruleForm.post)
      this.$forceUpdate()
    },

    addDep(row) {
      this.dialogFormVisible = true;
      if (row.id) {
        this.ruleForm={deptName:'',unitName:'',account: "",address: null,birthday: null,cjgzsj: null,contacts: null,createAt: "",delFlag: "",deptId: "",deptName: "",eid: "",email: null,fax: null,homeAddress: null,homePhone: null,id: "",idCard: null,jrbdwsj: null,jtyb: null,level: "",lxdh: null,mobile: "",name: "",oa: null,phone: null,post: null,postId: null,postLevel: null,remark: null,role: "",rybz: null,sex: "",shortMobile: null,sort: null,unitId: null,unitName: "",unitSort: null,updateAt: null,zzld: null,zzmm: null,}
        this.id=row.id
        this.title = "修改";
        getPerson(row.id).then(res=>{
          if(res.data.code===200){
            console.log(res.data.data)
            this.ruleForm=res.data.data
            this.change1(this.ruleForm.unitId)
            this.change2()
            this.change3()
            this.change4()
            this.change5()
            this.$forceUpdate()
          }else{
            this.msgError(res.message)
          }
        })
      } else {
        this.ruleForm={deptName:'',unitName:'',account: "",address: null,birthday: null,cjgzsj: null,contacts: null,createAt: "",delFlag: "",deptId: "",deptName: "",eid: "",email: null,fax: null,homeAddress: null,homePhone: null,id: "",idCard: null,jrbdwsj: null,jtyb: null,level: "",lxdh: null,mobile: "",name: "",oa: null,phone: null,post: null,postId: null,postLevel: null,remark: null,role: "",rybz: null,sex: "",shortMobile: null,sort: null,unitId: null,unitName: "",unitSort: null,updateAt: null,zzld: null,zzmm: null,}
        this.id=''
        this.title = "新增";
      }
    },
    deleteDep(row) {
      if(row.id){
        this.$confirm("用户信息删除后将不可恢复", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(function () {
                return deletePerson(row.id);
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
};
</script>
<style lang="scss" scoped>
.career {
  width: calc(100% - 40px);
  margin: 0px 50px 0px 60px;
  background: #fff;

  border-radius: 20px;
  min-height: calc(100vh - 178px);
  padding: 30px;
  position: relative;
}
/deep/ .el-form-item {
  display: inline-block;
}
.pos {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
/deep/ .el-dialog {
  width: 1000px;
}
.dialogFormVisible {
  /deep/ .el-form-item {
    margin-bottom: 22px;
    display: flex;
    justify-content: flex-end;
  }
  /deep/ .el-dialog__body {
    padding: 30px 20px 0 20px;
  }
  #wuxu {
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
    color: #999;
  }
}
.personal {
  /deep/ .el-form-item {
    margin-bottom: 22px;
    display: flex;
    justify-content: flex-end;
  }
  /deep/ .el-dialog__body {
    padding: 30px 20px 0 20px;
  }
  #wuxu {
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
    color: #999;
  }
}
/deep/ .el-form {
  overflow: hidden;
  
}
.ruleForm-l {
  margin:0 20px;

  float:left;
}
.ruleForm-r {
   margin:0 20px;
   float:left;
}
.atemplate {
  /deep/ .el-dialog{
    width:600px;
  }
  /deep/ .el-dialog__body {
    font-size: 14px;
    line-height: 25px;
    span {
      color: #ff4949;
    }
  }
  .atemplate-footer {
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    .el-button {
      width: 160px;
      height: 36px;
      background: #1890ff;
      color: #fff;
    }
    .footer-left {
      border: solid 1px #1890ff;
      color: #1890ff;
      background: #fff;
    }
  }
}
/deep/ .el-textarea__inner{
  height:100px;
}
</style>
