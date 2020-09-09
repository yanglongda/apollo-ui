<template>
  <div class="navbar">
    <div class="left-menu">
      <img src="@/assets/logo/logo.png" class="sidebar-logo">
      <h1 class="sidebar-title">组织架构管理系统</h1>
    </div>
    <div class="right-menu">
      <div class="right-menu-item">
        <!-- <div class="school-year" style="margin-top: 5px">2020-2021学年</div> -->
        <div class="school-year">{{currentSemester}}</div>
      </div>
      <!-- <div class="right-menu-item">
        <div class="name">{{name}}</div>
        <div class="identity-contain">
          <img class="image" src="@/assets/image/identity.png">
          <div class="identity">{{roles[0] == 1 ? '学生' : (roles[0] == 2 ? '教师' : '管理员')}}</div>
        </div>
      </div> -->
      <el-dropdown class="right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="triangle-bottomright"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'roles',
      'currentSemester',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid rgba(112,112,112,1);
  .left-menu {
    float: left;
    height: 100%;
    line-height: 50px;
    .sidebar-logo {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      margin-right: 16px;
      margin-left: 24px
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #304156;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  .triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 50px solid #304156;
    border-left: 25px solid transparent;
    float: right;
  }
  .right-menu {
    float: right;
    height: 100%;
    background: #304156;

    .right-menu-item {
      display: inline-block;
      height: 100%;
      color: #fff;
      vertical-align: text-bottom;
      .school-year {
        font-size: 14px;
        line-height: 20px;
        width: 96px;
        margin-left: 5px;
        margin-right: 300px;
        margin-top: 5px;
      }
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 36px;
      margin-top: 6px;
      margin-left: 10px
    }
    .identity-contain {
      display: flex;
      align-items: center;
      margin-top: -2px;
    }
    .name {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      margin-top: 6px;
    }
    .image {
      width: 19px;
      height: 14px;
      margin-right: 3px;
    }
    .identity {
      color: #fff;
      font-size: 11px;
      font-weight: 400;
      line-height: 24px;
    }
    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
      margin-right: 20px;
    }
  }
}

</style>
