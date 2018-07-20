<template>
  <div class="register-container relative">
    <i class="fa fa-window-close register-close" @click="goBack"></i>
    <div class="logo-img"><img src="../../../static/img/login/logo_03.png" alt=""></div>
    <div class="login-title relative">用户注册</div>
    <div class="register-line"></div>
    <div class="login-username relative login-username-db" :class="{'m-b-lg': usernameError}">
      <input type="text" maxlength="20" placeholder="请输入用户名" v-model="username" @blur="validateUser">
      <p class="text-red" v-if="usernameError">{{usernameErrorMsg}}</p>
      <i class="fa fa-user-o fa-2x blue login-fa-user"></i>
      <div class="line-v-sm"></div>
    </div>
    <div class="login-username relative login-username-db" :class="{'m-b-lg': psdError}">
      <input type="password" maxlength="20" placeholder="请输入密码" v-model="password" @blur="validatePs">
      <p class="text-red" v-if="psdError">请输入正确的6-20位英文、数字或下划线组合！</p>
      <div class="line-v-sm"></div>
      <i class="fa fa-lock fa-2x blue login-fa-psd"></i>
    </div>
    <div class="login-username relative" :class="{'m-b-lg': psd2Error}">
      <input type="password" maxlength="20" placeholder="请再次输入密码" v-model="confirmPassword" @blur="validatePsd">
      <p class="text-red" v-if="psd2Error">两次密码输入不一致，请重新输入！</p>
      <div class="line-v-sm"></div>
      <i class="fa fa-lock fa-2x blue login-fa-psd"></i>
    </div>
    <div class="login-username relative" :class="{'m-b-lg': emailError}">
      <input type="text" placeholder="请输入您的邮箱" v-model="email" @blur="validateEmail">
      <p class="text-red" v-if="emailError">请输入正确的邮箱格式！</p>
      <i class="fa fa-envelope fa-2x blue register-email"></i>
      <div class="line-v-sm"></div>
    </div>
    <div class="login-username relative" :class="{'m-b-lg': telError}">
      <input type="text" maxlength="11" placeholder="请输入您的手机号" v-model="tel" @blur="validateTel">
      <p class="text-red" v-if="telError">{{telErrorMsg}}</p>
      <i class="fa fa-mobile fa-2x blue register-tel"></i>
      <div class="line-v-sm"></div>
    </div>
    <div class="login-security-code clear" :class="{'m-b-lg': validateError}">
      <input type="text" maxlength="5" class="pull-left" placeholder="请输入验证码" v-model="validateCode">
      <div class="login-code-img pull-left cursor-p" @click="sendValidateCode">{{sendBtn}} <span v-show="sendBtn != '获取验证码'">秒</span></div>
      <p class="text-red" v-if="validateError">{{validateErrorMsg}}</p>
    </div>
    <div class="m-b-md">
      <el-checkbox v-model="protocol" class="m-r-sm ipt-protocol"></el-checkbox>我已经阅读并接受 <span @click="protocolShow = true" class="text-blue1 cursor-p">《新光数字电影院线用户注册协议》</span>
    </div>
    <div><button class="login-btn" @click="submit">确定</button></div>
    <protocol v-model="protocolShow" @protocol="protocol = true"></protocol>
  </div>
</template>
<script>
import api from '@/api'
import Protocol from './Protocol.vue'
export default {
  data: () => ({
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    tel: '',
    validateCode: '',
    protocol: true,
    protocolShow: false,
    usernameError: false,
    usernameErrorMsg: '请输入英文、数字、汉字及下划线组合，4-20字！',
    psdError: false,
    psd2Error: false,
    emailError: false,
    telError: false,
    telErrorMsg: '请输入正确的手机格式！',
    sendBtn: '获取验证码',
    validateErrorMsg: '',
    validateError: false
  }),
  components: {
    Protocol
  },
  computed: {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 效验用户名
    validateUser () {
      if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}$/.test(this.username)) {
        this.usernameErrorMsg = '请输入英文、数字、汉字及下划线组合，4-20字！'
        this.usernameError = true
      } else {
        this.$http.get(api.user.isUsername, {
          params: {
            username: this.username
          }
        }).then(res => {
          console.log(res.data.code, res.data.msg)
          if (res.data.code === 1) {
            this.usernameError = false
            console.log(res.data.msg)
          } else {
            this.usernameErrorMsg = res.data.msg
            this.usernameError = true
          }
        })
      }
    },

    // 效验密码
    validatePs () {
      if (!/^[a-zA-Z0-9_]{6,20}$/.test(this.password)) {
        this.psdError = true
      } else {
        this.psdError = false
      }
    },
    // 确认密码效验
    validatePsd () {
      if (this.password !== this.confirmPassword) {
        this.psd2Error = true
      } else {
        this.psd2Error = false
      }
    },
    // 邮箱效验
    validateEmail () {
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.email)) {
        this.emailError = true
      } else {
        this.emailError = false
      }
    },
    validateTel () {
      if (!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(this.tel)) {
        this.telError = true
      } else {
        this.$http.get(api.user.isTel, {
          params: {
            mobile: this.tel
          }
        }).then(res => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.telError = false
          } else {
            this.telErrorMsg = res.data.msg
            this.telError = true
          }
        })
      }
    },
    sendValidateCode () {
      if (!this.telError && this.sendBtn === '获取验证码') {
        this.$http.post(api.common.telCodeSend, {
          mobile: this.tel,
          event: 'register'
        }).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '验证码发送成功!'
            })
            this.validateError = false
            this.sendBtn = 60
            let self = this
            let time = setInterval(function() {
              if (self.sendBtn > 1) {
                self.sendBtn -= 1
              } else if (self.sendBtn === 1) {
                self.sendBtn = '获取验证码'
                clearInterval(time)
              }
            }, 1000)
          } else {
            this.validateErrorMsg = res.data.msg
            this.validateError = true
          //   this.$message({
          //   type: 'warning',
          //   message: res.data.msg
          // })
          }
        })
      }
    },
    submit () {
      this.$http.post(api.user.register, {
        username: this.username,
        password: this.password,
        repassword: this.confirmPassword,
        mobile: this.tel,
        captcha: this.validateCode,
        email: this.email,
        is_agree: this.protocol
      }).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '账号注册成功!'
          })
          this.$router.replace({name: 'login'})
        } else {
          console.log(res.data.msg)
          this.$message({
            type: 'warning',
            message: res.data.msg
          })
        }
      })
    }
  },
  created () {
  }
}
</script>
<style scoped>
  .register-container {
    width: 478px;
    background: rgba(255,255,255,1);
    border-radius: 22px;
    box-shadow: 0px 0px 9px rgba(14,15,18,0.42);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 46px 46px;
  }
  .register-close {
    position: absolute;
    right: 18px;
    top: 18px;
    font-size: 30px;
    color: #FB2828;
    cursor: pointer;
  }
  .register-line {
    width: 100%;
    height: 4px;
    margin-bottom: 34px;
    background: -webkit-linear-gradient(left, rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.1)); /* 标准的语法 */
    border-radius: 30%;
  }
  .logo-img {
    width: 285px;
    height: 90px;
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
  }
  .logo-img img {
    width: 100%;
  }
  .login-title {
    font-size: 30px;
    height: 30px;
    line-height: 30px;
    font-family: MicrosoftYaHeiUI;
    color: #5F5E5E;
    text-align: center;
    margin-bottom: 13px;
  }
  .login-username {
    height: 58px; 
    margin-bottom: 10px;
  }
  .login-username input {
    font-size: 18px;
    width: 100%;
    height: 100%;
    color: #ABABAB;
    background: rgba(0,0,0,1);
    opacity: 0.7;
    border-radius: 5px;
    box-shadow: 2px 0px 0px rgba(234,230,238,1);
    padding-left: 70px;
    padding-right: 20px;
    font-size: 16px;
  }
  .login-fa-psd {
    position: absolute;
    top: 18px;
    left: 16px;
  }
  .login-fa-user {
    font-size: 24px;
    position: absolute;
    top: 18px;
    left: 16px;
  }
  .register-email {
    font-size: 22px;
    position: absolute;
    top: 20px;
    left: 16px;
  }
  .register-tel {
    font-size: 36px;
    position: absolute;
    top: 13px;
    left: 20px;
  }
  .line-v-sm {
    width: 1px;
    height: 32px;
    background-color: #F1ECF5;
    position: absolute;
    top: 14px;
    left: 53px;
  }
  .login-security-code {
    height: 66px;
    margin-bottom: 16px;
  }
  .login-security-code input {
    width:220px;
    height:58px; 
    background:rgba(0,0,0,1);
    opacity:0.7;
    border-radius: 5px 0 0 5px;
    line-height: 58px;
    padding: 0 30px;
    font-size: 16px;
    box-shadow: none;
  }
  .login-code-img {
    width: 165px;
    height: 58px;
    background-color: #FFAE00;
    line-height: 58px;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
  }
  .login-btn {
    width:100%;
    height:57px; 
    background:rgba(76,161,255,1);
    border-radius: 5px;
    margin-top: 0px;
    font-size: 24px;
    color: #fff;
  }
  .ipt-protocol {
    vertical-align: 1px;
  }
  .m-b-lg {
    margin-bottom: 30px;
  }
  .login-username-db.m-b-lg {
    margin-bottom: 40px;
  }
  @media (min-width: 1400px) {
    .login-username {
      margin-bottom: 16px;
    }
  }
  @media (max-width: 1400px) {
    .register-container {
      width: 308px;
      padding: 37px 34px 26px;
      border-radius: 8px;
    }
    .login-username {
      height: 48px;
    }
    .line-v-sm {
      width: 1px;
      height: 22px;
      background-color: #F1ECF5;
      position: absolute;
      top: 15px;
      left: 45px;
    }
    
    .register-tel {
      font-size: 28px;
      position: absolute;
      top: 12px;
      left: 18px;
    }
    .login-username input {
      padding-left: 60px;
    }
    .login-security-code {
      height: 48px;
    }
    .login-security-code input {
      width: 160px;
      height: 48px;
      background: rgba(0,0,0,1);
      opacity: 0.7;
      border-radius: 5px 0 0 5px;
      line-height: 48px;
      padding: 0 20px;
      font-size: 16px;
      box-shadow: none;
    }
    .login-code-img {
      width: 80px;
      height: 48px;
      background-color: #FFAE00;
      line-height: 48px;
      text-align: center;
      color: #fff;
      border-radius: 0 5px 5px 0;
    }
    .login-username-db.m-b-lg {
      margin-bottom: 40px;
    }
    .login-title {
      font-size: 22px;
      margin-bottom: 6px;
    }
    .register-line {
      margin-bottom: 20px;
      height: 3px;
    }
    .login-fa-psd {
      top: 17px;
      font-size: 22px;
    }
    .login-btn {
      height: 47px;
      font-size: 18px;
    }
    .login-fa-user {
      top: 16px;
      font-size: 20px;
    }
    .register-email {
      font-size: 17px;
      top: 17px;
    }
    .register-close {
      font-size: 22px;
    }
  }
</style>
