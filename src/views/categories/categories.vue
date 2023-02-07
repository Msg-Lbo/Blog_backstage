<template>
    <!-- 主体 -->
    <div class="classify-content">
        <el-button style="float: right;" type="primary" size="small" @click="newCategoryDialog = true">新建</el-button>
        <el-table :data="all_classify" style="width: 100%">
            <el-table-column prop="name" label="分类名" width="180" align="center" />
            <el-table-column prop="belong_id" label="父级" width="180" align="center" />
            <el-table-column prop="classify_num" label="文章数" align="center" />
            <el-table-column fixed="right" align="center" label="操作" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editClassify(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" @click="deleteClassify(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="newCategoryDialog" v-if="newCategoryDialog" title="新建分类" width="20%" destroy-on-close>
        <el-form :label-position="'top'" label-width="100px" :model="all_classify" style="max-width: 460px">
            <el-form-item label="分类名">
                <el-input v-model="new_category_name" />
            </el-form-item>
            <el-form-item label="父级">
                <el-select v-model="category_belong" class="m-2" placeholder="Select">
                    <el-option v-for="item in all_classify" :key="item.name" :label="item.label" :value="item.name" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newCategoryDialog = false">取消</el-button>
                <el-button type="primary" @click="loopCheckClassify('new')">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="editCategoryDialog" v-if="editCategoryDialog" title="编辑分类" width="20%" destroy-on-close>
        <el-form :label-position="'top'" label-width="100px" :model="all_classify" style="max-width: 460px">
            <el-form-item label="分类名">
                <el-input v-model="new_category_name" />
            </el-form-item>
            <el-form-item label="父级">
                <el-select v-model="category_belong" class="m-2" placeholder="Select">
                    <el-option label="顶级" value="" />
                    <el-option v-for="item in all_classify" :key="item.name" :label="item.label" :value="item.name" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editCategoryDialog = false">取消</el-button>
                <el-button type="primary" @click="loopCheckClassify('edit')">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import store from '@/store';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Qs from 'qs';
import { ElMessage } from 'element-plus';
import { getAllCategories, saveNewCategory, deleteCategory } from '@/requests/api'

const token = store.getters.isnotUserlogin.token
const new_category_name = ref<string>('')
const category_belong = ref('')
const newCategoryDialog = ref(false)
const editCategoryDialog = ref(false)
const editCategoryID = ref<number>(0)
let all_classify = ref()

onMounted(() => {
    getAllClassify()
})


// 遍历检查分类
const loopCheckClassify = (type: string) => {
    var check = /^[\u4e00-\u9fa5A-Za-z0-9_-]+[\)）（，；\(\.\%。\u4e00-\u9fa5A-Za-z0-9_-]?$/
    switch (type) {
        case "new":
            if (check.test(new_category_name.value) == true && new_category_name.value != null) {
                saveNewClassify(token, new_category_name.value, category_belong.value)
            } else {
                alert('不能为空或非法字符.')
            }
            break;
        case "edit":
            if (check.test(new_category_name.value) == true && new_category_name.value != null) {
                saveEditCategory(token, editCategoryID.value, new_category_name.value, category_belong.value)
            } else {
                alert('不能为空或非法字符.')
            }
            break;
        default:
            break;
    }

}

// 获取全部分类
const getAllClassify = () => {
    getAllCategories().then((res: any) => {
        console.log(res.allclassify_of_num);

        all_classify.value = res.allclassify_of_num
    })
}

// 保存新分类
const saveNewClassify = (token: string, category_name: string, belong: string) => {
    saveNewCategory(token, category_name, belong).then((res) => {
        if (res == 'nologin') {
            alert('用户信息过期或未登录.')
            return
        }
        if (res == 'noperm') {
            alert('当前用户权限不足.')
            return
        }
        if (res == 'ok') {
            alert("提交成功")
            getAllClassify()
            new_category_name.value = ''
            newCategoryDialog.value = false
        }
    })
}

// 编辑分类
const editClassify = (row: { id: number, name: string, belong_id: string }) => {
    editCategoryID.value = row.id
    new_category_name.value = row.name
    category_belong.value = row.belong_id
    editCategoryDialog.value = true
}
const saveEditCategory = async (token: string, id: number, category_name: string, belong: string) => {
    await axios({
        url: 'http://127.0.0.1:9000/api/ylmty-classify/',
        method: 'post',
        data: Qs.stringify({
            id: id,
            token: token,
            new_edit_category: category_name,
            belong_name: belong
        })
    }).then((res) => {
        console.log(res.data)
        if (res.data == 'nologin') {
            alert('用户信息过期或未登录.')
            return
        }
        if (res.data == 'noperm') {
            alert('当前用户权限不足.')
            return
        }
        ElMessage({
            message: "提交成功.",
            type: "success",
            duration: 1000
        })
        getAllClassify()
        new_category_name.value = ''
        editCategoryDialog.value = false
    })
}
// 删除分类
const deleteClassify = (row: { name: string }) => {
    deleteCategory(token, row.name).then((res) => {
        if (res == 'nologin') {
            alert('用户信息过期或未登录.')
            return
        }
        if (res == 'noperm') {
            alert('当前用户权限不足.')
            return
        }
        if (res == 'ok') {
            alert("删除成功")
            getAllClassify()
        }
    })
}
</script>
<style lang="less">

</style>

