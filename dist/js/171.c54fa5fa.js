"use strict";(self["webpackChunkbank_end"]=self["webpackChunkbank_end"]||[]).push([[171],{4171:function(e,t,i){i.r(t),i.d(t,{default:function(){return h}});var a=i(6252),n=i(2262),l=i(579),r=i(594),o=i(129),d=i.n(o),p=i(1348),s=i(2955),c=i(7583),m=(0,a.aZ)({__name:"ArticleTopList",setup(e){(0,n.iH)(1),(0,n.iH)(15),(0,n.iH)(0);let t=(0,n.iH)([]);(0,a.bv)((()=>{u()}));const i=e=>{console.log(e.id)},o=e=>{let t={contentType:"mweb_article",permissions:["delete"]};l.Z.dispatch("checkUserPerm",t).then((t=>{t&&(0,r.Z)({url:"http://127.0.0.1:9000/api/delete-article/",method:"delete",data:d().stringify({id:e.id,token:l.Z.getters.isnotUserlogin.token}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((e=>{"nologin"!=e.data&&"noperm"!=e.data||(0,p.z8)({message:"用户没有权限或登录信息过期.",duration:1e3,type:"warning"})}))}))},m=e=>{(0,r.Z)({url:"http://127.0.0.1:9000/api/article-top/",method:"post",data:d().stringify({id:e.id,token:l.Z.getters.isnotUserlogin.token})}).then((e=>{"cancel"==e.data&&((0,p.z8)({message:"取消置顶成功.",duration:1e3,type:"success"}),u())}))},u=()=>{(0,r.Z)({url:"http://127.0.0.1:9000/api/article-top/",method:"get"}).then((e=>{t.value=e.data}))};return(e,l)=>((0,a.wg)(),(0,a.j4)((0,n.SU)(s.eI),{data:(0,n.SU)(t),style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a.Wm)((0,n.SU)(s.$Y),{align:"center",label:"id",prop:"id",width:"50px"}),(0,a.Wm)((0,n.SU)(s.$Y),{label:"标题",prop:"title",width:"auto"}),(0,a.Wm)((0,n.SU)(s.$Y),{align:"center",label:"分类",prop:"classify",width:"100px"}),(0,a.Wm)((0,n.SU)(s.$Y),{align:"center",label:"创建时间",prop:"create_time",width:"200px"}),(0,a.Wm)((0,n.SU)(s.$Y),{align:"center",label:"更新时间",prop:"update_time",width:"200px"}),(0,a.Wm)((0,n.SU)(s.$Y),{fixed:"right",width:"200px"},{default:(0,a.w5)((e=>[(0,a.Wm)((0,n.SU)(c.mi),{size:"small",type:"primary",onClick:t=>m(e.row)},{default:(0,a.w5)((()=>[(0,a.Uk)("取消")])),_:2},1032,["onClick"]),(0,a.Wm)((0,n.SU)(c.mi),{size:"small",type:"warning",onClick:t=>i(e.row)},{default:(0,a.w5)((()=>[(0,a.Uk)("编辑")])),_:2},1032,["onClick"]),(0,a.Wm)((0,n.SU)(c.mi),{size:"small",type:"danger",onClick:t=>o(e.row)},{default:(0,a.w5)((()=>[(0,a.Uk)("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]))}});const u=m;var h=u}}]);
//# sourceMappingURL=171.c54fa5fa.js.map