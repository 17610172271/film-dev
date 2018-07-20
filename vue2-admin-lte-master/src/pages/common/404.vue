<template>
  <div class="login-container">
    <div class="login-bg" style="background-color: #edf1f4;">
    </div>
    <div class="tips-content">
      <img src="../../../static/img/login/404.png" alt="" width="100%" height="100%">
      <div class="tips-candle text-lg">
        请 <a href="javascript:;" @click="refresh">刷新</a> 或 <a href="javascript:;" @click="goBack">返回上一级</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      data: ''
    }),
    components: {
    },
    methods: {
      refresh () {
        window.location.reload(true)
      },
      goBack () {
        this.$router.go(-1)
      }
    }
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
  .login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1999;
    left: 0;
    top: 0;
  }
  .tips-content {
    width: 50%;
    max-width: 670px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*background: url(../../../static/img/login/404.jpg) no-repeat;*/
    background-size: cover;
  }
  .tips-candle {
    position: absolute;
    top: 54%;
    left: 39%;
    color: #9c9d9f;
  }
  .tips-candle a {
    display: inline-block;
    padding: 10px 25px;
    background-color: #4385f5;
    border-radius: 8px;
    color: #fff;
  }
  @media (max-width: 1200px) {
    .tips-content {
      width: 70%;
    }
    .tips-candle {
      top: 50%;
      left: 39%;
    }
    .tips-candle a {
      padding: 6px 12px;
      border-radius: 4px;
    }
  }
  @media (max-width: 600px) {
    .tips-content {
      width: 70%;
    }
    .tips-candle {
      top: 50%;
      left: 39%;
      font-size: 12px;
    }
    .tips-candle a {
      padding: 0;
      color: #4385f5;
      background-color: transparent;
    }
  }
</style>
