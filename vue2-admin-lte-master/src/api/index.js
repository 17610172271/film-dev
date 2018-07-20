// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    test: '/Action/call',
    auth: 'v1/common/auth_check', // auth效验
    province: '/v1/common/getProvince',
    city: '/v1/common/getCity',
    area: '/v1/common/getArea',
    upload: '/v1/common/upload',
    codeGet: '/v1/captcha/get', // 图片验证码获取
    codeCheck: '/v1/captcha/check', // 图片验证
    telCodeSend: '/v1/sms/send', // 手机验证码发送
    telCodeCheck: '/v1/sms/check', // 手机验证码效验
    news: 'v1/Setting/get_num'
}
// 用户功能相关
export const user = {
    isUsername: '/v1/validate/check_username_available', // 检查用户名是否存在
    isTel: '/v1/validate/check_mobile_available', // 检查手机是否存在
    register: '/v1/user/register', // 用户注册
    login: '/v1/user/login', // 用户登录
    logout: '/v1/user/logout', // 退出登录
    findPsd: '/v1/user/lostpwd', // 找回密码
    userAdmin: '/v1/user/userAdmin' // 用户管理
}

// 影片列表
export const films = {
    options: '/v1/films/options', // 电影add,edit选项
    detail: '/v1/films/detail', // 电影详情
    add: '/v1/films/add', // 电影新增
    edit: '/v1/films/edit', // 电影编辑
    list: '/v1/films/list', // 电影列表
    down: '/v1/films/down', // 电影下线
    del: '/v1/films/del', // 电影删除
    check: '/v1/films/check', // 电影审核
    checkList: '/v1/films/checkList', // 电影审核列表
    trashList: '/v1/films/trashList', // 影片回收列表
    reset: '/v1/films/reset' // 影片还原
}
// 影片属性管理
export const attr = {
    area: '/v1/attr/attrArea', // 影片地区管理
    areaDetail: '/v1/attr/areaDetail', // 影片地区详情
    areaAdd: '/v1/attr/areaAdd', // 地区新增
    areaEdit: '/v1/attr/areaEdit', // 地区编辑
    areaRight: '/v1/attr/areaRight', // 地区权重
    areaDel: '/v1/attr/areaDel', // 地区删除
    actor: '/v1/attr/attrActor', // 影片演员管理
    actorDetail: '/v1/attr/actorDetail', // 影片演员详情
    actorAdd: '/v1/attr/actorAdd', // 演员新增
    actorEdit: '/v1/attr/actorEdit', // 演员编辑
    actorDel: '/v1/attr/actorDel', // 演员删除
    type: '/v1/attr/attrType', // 影片类型管理
    typeDetail: '/v1/attr/typeDetail', // 影片类型详情
    typeAdd: '/v1/attr/typeAdd', // 类型新增
    typeEdit: '/v1/attr/typeEdit', // 类型编辑
    typeRight: '/v1/attr/typeRight', // 类型权重
    typeDel: '/v1/attr/typeDel', // 类型删除
    language: '/v1/attr/attrLanguage', // 影片语言管理
    languageDetail: '/v1/attr/languageDetail', // 影片语言详情
    languageAdd: '/v1/attr/languageAdd', // 语言新增
    languageEdit: '/v1/attr/languageEdit', // 语言编辑
    languageRight: '/v1/attr/languageRight', // 语言权重
    languageDel: '/v1/attr/languageDel' // 语言删除
}
// 权限管理
export const right = {
    admin: '/v1/right/rightAdmin', // 管理员管理
    adminDetail: '/v1/right/adminDetail', // 管理员详情
    adminAdd: '/v1/right/adminAdd', // 管理员新增
    adminEdit: '/v1/right/adminEdit', // 管理员编辑
    adminDel: '/v1/right/adminDel', // 管理员删除
    log: '/v1/right/rightLog', //管理员日志
    logDel: '/v1/right/logDel' // 日志删除
}

// 系统设置
export const setting = {
    enter: '/v1/setting/enter', // 消息-录入
    enterDetail: '/v1/setting/enterDetail', // 消息-录入 详情
    enterDel: '/v1/setting/enterDel', // 消息-录入 删除
    check: '/v1/setting/check', // 消息-审核列表
    checkDetail: '/v1/setting/checkDetail', // 消息-审核 详情
    newsCheck: '/v1/right/newsCheck', // 消息审核列表 审核
    letter: '/v1/setting/letter', // 消息-常用词汇
    letterDetail: '/v1/right/letterDetail', // 管理员详情
    letterAdd: '/v1/right/letterAdd', // 管理员新增
    letterEdit: '/v1/right/letterEdit', // 管理员编辑
    letterDel: '/v1/right/letterDel', // 消息-常用词汇 删除
    letterRight: '/v1/right/letterRight' // 消息-常用词汇权重
}

// 账户
export const home = {
    index: '/v1/home/index'
}

export default {
    BASE_URL,
    common,
    home,
    user,
    attr,
    right,
    films,
    setting
}
