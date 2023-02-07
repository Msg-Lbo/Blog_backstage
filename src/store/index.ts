import { createStore } from 'vuex'
import axios from 'axios';
import Qs from 'qs';
import router from '@/router';
import { ElMessage } from 'element-plus';
import app from './modules/app';

export default createStore({
  state: {
    userinfo: {
      headImg: '',
      nickName: '',
      token: '',
      isadmin: '',
    }
  },
  getters: {
    // 查询登录状态
    isnotUserlogin(state) {
      return state.userinfo
    }
  },
  mutations: {
    // 保存 注册登录用户信息
    saveUserinfo(state, userinfo) {
      state.userinfo = userinfo
    },
    //清空用户登录状态
    clearUserinfo(state) {
      state.userinfo.headImg = ''
      state.userinfo.nickName = ''
      state.userinfo.token = ''
    }
  },
  actions: {
    // 登录
    webLogin({ commit, state }, loginUser) {
      axios({
        url: 'https://api.ylmty.cc/api/ylmty-login/',
        method: 'post',
        data: Qs.stringify(loginUser)
      }).then((res) => {
        if (res.data == 'none') {
          alert('没有这个用户名，请检查...')
          return
        }
        if (res.data == 'pwderr') {
          alert('密码错误...')
          return
        }
        router.push({ path: '/' })
        commit('saveUserinfo', res.data)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('headImg', res.data.headImg)
      })
    },
    // 注册
    webRegister({ commit }, registerUser) {
      axios({
        url: 'https://api.ylmty.cc/api/ylmty-register/',
        method: 'post',
        data: Qs.stringify(registerUser)
      }).then((res) => {
        console.log(res.data);

        if (res.data == 'repeat') {
          ElMessage({
            message: '用户名已存在.',
            duration: 1000,
            type: 'warning',
          })
          return
        }
        localStorage.setItem('token', res.data.token)
        ElMessage({
          message: '注册成功.',
          duration: 1000,
          type: 'success',
        })
        location.reload();
      })
    },
    // 自动登录
    TryAoutLogin({ commit }) {
      let token = localStorage.getItem('token')
      let rember = localStorage.getItem('rember')
      if (rember == 'true') {
        if (token) {
          axios({
            url: 'https://api.ylmty.cc/api/auto-login/',
            method: 'post',
            data: Qs.stringify({ token })
          }).then((res) => {
            if (res.data == 'tokenTimeout') {
              alert('用户信息过期，请重新登录')
              router.push({ path: '/login' })
              return
            }
            commit('saveUserinfo', res.data)
            router.push({ path: '/' })
          })
          return
        }
        return
      }
    },
    // 登出
    webLogout({ commit }, token) {
      commit('clearUserinfo')
      localStorage.clear();
      axios({
        url: 'https://api.ylmty.cc/api/ylmty-logout/',
        method: 'post',
        data: Qs.stringify({ token })
      }).then((res) => {
        // console.log(res.data)
      })
    },
    // 权限判断
    async checkUserPerm({ getters }, checkInfo) {
      //用户
      let token = getters.isnotUserlogin.token
      let contentType = checkInfo.contentType
      let permissions = checkInfo.permissions
      // 鉴权结果
      let perm_data;
      await axios({
        url: 'https://api.ylmty.cc/api/ylmty-checkperm/',
        method: 'post',
        data: Qs.stringify({
          token,
          contentType,
          permissions: JSON.stringify(permissions)
        })
      }).then((res) => {
        // console.log(res.data)
        if (res.data == 'nologin') {
          perm_data = false
          alert('用户信息过期或未登录.')
          return
        }
        if (res.data == 'noperm') {
          perm_data = false
          alert('用户权限不足，请联系管理员.')
          return
        }
        if (res.data == 'ok') {
          perm_data = true
        }
      })
      return perm_data
    },
  },
  modules: {
    app
  }
})
