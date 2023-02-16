<template>
    <div class="add-article-content">
        <div class="add-article-continue-title">
            <div class="add-article-title">
                <el-input v-model="article_info.title" placeholder="文章标题" />
            </div>
            <div class="add-article-describe">
                <el-input v-model="article_info.describe" placeholder="文章描述" />
            </div>
            <div class="add-article-to-calssify">
                <el-select v-model="article_info.category" class="m-2" placeholder="分类">
                    <el-option label="未分类" value="nobelong" />
                    <el-option v-for="item in all_category" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
            </div>
            <div class="add-article-time">
                <el-date-picker v-model="article_info.time" type="date" placeholder="Pick a Date"
                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </div>
        </div>
        <div class="add-article-editor">
            <md-editor v-model="article_info.content" style="height:700px" @onSave="saveArticle"
                @on-upload-img="onUploadImg" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { reactive, ref, h, onMounted } from 'vue';
import axios from 'axios';
import Qs from "qs";
import store from '@/store';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { saveNewArticle, getAllCategories } from '@/requests/api'
onMounted(() => {
    get_AllCategories()
})

let all_category = ref()
const get_AllCategories = () => {
    getAllCategories().then((res: any) => {
        console.log(res.allcategory_of_num);
        all_category.value = res.allcategory_of_num
    })
}

let article_info = reactive<info>({
    title: '',
    describe: '',
    content: '',
    category: '',
    time: '',
    token: store.getters.isnotUserlogin.token,
})
interface info { //类型匹配
    title: string;
    describe: string;
    content: string,
    category: string,
    time: string,
    token: string
}
//保存
const saveArticle = () => {
    if (article_info.title && article_info.describe && article_info.content && article_info.category && article_info.time) {
        saveNewArticle(article_info).then((res) => {
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
    } else {
        ElMessage({
            message: '必填项不可为空.',
            duration: 1000,
            type: 'error',
        })
        return false
    }

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

<style scoped>
.add-article-continue-title {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    column-gap: 20px;
    margin-bottom: 10px;
}
</style>