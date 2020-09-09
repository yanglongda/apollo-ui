<template>
    <div style="margin-top:50px;" :class="{'has-logo':showLogo}">
        
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in constantRoutes"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import Layout from '@/layout'
import variables from "@/assets/styles/variables.scss";
//import {constantRoutes} from "@/router/index"
export default {
    data(){
        return{
            constantRoutes:[{
            path:'/organization',
            component:Layout,
        
            name:'organization',
            hidden:false,
            redirect:'noredirect',
            meta:{
            title:"组织管理",icon:"system"
            },
            children:[
            {
                path:'department',
                name:"department",
                component: (resolve) => require(['@/views/organization/department/index'], resolve),
                meta:{
                title:"部门管理",icon:"form"
                },
            },
            {
                path:'post',
                name:"post",
                component: (resolve) => require(['@/views/organization/post/index'], resolve),
                meta:{
                title:"岗位管理",icon:"form"
                },
            },
            ]
        },
        {
            path:'/userManagement',
            component:Layout,
        
            name:'userManagement',
            hidden:false,
            redirect:'noredirect',
            meta:{
            title:"用户管理",icon:"system"
            },
            children:[
            {
                path:'userList',
                name:"userList",
                component: (resolve) => require(['@/views/userManagement/userList/index'], resolve),
                meta:{
                title:"用户列表",icon:"form"
                },
            },{
                path:'personal',
                name:"personal",
                component: (resolve) => require(['@/views/userManagement/personal/index'], resolve),
                meta:{
                title:"个人中心",icon:"form"
                },
            }
            ]
        }]
        }
    },
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["permission_routes", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
<style lang="scss">
/deep/ #app .sidebar-container{
    top:50px !important;
}
</style>