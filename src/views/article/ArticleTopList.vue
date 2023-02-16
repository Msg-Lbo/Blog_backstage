<template>
    <el-table :data="top_article" style="width: 100%">
        <el-table-column align="center" label="id" prop="id" width="50px" />
        <el-table-column label="标题" prop="title" width="auto" />
        <el-table-column align="center" label="分类" prop="category" width="100px" />
        <el-table-column align="center" label="创建时间" prop="create_time" width="200px" />
        <el-table-column align="center" label="更新时间" prop="update_time" width="200px" />
        <el-table-column fixed="right"  width="200px">
            <template #default="scope">
                <el-button size="small" type="primary" @click="In_top(scope.row)">取消</el-button>
                <el-button size="small" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import store from '@/store';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import Qs from 'qs';
import router from '@/router';
import { ElTable, ElTableColumn, ElButton, ElMessage } from 'element-plus';

let currentpage = ref<number>(1)
let pagesize = ref<number>(15)
let total = ref<number>(0)
let top_article = ref([])
onMounted(() => {
    getTopArticles()
})

const handleEdit = (row: { id: number }) => {
    console.log(row.id)
}
const handleDelete = (row: { id: number }) => {
    let checkInfo = {
        contentType: 'mweb_article',
        permissions: ['delete']
    }
    store.dispatch("checkUserPerm", checkInfo).then((res) => {
        if (res) {
            axios({
                url: 'http://127.0.0.1:9000/api/delete-article/',
                method: 'delete',
                data: Qs.stringify({
                    id: row.id,
                    token: store.getters.isnotUserlogin.token
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                // console.log(res)
                if (res.data == 'nologin' || res.data == 'noperm') {
                    ElMessage({
                        message: '用户没有权限或登录信息过期.',
                        duration: 1000,
                        type: 'warning',
                    })
                    return
                }
            })
        }
    })
}

// 置顶
const In_top = (row: { id: number }) => {
    axios({
        url: 'http://127.0.0.1:9000/api/article-top/',
        method: 'post',
        data: Qs.stringify({
            id: row.id,
            token: store.getters.isnotUserlogin.token
        })
    }).then((res) => {
        if (res.data == 'cancel') {
            ElMessage({
                message: '取消置顶成功.',
                duration: 1000,
                type: 'success',
            })
            getTopArticles()
        }
    })
}

const getTopArticles = () => {
    axios({
        url: 'http://127.0.0.1:9000/api/article-top/',
        method: 'get'
    }).then((res) => {
        top_article.value = res.data
    })
}





</script>

<style scoped>

</style>