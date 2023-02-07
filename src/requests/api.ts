import axios from "axios";
import Qs from 'qs';

const server_side_url = 'http://127.0.0.1:9000'

// 保存新文章
const saveNewArticle = async (article_info: object) => {
    return await new Promise((resolve, reject) => {
        axios.post('/api/add-article/', Qs.stringify(article_info))
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    alert(res.statusText)
                }
            }).catch((err: any) => {
                console.log(err);
                alert('请求错误,详细查看控制台');
            })
    })
}
const getAllArticle = async (page: number, pageSize: number) => {
    return await new Promise((resolve, reject) => {
        axios({
            url: 'http://127.0.0.1:9000/api/article-list/',
            method: 'get',
            params: {
                page,
                pageSize,
                category: 'all'
            }
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 删除文章
const deleteArticle = async (id: number, token: string) => {
    return await new Promise((resolve, reject) => {
        axios({
            url: '/api/delete-article/',
            method: 'delete',
            data: Qs.stringify({ id: id, token: token }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 提交弹幕
// 获取弹幕
const getBarrages = async () => {
    return await new Promise((resolve, reject) => {
        axios({
            url: '/api/get-barrage/',
            method: 'get'
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 获取全部分类
const getAllCategories = async () => {
    return await new Promise((resolve, reject) => {
        axios({
            url: '/api/ylmty-category/',
            method: 'get'
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 保存新分类
const saveNewCategory = (token: string, category_name: string, belong: string) => {
    return new Promise((resolve, reject) => {
        axios({
            url: '/api/ylmty-category/',
            method: 'put',
            data: Qs.stringify({
                token: token,
                category_name: category_name,
                belong_name: belong
            })
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 删除分类
const deleteCategory = (token: string, name: string) => {
    return new Promise((resolve, reject) => {
        axios({
            url: '/api/ylmty-category/',
            method: 'delete',
            data: Qs.stringify({
                token: token,
                name: name
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
// 保存友链模板
const saveFriendTemplate = (token: string, friend_template: string) => {
    return new Promise((resolve, reject) => {
        axios({
            url: '/api/save-friend-template/',
            method: 'post',
            data: Qs.stringify({
                template: friend_template,
                token: token
            })
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                alert(res.statusText)
            }
        }).catch((err: any) => {
            console.log(err);
            alert('请求错误,详细查看控制台');
        })
    })
}
export {
    saveNewArticle,
    getAllArticle,
    deleteArticle,
    getBarrages,
    getAllCategories,
    saveNewCategory,
    deleteCategory,
}