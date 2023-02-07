<template>
    <header class="header">
        <div class="left">
            <i class="iconfont icon-shousuohou" @click='changeCollapse'></i>
        </div>
        <div class="right">
            <el-button color="#626aef" @click="logout()">退出</el-button>
        </div>
    </header>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const logout = () => {
    store.dispatch("webLogout", localStorage.getItem("token"))
}
const store = useStore()
const isCollapse = computed(() => store.state.app.isCollapse)
const changeCollapse = () => {
    return store.dispatch('app/isCollapseChange', !isCollapse.value)
}
</script>

<style lang='less' scoped>
.header {
    height: 100%;
    padding: 0 20px;
    background-color: #eee;
    position: relative;
    height: inherit;
    display: flex;
    align-items: center;

    .left {
        position: absolute;
        left: 20px;

        i {
            font-size: 20px;
            padding: 10px;
            cursor: pointer;
        }
    }

    .right {
        position: absolute;
        right: 20px;
    }
}
</style>