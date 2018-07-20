<template>
    <div class="login-container">
        <div class="login-bg">
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_01.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_02.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_03.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_04.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_05.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_06.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_07.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_08.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_09.jpg" alt="" width="100%" height="100%">
            </div>
            <div class="login-bg-item"><img src="../../../static/img/login/登陆_10.jpg" alt="" width="100%" height="100%">
            </div>
        </div>

        <password v-if="$route.query.action=='password'"></password>
        <!--<register v-if="$route.query.action=='register'"></register>-->
        <login-modal v-if="!$route.query.action"></login-modal>

    </div>
</template>
<script type="text/ecmascript-6">
    import loginModal from './loginModal.vue'
    import Password from './Password.vue'
    //  import Register from './Register.vue'

    export default {
        data: () => ({
            data: ''
        }),
        components: {
            loginModal,
            Password
        },
        methods: {}
    }
</script>
<style scoped>
    .login-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .login-bg-item {
        width: 100%;
        height: 10%;
        background-color: #fff;
    }

    .login-container {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1999;
        left: 0;
        top: 0;
    }
</style>
