<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link :to="{name: 'home'}" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">SL</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>资源管理平台</b></span>
    </router-link>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <router-link :to="{name: 'home'}" class="link-home-icon"><span class="fa fa-home fa-lg" style="color: #fff;"></span></router-link>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav p-r-md">
          <li class="dropdown top-nav-username hidden-xs"><a href="javascript:;">欢迎您， {{getAuthInfo.nickname || '游客'}} !</a></li>
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <router-link :to="{name: 'normalsetting_person'}" class="dropdown-toggle" title="消息">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">{{ getNewsNum }}</span>
            </router-link>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img :src="getAuthInfo.avatar ? getAuthInfo.avatar : '../../../static/img/home/avatar.png'" class="user-image nav-avatar-container" alt="">
              <i class="fa fa-chevron-down"></i>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header navbar-drop-menu">
                <div class="slide-avatar"><img :src="getAuthInfo.avatar ? ($bus.url + getAuthInfo.avatar) : '../../../static/img/home/avatar.png'" alt="User Image"></div>

                <p>
                  {{getAuthInfo.nickname || '游客'}}
                  <small class="m-t-sm">电话: {{getAuthInfo.mobile}}</small>
                </p>
              </li>
              <!-- Menu Body -->
  <!--             <li class="user-body">
                <row>
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </row>
              </li> -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <!-- <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div> -->
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" @click="signOut">退出</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
<!--           <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-chevron-down"></i></a>
          </li> -->
        </ul>
      </div>
    </nav>
  </header>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import api from '@/api'
export default {
  name: 'va-navibar',
  data: () => ({
    newsNum: 0
  }),
  computed: {
    ...mapGetters([
      'getAuthInfo',
      'getNewsNum'
    ])
  },
  methods: {
    signOut () {
      this.$http.get(api.user.logout).then(res => {})
      window.localStorage.removeItem('Auth')
       this.$router.replace({name: 'login'})
    },
    getNewsData () {
       this.$http.get(api.common.news, {
         params: {
//           token: this.$bus.token
         }
       }).then(res => {
         if (res.data.code === 1) {
           this.saveNewsNum(res.data.data.message_num + res.data.data.notice_num)
         } else {
           this.saveNewsNum(0)
         }
       })
    },
    ...mapActions([
      'saveNewsNum'
      ])
    // getNewsData () {
    //   $.ajax({
    //     url: 'http://www.agent_api.com/v1/income/statistics',
    //     data: {offset: 0, limit: 10, token: this.$bus.token},
    //     success: function (data) {
    //       console.log(data)
    //     }
    //   })
    // }
  },
  created () {
    this.getNewsData()
  }
}

</script>
<style>
  .link-home-icon {
    color: #fff;
    padding: 15px;
    float: left;
  }
  .link-home-icom:hover {
    background-color: #357ca5;
  }
  .skin-blue .main-header .navbar .link-home-icom {
    color: #fff;
  }
  .slide-avatar {
    width: 90px;
    height: 90px;
    border: 0.5px solid #f5f5f5;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
  }
  .slide-avatar img {
    width: 100px;
    height: 100%;
  }
  .navbar-drop-menu {
    position: relative;
    z-index: 9999;
  }
  .nav-avatar-container {
    border: 0.5px solid #f5f5f5;
  }
  @media (max-width: 768px) {
    .navbar-nav {
      padding-right: 0;
    }
    .navbar-nav .nav>li>a {
      padding: 10px 5px;
    }
  }
  @media (min-width: 768px) and (max-width: 1500px) {

  }
  @media (min-width: 1500px) {
    .main-header .logo {
      height: 82px;
      line-height: 82px;
      font-size: 28px;
    }
    .navbar.navbar-static-top > a {
      padding: 30px 18px;
    }
    .navbar.navbar-static-top .sidebar-toggle {
      padding: 22px 18px;
    }
    .navbar.navbar-static-top > a:before {
      font-size: 26px;
    }
    .navbar.navbar-static-top > a > span {
      font-size: 26px;
    }
    .nav.navbar-nav > li > a {
      padding: 30px 8px;
    }
    .main-header .navbar .nav>li>a>.label {
      top: 25px;
      right: 2px;
    }
    .top-nav-username {
      font-size: 18px;
    }
    .notifications-menu > a >i {
      font-size: 20px;
    }
    .navbar-nav>.user-menu .user-image {
      width: 36px;
      height: 36px;
      border: 0.5px solid #f5f5f5;
    }
    .main-header .navbar .user-menu > a {
      padding: 22px 8px;
      height: 80px;
    }
    .main-header .navbar .user-menu > a > i {
      vertical-align: -8px;
    }
  }
</style>
