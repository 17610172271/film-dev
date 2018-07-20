module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
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
    icon: 'fa fa-file-text-o',
    name: '应用管理',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '应用审核列表',
        router: {
          name: 'application_list'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '应用审核',
        router: {
          name: 'application_check'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-user-o',
    name: '财务管理',
    // badge: {
    //   type: 'Number',
    //   data: 4
    // },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '分账设置',
        router: {
          name: 'financial_account'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '收入统计',
        router: {
          name: 'financial_income'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '订单统计',
        router: {
          name: 'financial_order'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '发票管理',
        router: {
          name: 'financial_invoice'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-bar-chart',
    name: '数据统计',
    // badge: {
    //   type: 'Number',
    //   data: 4
    // },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '注册量统计',
        router: {
          name: 'datas_register'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片操作量统计',
        router: {
          name: 'datas_films'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '绑定应用统计',
        router: {
          name: 'datas_bindapp'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-envelope-open-o',
    name: '资源信息',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '代理商管理',
        router: {
          name: 'resource_agency'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '影片库',
        router: {
          name: 'resource_movies'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-cog',
    name: '系统设置',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '用户管理',
        router: {
          name: 'setting_user'
        }
      },
      {
        type: 'tree',
        icon: 'fa fa-circle-o',
        name: '文档管理',
        router: {
          name: 'setting_doc'
        },
        items: [
          {
            type: 'item',
            icon: 'fa fa-circle-o',
            name: 'APII设置',
            router: {
              name: 'doc_apii'
            }
          },
          {
            type: 'item',
            icon: 'fa fa-circle-o',
            name: 'SDKI设置',
            router: {
              name: 'doc_sdki'
            }
          }
        ]
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '系统公告',
        router: {
          name: 'setting_notice'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '意见处理',
        router: {
          name: 'setting_suggest'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '消息管理',
        router: {
          name: 'setting_news'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '公司信息',
        router: {
          name: 'setting_company'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '个人资料',
        router: {
          name: 'setting_person'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '日志管理',
        router: {
          name: 'setting_log'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '默认定价',
        router: {
          name: 'setting_price'
        }
      }
    ]
  }
]
