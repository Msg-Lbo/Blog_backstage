<template>
    <div class="messages-content">
        <el-tag style="margin:3px 8px 3px 0" v-for="(item, index) in barragesList" :key="index" :color="item.color"
            effect="plain" @click="open(item)">{{ item.text }}</el-tag>
    </div>
</template>

<script lang='ts' setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { getBarrages } from '../../requests/api'


const open = (item: { text: string; color: string; ip: string }) => {
    ElMessageBox.confirm(
        '来自IP：' + item.ip,
        '是否删除？',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }
    ).then(() => {
        ElMessage({
            type: 'success',
            message: 'Delete completed',
        })
    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

let barragesList = ref()
onMounted(() => {
    getBarrages().then((res) => {
        barragesList.value = res
        console.log(res);

    })
})
</script>

<style lang='less'>
.messages-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    span {
        cursor: pointer;
    }
}
</style>