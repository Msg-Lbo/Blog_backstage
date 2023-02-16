<template>
    <!-- 主体 -->
    <div class="category-content">
        <el-button style="float: right;" type="primary" size="small" @click="newCategoryDialog = true">新建</el-button>
        <el-table :data="all_category" style="width: 100%">
            <el-table-column prop="name" label="分类名" width="180" align="center" />
            <el-table-column prop="belong_id" label="父级" width="180" align="center" />
            <el-table-column prop="category_num" label="文章数" align="center" />
            <el-table-column fixed="right" align="center" label="操作" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editCategory(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" @click="delete_Category(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="newCategoryDialog" v-if="newCategoryDialog" title="新建分类" width="20%" destroy-on-close>
        <el-form :label-position="'top'" label-width="100px" :model="all_category" style="max-width: 460px">
            <el-form-item label="分类名">
                <el-input v-model="new_category_name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newCategoryDialog = false">取消</el-button>
                <el-button type="primary" @click="loopCheckCategory('new')">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="editCategoryDialog" v-if="editCategoryDialog" title="编辑分类" width="20%" destroy-on-close>
        <el-form :label-position="'top'" label-width="100px" :model="all_category" style="max-width: 460px">
            <el-form-item label="分类名">
                <el-input v-model="new_category_name" />
            </el-form-item>
            <el-form-item label="父级">
                <el-select v-model="category_belong" class="m-2" placeholder="Select">
                    <el-option v-for="item in all_category" :key="item.name" :label="item.label" :value="item.name" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editCategoryDialog = false">取消</el-button>
                <el-button type="primary" @click="loopCheckCategory('edit')">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import store from '@/store';
import { onMounted, ref } from 'vue';
import Qs from 'qs';
import { ElMessage } from 'element-plus';
import { getAllCategories, saveCategory, deleteCategory } from '@/requests/api'

const token = store.getters.isnotUserlogin.token
let new_category_name = ref<string>('')
let category_belong = ref()
let newCategoryDialog = ref(false)
let editCategoryDialog = ref(false)
let editCategoryID = ref<number>(0)
let all_category = ref()

onMounted(() => {
    getAllCategory()
})


// 遍历检查分类
const loopCheckCategory = (type: string) => {
    var check = /^[\u4e00-\u9fa5A-Za-z0-9_-]+[\)）（，；\(\.\%。\u4e00-\u9fa5A-Za-z0-9_-]?$/
    if (check.test(new_category_name.value) == true && new_category_name.value != null) {
        save_Category(token, new_category_name.value)
    } else {
        alert('不能为空或非法字符.')
    }


}

// 获取全部分类
const getAllCategory = () => {
    getAllCategories().then((res: any) => {
        all_category.value = res.allcategory_of_num
    })
}

// 保存分类
const save_Category = (token: string, category_name: string) => {
    console.log(123);
    
    saveCategory(token, category_name).then(res => {
        if (res == 'nologin') {
            ElMessage.warning({
                message: '用户信息过期或未登录.',
                duration: 1000
            })
            return
        }
        if (res == 'noperm') {
            ElMessage.warning({
                message: '用户权限不足.',
                duration: 1000
            })
            return
        }
        if (res == 'repeat') {
            ElMessage.warning({
                message: '重复分类名.',
                duration: 1000
            })
            return
        }
        if (res == 'ok') {
            ElMessage.success({
                message: '提交成功.',
                duration: 1000
            })
            getAllCategory()
            new_category_name.value = ''
            newCategoryDialog.value = false
        }
    })
}

// 编辑分类
const editCategory = (row: { id: number, name: string, belong_id: string }) => {
    editCategoryID.value = row.id
    new_category_name.value = row.name
    category_belong.value = row.belong_id
    editCategoryDialog.value = true
}

// 删除分类
const delete_Category = (row: { name: string }) => {
    deleteCategory(token, row.name).then(res => {
        if (res == 'nologin') {
            ElMessage.warning({
                message: '用户信息过期或未登录.',
                duration: 1000
            })
            return
        }
        if (res == 'noperm') {
            ElMessage.warning({
                message: '用户权限不足.',
                duration: 1000
            })
            return
        }
        if (res == 'ok') {
            ElMessage.success({
                message: '提交成功.',
                duration: 1000
            })
            getAllCategory()
        }
    })
}
</script>
<style lang="less">

</style>

