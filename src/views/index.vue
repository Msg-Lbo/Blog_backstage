<template>
    <div class="common-layout">
        <el-container style="height: 100vh;">
            <el-aside width="auto">
                <Aside />
            </el-aside>
            <el-container>
                <el-header><header-menu /></el-header>
                <el-container>
                    <el-main><router-view /></el-main>
                    <el-footer>
                        <Footer />
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Aside from '@/components/component/Aside.vue';
import HeaderMenu from '@/components/component/HeaderMenu.vue'
import Footer from '@/components/component/Footer.vue';
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.el-footer,
.el-header {
    padding: 0 !important;
}
</style>