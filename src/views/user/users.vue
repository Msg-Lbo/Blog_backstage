<template>
    <el-table :data="userlist" style="width: 100%">
        <el-table-column align="center" label="id" prop="id" width="50px" />
        <el-table-column align="center" label="账号" prop="account" width="150px" />
        <el-table-column align="center" label="昵称" prop="nickname" width="150px" />
        <el-table-column align="center" label="邮箱" prop="email" width="auto" />
        <el-table-column align="center" label="创建时间" prop="date_joined" width="auto" />
        <el-table-column align="center" label="最后登录" prop="last_login" width="auto" />
        <el-table-column align="right">
            <template #default="scope">
                <el-button size="small" type="warning" @click="EditUser(scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="DeleteUser(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="editUserDialog" v-if="editUserDialog" title="新建分类" width="30%" destroy-on-close>
        <el-form :label-position="'left'" style="max-width: 460px">
            <el-form-item label="账号">
                <el-input v-model="editUserForm.account" />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="editUserForm.nickname" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="editUserForm.email" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="editUserForm.password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editUserDialog = false">取消</el-button>
                <el-button type="primary" @click="EditUserInfo">
                    应用
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import Qs from 'qs';
import store from '@/store';
import { ElMessage } from 'element-plus';
// 载入加载
onMounted(() => {
    getUserList()
})

let editUserForm = reactive({
    id: 0,
    account: '',
    nickname: '',
    email: '',
    password: ''
})

interface userinfo {
    id: number
    account: string
    nickname: string
    email: string
    password: string
}

// 修改用户信息表单
const editUserDialog = ref(false)
const EditUser = (row: userinfo) => {
    editUserDialog.value = true
    editUserForm = row
}

const DeleteUser = (row: { id: number; }) => {
    console.log(row.id)
    ElMessage.error('暂未开发')
}

const EditUserInfo = () => {
    // axios({
    //     url: "http://127.0.0.1:9000/api/ylmty-userlist/",
    //     method: 'post',
    //     data: Qs.stringify({
    //         token: store.getters.isnotUserlogin.token,
    //         id: editUserForm.id,
    //         edit_new_account: editUserForm.account,
    //         edit_new_nickname: editUserForm.nickname,
    //         edit_new_email: editUserForm.email,
    //         edit_new_password: editUserForm.password,
    //     })
    // }).then((res) => {
    //     console.log(res.data);

    // })
    ElMessage.error('暂未开发')
}

// 用户列表
let userlist = ref([])
const getUserList = () => {
    axios({
        url: "http://127.0.0.1:9000/api/ylmty-userlist/",
        method: 'get'
    }).then((res) => {
        userlist.value = res.data
    })
}


</script>

<style lang="less" scoped>

</style>