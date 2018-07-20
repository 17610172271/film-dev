<template>
	<div class="login-modal-container">
		<div class="logo-img"><img src="../../../static/img/login/logo_03.png" alt=""></div>
		<div class="login-title">资源管理平台</div>
		<div class="login-username relative">
			<input type="text" placeholder="请输入用户名" @keydown.13="submit" v-model="username">
			<i class="fa fa-user-o fa-2x blue login-fa-user"></i>
			<div class="line-v-sm"></div>
		</div>
		<div class="login-username relative">
			<input type="password" placeholder="请输入密码" @keydown.13="submit" v-model="password">
			<div class="line-v-sm"></div>
			<i class="fa fa-lock fa-2x blue login-fa-psd"></i>
		</div>
<!-- 		<div class="login-security-code clear">
			<input type="text" maxlength="4" class="pull-left" @keydown.13="submit" style="color: #ababab;" placeholder="请输入验证码" v-model="validateCode">
			<div class="login-code-img pull-right cursor-p" @click="updateId"><img :src="codeImg" alt="" width="100%" height="100%"></div>
		</div> -->
		<div><button class="login-btn" @click="submit">登录</button></div>
		<div class="login-other text-lg clear m-t-lg">
			<label class="pull-left">
				<input type="checkbox" v-model="remeberPwd">
				<span>记住密码</span>
			</label>
			<router-link :to="{name: 'login', query: {action: 'password'}}" class="pull-right btn-link">忘记密码</router-link>
			<!--<router-link :to="{name: 'login', query: {action: 'register'}}" class="pull-right m-r-sm btn-link">注册</router-link>-->
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import api from '@/api'
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
  	username: '',
  	password: '',
    validateCode: '',
    remeberPwd: false
  }),
  computed: {
  },
  methods: {
	  submit () {
//  		this.$router.push({name: 'home'})
		  if (this.username && this.password) {
			  this.$http.post(api.user.login, {
				  account: this.username,
				  password: this.password
			  }).then(res => {
				  if (res.data.code === 1) {
					  if (this.remeberPwd) {
						  window.localStorage.setItem('account', this.username + 'aasd+aasd' + this.password)
					  } else {
						  window.localStorage.removeItem('account')
					  }
					  window.localStorage.setItem('Auth', res.data.data.userinfo.token)
					  window.localStorage.setItem('authInfo', JSON.stringify(res.data.data.userinfo))
					  this.setAuthInfo(res.data.data.userinfo)
					  this.$bus.token = window.localStorage.getItem('Auth')
					  this.$router.push({name: 'home'})
				  } else {
					  this.$message({
						  type: 'warning',
						  message: res.data.msg
					  })
				  }
			  })
		  } else if (!this.username || !this.password) {
			  this.$message({
				  type: 'error',
				  message: '请输入用户名或密码!'
			  })
		  }
	  },
  	...mapActions([
      'setAuthInfo'
      ])
  },
  created () {
  	 if (window.localStorage.getItem('account')) {
  	 	this.remeberPwd = true
  	 	this.username = window.localStorage.getItem('account').split('aasd+aasd')[0]
  	 	this.password = window.localStorage.getItem('account').split('aasd+aasd')[1]
  	 }
  }
}
</script>
<style scoped>
	.btn-link:hover, .btn-link:active, .btn-link:focus {
	  color: #333;
	}
	.login-modal-container {
		width: 430px;
		background: rgba(255,255,255,1);
		border-radius: 11px;
		box-shadow: 0px 0px 9px rgba(14,15,18,0.42);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 50px 47px 37px;
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
		font-size: 34px;
		height: 34px;
		line-height: 34px;
		font-family: MicrosoftYaHeiUI;
		color: rgba(40,40,40,1);
		text-align: center;
		margin-bottom: 32px;
	}
	.login-username {
		height: 66px;
		margin-bottom: 18px;
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
		padding-left: 110px;
		padding-right: 30px;
	}
	.login-fa-psd {
		position: absolute;
		top: 21px;
		left: 30px;
	}
	.login-fa-user {
		position: absolute;
		top: 21px;
		left: 30px;
	}
	.line-v-sm {
		width: 1px;
		height: 32px;
		background-color: #F1ECF5;
		position: absolute;
		top: 19px;
		left: 84px;
	}
	.login-security-code {
		height: 66px;
	}
	.login-security-code input {
		width:212px;
		height:66px;
		background:rgba(0,0,0,1);
		opacity:0.7;
		border-radius: 5px;
		box-shadow:2px 0px 0px rgba(234,230,238,1);
		line-height: 66px;
		padding: 0 30px;
		font-size: 18px;
	}
	.login-code-img {
		width: 112px;
		height: 66px;
		/*border: 1px solid #EAE6EE;*/
		border-radius: 5px;
		box-shadow: 2px 0px 0px rgba(234,230,238,1);
	}
	.login-btn {
		width:337px;
		height:65px;
		background:rgba(76,161,255,1);
		border-radius: 5px;
		margin-top: 16px;
		font-size: 24px;
		color: #fff;
	}
	.login-other {
		height: 18px;
		color: #282828;
	}
	.login-other label input {
		width: 18px;
		height: 18px;
		vertical-align: -4px;
	}
	@media (max-width: 1400px) {
		.login-modal-container {
			width: 308px;
			border-radius: 8px;
			box-shadow: 0px 0px 6px rgba(14,15,18,0.42);
			padding: 37px 34px 26px;
		}
		.logo-img {
			width: 195px;
			height: 60px;
			position: absolute;
			top: -80px;
			left: 50%;
			transform: translateX(-50%);
		}
		.login-title {
			font-size: 22px;
			margin-bottom: 22px;
			height: 22px;
			line-height: 22px;
		}
		.login-username {
			height: 48px;
			margin-bottom: 13px;
		}
		.login-username input {
			font-size: 14px;
			border-radius: 4px;
			box-shadow: 1px 0px 0px rgba(234,230,238,1);
			padding-left: 78px;
			padding-right: 20px;
		}
		.login-fa-psd {
			font-size: 24px;
			position: absolute;
			top: 15px;
			left: 22px;
		}
		.login-fa-user {
			font-size: 20px;
			position: absolute;
			top: 15px;
			left: 22px;
		}
		.line-v-sm {
			width: 1px;
			height: 24px;
			background-color: #F1ECF5;
			position: absolute;
			top: 13px;
			left: 59px;
		}
		.login-security-code {
			height: 48px;
		}
		.login-security-code input {
			width:151px;
			height:48px;
			border-radius: 4px;
			box-shadow:1px 0px 0px rgba(234,230,238,1);
			line-height: 48px;
			padding: 0 20px;
			font-size: 14px;
		}
		.login-code-img {
			width: 80px;
			height: 48px;
			/*border: 1px solid #EAE6EE;*/
			border-radius: 4px;
			box-shadow: 1px 0px 0px rgba(234,230,238,1);
		}
		.login-btn {
			width:240px;
			height:48px;
			border-radius: 4px;
			margin-top: 18px;
			font-size: 18px;
		}
		.login-other {
			height: 12px;
			margin-top: 20px;
		}
		.login-other label input {
			width: 13px;
			height: 13px;
			vertical-align: -2px;
		}
	}
</style>
