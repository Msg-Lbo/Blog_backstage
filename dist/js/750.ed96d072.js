"use strict";(self["webpackChunkbank_end"]=self["webpackChunkbank_end"]||[]).push([[750],{1750:function(e,a,l){l.r(a),l.d(a,{default:function(){return V}});var t=l(6252),o=l(2262),d=l(9518),n=l(594),s=l(579),i=l(1348),c=l(1601),r=l(2224);const u={class:"add-article-content"},m={class:"add-article-continue-title"},p={class:"add-article-title"},v={class:"add-article-describe"},U={class:"add-article-to-calssify"},h={class:"add-article-time"},f={class:"add-article-editor"};var _=(0,t.aZ)({__name:"AddArticle",setup(e){(0,t.bv)((()=>{l()}));let a=(0,o.iH)();const l=()=>{(0,r.tG)().then((e=>{console.log(e.allclassify_of_num),a.value=e.allclassify_of_num}))};let _=(0,o.qj)({title:"",describe:"",content:"",category:"",time:"",token:s.Z.getters.isnotUserlogin.token});const g=()=>{if(!(_.title&&_.describe&&_.content))return(0,i.z8)({message:"不可为空.",duration:1e3,type:"error"}),!1;(0,r.Td)(_).then((e=>{"save article error"==e&&(0,i.z8)({message:"保存文章错误，请查看后端日志.",type:"error",duration:3e3}),"ok"==e&&((0,i.z8)({message:"保存成功.",duration:1e3,type:"success"}),c.Z.push({path:"/article/article-list"}))}))},b=async(e,a)=>{const l=await Promise.all(e.map((e=>new Promise(((a,l)=>{const t=new FormData;t.append("file",e),(0,n.Z)({url:"http://127.0.0.1:9000/api/upload-image/",method:"post",headers:{"Content-Type":"multipart/form-data"},data:t}).then((e=>a(e))).catch((e=>l(e)))})))));a(l.map((e=>e.data)))};return(e,l)=>{const n=(0,t.up)("el-input"),s=(0,t.up)("el-option"),i=(0,t.up)("el-select"),c=(0,t.up)("el-date-picker");return(0,t.wg)(),(0,t.iD)("div",u,[(0,t._)("div",m,[(0,t._)("div",p,[(0,t.Wm)(n,{modelValue:(0,o.SU)(_).title,"onUpdate:modelValue":l[0]||(l[0]=e=>(0,o.SU)(_).title=e),placeholder:"文章标题"},null,8,["modelValue"])]),(0,t._)("div",v,[(0,t.Wm)(n,{modelValue:(0,o.SU)(_).describe,"onUpdate:modelValue":l[1]||(l[1]=e=>(0,o.SU)(_).describe=e),placeholder:"文章描述"},null,8,["modelValue"])]),(0,t._)("div",U,[(0,t.Wm)(i,{modelValue:(0,o.SU)(_).category,"onUpdate:modelValue":l[2]||(l[2]=e=>(0,o.SU)(_).category=e),class:"m-2",placeholder:"分类"},{default:(0,t.w5)((()=>[(0,t.Wm)(s,{label:"未分类",value:"nobelong"}),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(a),(e=>((0,t.wg)(),(0,t.j4)(s,{key:e.value,label:e.name,value:e.name},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),(0,t._)("div",h,[(0,t.Wm)(c,{modelValue:(0,o.SU)(_).time,"onUpdate:modelValue":l[3]||(l[3]=e=>(0,o.SU)(_).time=e),type:"date",placeholder:"Pick a Date",format:"YYYY-MM-DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])]),(0,t._)("div",f,[(0,t.Wm)((0,o.SU)(d.Z),{modelValue:(0,o.SU)(_).content,"onUpdate:modelValue":l[4]||(l[4]=e=>(0,o.SU)(_).content=e),style:{height:"700px"},onOnSave:g,onOnUploadImg:b},null,8,["modelValue"])])])}}}),g=l(3744);const b=(0,g.Z)(_,[["__scopeId","data-v-6abaf68d"]]);var V=b}}]);
//# sourceMappingURL=750.ed96d072.js.map