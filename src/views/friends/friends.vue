<template>
    <div class="edit-friend-template">
        <md-editor v-model="friendTemplate"  @onSave="saveArticle" @on-upload-img="onUploadImg" />
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { saveNewArticle, getAllCategories } from '@/requests/api'
import { ElMessage } from 'element-plus';
import router from '@/router';
import axios from 'axios';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

let friendTemplate = ref()
//保存
const saveArticle = () => {
    saveNewArticle(friendTemplate.value).then((res) => {
        // console.log(res);
        if (res == 'save article error') {
            ElMessage({
                message: "保存文章错误，请查看后端日志.",
                type: "error",
                duration: 3000
            })
        }
        if (res == 'ok') {
            ElMessage({
                message: '保存成功.',
                duration: 1000,
                type: 'success',
            })
            router.push({ path: '/article/article-list' })
        }
    })

}

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise<any>((rev, rej) => {
                const form = new FormData();
                form.append("file", file);
                axios({
                    url: 'http://127.0.0.1:9000/api/upload-image/',
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

</style>