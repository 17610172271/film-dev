module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: ''
  },
  {
    type: 'item',
    icon: 'fa fa-home',
    name: '首页',
    router: {
      name: 'home'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-film',
    name: '影片管理',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片列表',
        router: {
          name: 'films_list'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '添加影片',
        router: {
          name: 'films_add'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片审核列表',
        router: {
          name: 'films_check_list'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片回收站',
        router: {
          name: 'films_trash'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-gg',
    name: '影片属性管理',
    // badge: {
    //   type: 'Number',
    //   data: 4
    // },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片地区管理',
        router: {
          name: 'attr_area'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片演员管理',
        router: {
          name: 'attr_actor'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片类型管理',
        router: {
          name: 'attr_type'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片语言管理',
        router: {
          name: 'attr_language'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-user-o',
    name: '权限管理',
    // badge: {
    //   type: 'Number',
    //   data: 4
    // },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '管理员管理',
        router: {
          name: 'right_admin'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '管理员日志',
        router: {
          name: 'right_log'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-cogs',
    name: '系统基本设置',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '消息-电影录入员',
        router: {
          name: 'setting_enter'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '消息-电影审核员',
        router: {
          name: 'setting_checker'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '审核员常用词汇设置',
        router: {
          name: 'setting_letter'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-address-book-o',
    name: '常规管理',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '个人配置',
        router: {
          name: 'normalsetting_person'
        }
      }
    ]
  }
]
