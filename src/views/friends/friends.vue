<template>
    <div class="edit-friend-template">
        <md-editor v-model="friendTemplate" @onSave="save_FriendTemplate()" @on-upload-img="onUploadImg" />
    </div>
    <el-row :gutter="12">
        <el-col :span="6">
            <el-card shadow="hover">
                <div class="item-box" style="display: flex; ">
                    <img src="" alt="" style="width:50px;height:50px;border:1px solid">
                    <span>一楼没太阳</span>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <div class="item-box" style="display: flex; ">
                    <img src="" alt="" style="width:50px;height:50px;border:1px solid">
                    <span>一楼没太阳</span>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <div class="item-box" style="display: flex; ">
                    <img src="" alt="" style="width:50px;height:50px;border:1px solid">
                    <span>一楼没太阳</span>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <div class="item-box" style="display: flex; ">
                    <img src="" alt="" style="width:50px;height:50px;border:1px solid">
                    <span>一楼没太阳</span>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <div class="item-box" style="display: flex; ">
                    <img src="" alt="" style="width:50px;height:50px;border:1px solid">
                    <span>一楼没太阳</span>
                </div>
            </el-card>
        </el-col>
</el-row>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { saveFriendTemplate, getTemplate } from '@/requests/api'
import { ElMessage } from 'element-plus';
import router from '@/router';
import axios from 'axios';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import store from '@/store';

let friendTemplate = ref()
//保存
const save_FriendTemplate = () => {
    saveFriendTemplate(store.getters.isnotUserlogin.token, friendTemplate.value).then((res) => {
        console.log(res);
    })
}

onMounted(() => {
    getTemplate().then((res) => {
        friendTemplate.value = res
    })


    
})

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise<any>((rev, rej) => {
                const form = new FormData();
                form.append("file", file);
                axios({
                    url: '/api/upload-image/',
                    method: 'post',
                    headers: { "Content-Type": "multipart/form-data" },
                    data: form,
                }).then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );
    callback(res.map((item) => item.data));
};
</script>

<style lang='less'>
.el-card__body {
    padding: 10px !important;
}

.item-box {
    align-items: center;

    span {
        margin-left: 10px;
    }
}
</style>