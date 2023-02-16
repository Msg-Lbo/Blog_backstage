<template>
    <el-table :data="article_list" style="width: 100%">
        <el-table-column label="id" align="center" prop="id" width="50px" />
        <el-table-column label="标题" prop="title" width="auto" />
        <el-table-column label="分类" align="center" prop="category" width="100px" />
        <el-table-column label="创建时间" align="center" prop="create_time" width="200px" />
        <el-table-column label="更新时间" align="center" prop="update_time" width="200px" />
        <el-table-column fixed="right" width="200px">
            <template #default="scope">
                <el-button size="small" type="success" @click="In_top(scope.row)">置顶</el-button>
                <el-button size="small" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination layout="total, prev, pager, next" :total="total" :page-size="pagesize" hide-on-single-page
            @current-change="currnetChange" />
    </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import Qs from 'qs';
import { getAllArticle, deleteArticle } from '@/requests/api'
import { ElTable, ElTableColumn, ElButton, ElMessage } from 'element-plus';

let currentpage = ref<number>(1)
let pagesize = ref<number>(15)
let total = ref<number>(0)
onMounted(() => {
    get_AllArticle(currentpage.value)
})

let article_list = ref([])
const handleEdit = (row: { id: number }) => {
    console.log(row.id)
}
const handleDelete = (row: { id: number }) => {
    deleteArticle(row.id, store.getters.isnotUserlogin.token).then((res) => {
        if (res == 'nologin' || res == 'noperm') {
            ElMessage({
                message: '用户没有权限或登录信息过期.',
                duration: 1000,
                type: 'warning',
            })
            return
        }
        get_AllArticle(currentpage.value)
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
        if (res.data == 'top') {
            ElMessage({
                message: '置顶成功.',
                duration: 1000,
                type: 'success',
            })
            get_AllArticle(currentpage.value)
        }
    })
}

// 获取全部文章
const get_AllArticle = (page: number) => {
    getAllArticle(page, pagesize.value).then((res:any) => {
        console.log(res);
        article_list.value = res.data
        total.value = res.total
    })
}


// 分页
let currnetChange = (val: number) => {
    // console.log(val)
    currentpage.value = val
    get_AllArticle(val)
}





</script>

<style scoped>

</style>