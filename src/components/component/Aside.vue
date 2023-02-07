<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" :collapse="isCollapse">
        <el-menu-item index="logo">
            <span>LOGO</span>
        </el-menu-item>
        <el-menu-item index="dashboard">
            <i class="iconfont icon-dashboard-full"></i>
            <span>仪表盘</span>
        </el-menu-item>
        <el-sub-menu index="article">
            <template #title>
                <i class="iconfont icon-guanliwenzhang" />
                <span>文章管理</span>
            </template>
            <el-menu-item index="add-article" @click="$router.push({ path: '/article/add-article' })">
                <template #title>
                    <i class="iconfont icon-wodewenzhang" />
                    <span>添加文章</span>
                </template>
            </el-menu-item>
            <el-menu-item index="article-list" @click="$router.push({ path: '/article/article-list' })">
                <template #title>
                    <i class="iconfont icon-wenzhangliebiaoxiangqing" />
                    <span>文章列表</span>
                </template>
            </el-menu-item>
            <el-menu-item index="article-top" @click="$router.push({ path: '/article/article-top' })">
                <template #title>
                    <i class="iconfont icon-zhiding" />
                    <span>文章置顶</span>
                </template>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="categories" @click="$router.push({ path: '/categories/categories-manage' })">
            <i class="iconfont icon-fenlei" />
            <span>分类管理</span>
        </el-menu-item>
        <el-menu-item index="user" @click="$router.push({ path: '/users/users-manage' })">
            <i class="iconfont icon-list" />
            <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="iconfont icon-pinglun" />
            <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="messages" @click="$router.push({ path: '/messages/messages-manage' })">
            <i class="iconfont icon-message" />
            <span>留言管理</span>
        </el-menu-item>
        <el-menu-item index="friends" @click="$router.push({ path: '/friends/friends-manage' })">
            <i class="iconfont icon-dashboard-full"></i>
            <span>友链管理</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts" setup name="Aside">
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore()
const isCollapse = computed(() => {
    return store.state.app.isCollapse
})
// onMounted(() => {
//     allrouters()

// })

// const allrouters = () => {
//     return useRouter().options.routes
// }

</script>
  
<style lang="less" scoped>
.el-menu-vertical-demo {
    height: 100%;

    i {
        font-size: 1.5rem;
    }
    span{
        margin: 0 20px;
    }
}
</style>