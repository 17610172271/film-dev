<template>
  <div class="protocol-container" v-show="protocolShow">
    <div class="protocol-modal">
      <div class="protocol-title relative">协议注册<i class="fa fa-window-close-o protocol-close" @click="protocolShow = false"></i></div>
      <div class="protocol-body text-lg">
        <p><span class="text-dark">【审慎阅读】</span>您在申请注册流程中点击同意前，应当认真阅读以下协议。<span class="text-dark text-underline">请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</span></p>
        <p class="text-dark m-t-md">1、与您约定免除或限制责任的条款；</p>
        <p class="text-dark m-t-md">2、与您约定法律适用和管辖的条款；</p>
        <p class="text-dark m-t-md">3、其他以粗体下划线标识的重要条款。</p>
        <p class="m-t-md">如您对协议有任何疑问，可向平台客服咨询。</p>
        <p class="m-t-md"><span class="text-dark">【特别提示】</span> 当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与新光院线发生争议的，适用<span class="text-blue1">《渠道合作管理平台服务协议》</span>处理。如您在使用平台服务过程中与其他用户发生争议的，依您与其他用户达成的协议处理。</p>
        <p class="text-underline text-dark m-t-md">阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p>
        <p class="text-blue1 m-t-md">《渠道合作管理平台服务协议》</p>
        <p class="text-blue1 m-t-md">《法律声明及隐私权政策》</p>
        <p class="text-blue1 m-t-md">《分账服务协议》</p>
      </div>
      <button class="protocol-btn block" @click="acceptProtocol">同意协议</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: false
    },
    data: () => ({
      data: '',
      protocolShow: false
    }),
    methods: {
      acceptProtocol () {
        this.$emit('protocol')
        this.protocolShow = false
      }
    },
    mounted () {
      this.protocolShow = this.value
    },
    watch: {
      value (val) {
        this.protocolShow = val
      },
      protocolShow (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style>
  .protocol-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 9;
  }
  .protocol-modal {
    width: 872px;
    background: rgba(255,255,255,1);
    border-radius:2px;
    box-shadow:0px 2px 8px rgba(165,165,165,0.75);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*padding: 50px 47px 37px;*/
  }
  .protocol-title {
    background-color: #222D32;
    height:66px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(231,231,231,1);
    line-height:66px;
    padding-left: 38px;
  }
  .protocol-close {
    position: absolute;
    right: 18px;
    top: 16px;
    color: #FFFFFF;
    cursor: pointer;
    padding: 6px 12px;
  }
  .protocol-body {
    padding: 36px 36px 0;
  }
  .protocol-btn {
    margin: 20px auto;
    width: 257px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    background-color: #3691F5;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .protocol-body {
    color: #808080;
  }
</style>
