<template>
  <div class="career">
    <el-form ref="form" class="form" :model="form">
      <el-form-item label="所属部门" style="width:290px">
        <el-select
          v-model="form.deptId"
          style="width:204px;"
          filterable
          placeholder="请选择"
        >
          <el-option label="全部" value></el-option>
          <el-option label="一级部门" value="1"></el-option>
          <el-option label="二级部门" value="2"></el-option>
          <el-option label="三级部门" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员岗位" style="width:290px">
        <el-select
          v-model="form.postId"
          style="width:204px;"
          filterable
          placeholder="请选择"
        >
          <el-option label="全部" value></el-option>
          <el-option label="一级部门" value="1"></el-option>
          <el-option label="二级部门" value="2"></el-option>
          <el-option label="三级部门" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索" style="width:290px;">
        <el-input
          v-model="form.keyword"
          style="width:240px;"
          placeholder="按部门名称搜索"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryForm">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addDep">新增</el-button>
    <el-button type="info" @click="handleImport">导入</el-button>
    <el-button type="warning" @click="handleExport">导出</el-button>
    <el-table
      v-loading="loading"
      class="table-num"
      :data="data"
      style="margin-top:20px;"
    >
      <tamplate slot="empty">
        <p style="font-size:12px;margin:0;">
          暂无数据，
          <el-botton
            size="mini"
            type="text"
            @click="addDep"
            style="cursor:pointer;color: #409eff;"
            >点击新增</el-botton
          >
        </p>
      </tamplate>
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="所属部门" align="center" prop="deptName" />
      <el-table-column label="人员岗位" align="center" prop="post" />
      <el-table-column label="职务层次" align="center" prop="level" />
      <el-table-column label="人员排序码" align="center" prop="sort" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="font-size:12px;color: #409eff;"
            @click="addDep(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            style="font-size:12px;color: #409eff;"
            @click="deleteDep(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pos">
      <pagination
        v-show="total > 0"
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
             <el-option v-for="item in deptList" :key='item.deptName' :label='item.deptName' :value='item.deptName'></el-option>
             
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
             <el-option v-for="item in postList" :key='item.name' :label='item.name' :value='item.name'></el-option>
           
            </el-select>
          </el-form-item>

          <el-form-item
            label="人员排序码"
           
            prop="sort"
          >
            <el-input
              v-model="ruleForm.sort"
              style="width:250px;"
              placeholder="如1，不输入默认排在最后"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公地址" style prop="oa">
            <el-input
              v-model="ruleForm.oa"
              style="width:250px;"
              placeholder="请输入办公地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style prop="email">
            <el-input
              v-model="ruleForm.email"
              style="width:250px;"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话" style prop="phone">
            <el-input
              v-model="ruleForm.phone"
              style="width:250px;"
              placeholder="请输入办公电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="传真" style prop="fax">
            <el-input
              v-model="ruleForm.fax"
              style="width:250px;"
              placeholder="请输入传真"
            ></el-input>
          </el-form-item>
          <el-form-item label="直接领导" style prop="zzld">
            <el-input
              v-model="ruleForm.zzld"
              style="width:250px;"
              placeholder="请输入直接领导"
            ></el-input>
          </el-form-item>
          <el-form-item label="参加工作时间" style prop="cjgzsj">
            <el-input
              v-model="ruleForm.cjgzsj"
              style="width:250px;"
              placeholder="请输入参加工作时间"
            ></el-input>
          </el-form-item>
          <el-form-item label="进入本单位时间" style prop="jrbdwsj">
            <el-input
              v-model="ruleForm.jrbdwsj"
              style="width:250px;"
              placeholder="请输入进入本单位时间"
            ></el-input>
          </el-form-item>
        </div>
        <div class="ruleForm-r">
          <el-form-item label="姓名" style prop="name">
            <el-input
              v-model="ruleForm.name"
              style="width:250px;"
              placeholder="请输入用户真实姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" style prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              style="width:250px;"
              placeholder="请输入用户手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" style prop="sex">
            <el-select
              v-model="ruleForm.sex"
              filterable
              style="width:250px;"
              @change="change1"
              placeholder="请选择"
            >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" style prop="idCard">
            <el-input
              v-model="ruleForm.idCard"
              style="width:250px;"
              placeholder="请输入用户身份证号"
            ></el-input>
          </el-form-item>

          <el-form-item label="出生日期" style prop="birthday">
            <el-input
              v-model="ruleForm.birthday"
              style="width:250px;"
              placeholder="请输入用户出生日期"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭邮编" style prop="jtyb">
            <el-input
              v-model="ruleForm.jtyb"
              style="width:250px;"
              placeholder="请输入家庭邮编"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭电话" style prop="homePhone">
            <el-input
              v-model="ruleForm.homePhone"
              style="width:250px;"
              placeholder="请输入家庭电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" style prop="address">
            <el-input
              v-model="ruleForm.address"
              style="width:250px;"
              placeholder="请输入用户家庭住址"
            ></el-input>
          </el-form-item>
          <el-form-item label="政治面貌" style prop="zzmm">
            <el-input
              v-model="ruleForm.zzmm"
              style="width:250px;"
              placeholder="请输入用户政治面貌"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" style prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              style="width:250px;"
              placeholder="特殊需要备注的信息"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleruleForm">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPage,getPage2,getPage3,getList} from "@/api/userManagement/userList";

export default {
  name: "department",
  data() {
    return {
      data: [],
      title: "新增",
      yearList: [],
      classList: [],
      adata: [],
      total: 10,
      unitList:[],
      deptList:[],
      postList:[],
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
      form: {
        deptId: "",
        keyword: "",
        postId: "",
        page: 1,
        size: 10,
      },
      ruleForm: {account: "",address: null,birthday: null,cjgzsj: null,contacts: null,createAt: "",delFlag: "",deptId: "",deptName: "",eid: "",email: null,fax: null,homeAddress: null,homePhone: null,id: "",idCard: null,jrbdwsj: null,jtyb: null,level: "",lxdh: null,mobile: "",name: "",oa: null,phone: null,post: null,postId: null,postLevel: null,remark: null,role: "",rybz: null,sex: "",shortMobile: null,sort: null,unitId: null,unitName: "",unitSort: null,updateAt: null,zzld: null,zzmm: null,
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
  created() {
    this.handleQuery();
    this.handleQuery2();
    this.handleQuery3();
    this.handleSelect();
  },
  methods: {
    handleruleForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        }
      });
    },
    change1() {
      this.$forceUpdate();
    },
    change2() {
      this.$forceUpdate();
    },
    change3() {
      this.$forceUpdate();
    },
    handleQueryForm() {},
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
          this.deptList = res.data.data.records;
        
      
        } else {
          this.msgError(message);
        }
      });
    },
    handleQuery3() {
   
      getPage3(this.form).then((res) => {
        if (res.data.code === 200) {
          this.postList = res.data.data.records;
        
      
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
    change1(){
      this.$forceUpdate()
    },
    change2(){
      this.$forceUpdate()
    },
    change3(){
      this.$forceUpdate()
    },
    change4(){
      this.$forceUpdate()
    },
    change5(){
      this.$forceUpdate()
    },
    handleQueryForm() {},
    addDep(row) {
      this.dialogFormVisible = true;
      if (row.id) {
        this.title = "修改";
      } else {
        this.title = "新增";
      }
    },
    deleteDep() {},
    handleImport() {},
    handleExport() {},
  }
};
</script>
<style lang="scss" scoped>
.career {
  width: calc(100% - 40px);
  margin: 0px 20px 75px 20px;
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
</style>
