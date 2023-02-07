<template>
    <div class="login-register">
        <PcLoginForm class="pc"></PcLoginForm>
        <MobileLoginForm class="mobile"></MobileLoginForm>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PcLoginForm from "@/components/LoginForms/PcLoginForm.vue";
import MobileLoginForm from "@/components/LoginForms/MobileLoginForm.vue";
onMounted(() => {

})
</script>

<style lang="less" scoped>
.login-register {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: calc(100vh - 60px);
}

.login-register .mobile {
    display: none;
}

@media (max-width: 768px) {
    .login-register {
        background-repeat: no-repeat;
        background-position: top;
        background-size: cover;
        min-height: 0;
    }
    
    .login-register .pc {
        display: none;
    }

    .login-register .mobile {
        display: flex;
    }
}
</style>