// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
Random.extend({
    filmname: function(date) {
        var filmname = ['青春无敌', '杀破狼', '前任2', '少林寺', '神探狄仁杰', '头号玩家', '我不是药神', '赌侠1999', '碟中谍', '环太平洋', '后来的我们', '命运速递', '幕后玩家', '侏罗纪公园', '死神来了']
        return this.pick(filmname)
    },
    language: function (date) {
        var language = ['汉语', '英语', '日语', '法语', '俄语', '德语', '西班牙语', '泰语', '葡萄牙语']
        return this.pick(language)
    },
    checkstatus: function (date) {
        var checkstatus = ['待审核', '审核通过', '审核未通过']
        return this.pick(checkstatus)
    },
    status: function (date) {
        var status = ['已上线', '已下线']
        return this.pick(status)
    }
})
// mock一组数据 示例
const produceNewsData = function () {
    let articles = []
    for (let i = 0; i < 50; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
    return {
        articles: articles
    }
}
Mock.mock('/news/index', 'post', produceNewsData)

const login = function () {
    return {
        msg: 'ok',
        code: 1,
        data: {
            userinfo: {
                token: 'askfdkasdfjksndkfsdkfjs',
                nickname: 'lk',
                sex: 0,
                mobile: 17611123456,
                avatar: '',
                username: 'likui2',
                email: 'likui@163.com'
            }
        }
    }
}
Mock.mock('/v1/user/login', 'post', login) // 登陆

const logout = function () {
    return {
        msg: 'ok',
        code: 1,
    }
}
Mock.mock('/v1/user/logout', 'get', logout) // 退出登陆

const getNews = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            message_num: Math.ceil(Math.random() * 10),
            notice_num: Math.ceil(Math.random() * 10)
        }
    }
}
Mock.mock('v1/Setting/get_num', 'get', getNews) // 获取消息数量

const homeData = function () {
    let tableData = []
    let enterData = []
    let checkData = []
    for (let i = 0; i < 30; i++) {
        let data = {
            date: Random.date(),
            num: Math.ceil(Math.random() * 10000)
        }
        tableData.push(data)
    }
    for (let i =0; i < 10; i++) {
        let enter = {
            id: Random.id(),
            name: Random.cname(),
            today_films: Math.ceil(Math.random() * 1000),
            pass_films: Math.ceil(Math.random() * 1000),
            wait_films: Math.ceil(Math.random() * 1000),
            notpass_films: Math.ceil(Math.random() * 1000),
            all_films: Math.ceil(Math.random() * 1000)
        }
        let check = {
            id: Random.id(),
            name: Random.cname(),
            pass_films: Math.ceil(Math.random() * 1000),
            wait_films: Math.ceil(Math.random() * 1000),
            notpass_films: Math.ceil(Math.random() * 1000),
            all_films: Math.ceil(Math.random() * 1000)
        }
        enterData.push(enter)
        checkData.push(check)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            today_films: 999,
            all_films: 19999,
            wait_films: 99,
            pass_films: 13888,
            notpass_films: 6666,
            tableData: tableData,
            enterData: enterData,
            checkData:checkData
        }
    }
}
Mock.mock('/v1/home/index', 'get', homeData) // home数据

// 影片管理

const filmList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            time_length: Math.ceil(Math.random() * 100) + 60,
            language: Random.language(),
            director: Random.cname(),
            actor: Random.cname(),
            type: Random.csentence(5, 20),
            release_date: Random.date(),
            check_status: Random.checkstatus(),
            status: Random.status(),
            reason: Random.csentence(10, 40)
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/films/list', 'get', filmList) // 电影列表

const filmDown = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/films/down', 'get', filmDown) // 电影下线

const filmDel = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/films/del', 'get', filmDel) // 电影删除

const filmDetail = function () {
    var list = []
    for (var i = 0; i < 3; i++) {
        var item = {
            name: Random.csentence(5, 20),
            image: Random.image(),
            size: '600*320'
        }
        list.push(item)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            chinese_name: Random.filmname(),
            time_length: 60 + Math.ceil(Math.random()*100),
            english_name: 'English Name',
            type: [1, 5, 11],
            country: 1,
            director: [1, 2],
            actor: [2,3],
            language: 2,
            writer: [1, 2, 3],
            release_time: '2018-06-28',
            cover: '/upload/hengxiang.jpg',
            cover1: '/upload/zongxiang.jpg',
            is_new: 1,
            description: '今天很热',
            is_self_content: 1,
            is_charge: 2,
            posters: list
        }
    }
}
Mock.mock('/v1/films/detail', 'get', filmDetail) // 电影详情

const filmOptions = function () {
    //filmType: ['歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史', '歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史'],
    var filmTypeList = [
        {
            id: 1,
            name: '歌舞'
        },
        {
            id: 2,
            name: '情感'
        },
        {
            id: 3,
            name: '爱国'
        },
        {
            id: 4,
            name: '励志'
        },
        {
            id: 5,
            name: '动漫'
        },
        {
            id: 6,
            name: '青春'
        },
        {
            id: 7,
            name: '偶像'
        },
        {
            id: 8,
            name: '历史'
        },
        {
            id: 9,
            name: '歌舞'
        },
        {
            id: 10,
            name: '青春'
        },
        {
            id: 11,
            name: '言情'
        },
        {
            id: 12,
            name: '宫廷'
        },
        {
            id: 13,
            name: '年代'
        }
    ]
    var countryList = [
        {
            id: 1,
            name: '中国'
        },
        {
            id: 2,
            name: '美国'
        },
        {
            id: 3,
            name: '日本'
        }
    ]
    var directorList = [
        {
            id: 1,
            name: '张艺谋'
        },
        {
            id: 2,
            name: '冯小刚'
        },
        {
            id: 3,
            name: '周星驰'
        }
    ]
    var actorList = [
        {
            id: 1,
            name: '李连杰'
        },
        {
            id: 2,
            name: '王宝强'
        },
        {
            id: 3,
            name: '徐峥'
        }
    ]
    var languageList = [
        {
            id: 1,
            name: '国语'
        },
        {
            id: 2,
            name: '英语'
        },
        {
            id: 3,
            name: '日语'
        }
    ]
    var writerList = [
        {
            id: 1,
            name: '张三'
        },
        {
            id: 2,
            name: '李四'
        },
        {
            id: 3,
            name: '王五'
        }
    ]
    return {
        code: 1,
        msg: 'ok',
        data: {
            filmType: filmTypeList,
            country: countryList,
            director: directorList,
            actor: actorList,
            language: languageList,
            writer: writerList
        }
    }
}
Mock.mock('/v1/films/options', 'get', filmOptions) // 电影详情选项

const filmAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/films/add', 'post', filmAdd) // 新增影片

const filmEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/films/edit', 'post', filmEdit) // 编辑影片

const filmCheckList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            time_length: Math.ceil(Math.random() * 100) + 60,
            language: Random.language(),
            director: Random.cname(),
            actor: Random.cname(),
            type: Random.csentence(5, 20),
            release_date: Random.date(),
            check_status: Random.checkstatus(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/films/checkList', 'get', filmCheckList) // 电影审核列表

const filmCheck = function () {
    return {
        code: 1,
        msg: '审核通过成功'
    }
}
Mock.mock('/v1/films/check', 'get', filmCheck) // 电影审核

const trashList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            time_length: Math.ceil(Math.random() * 100) + 60,
            language: Random.language(),
            director: Random.cname(),
            actor: Random.cname(),
            type: Random.csentence(5, 20),
            release_date: Random.date()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/films/trashList', 'get', trashList) // 影片回收列表

const trashReset = function () {
    return {
        code: 1,
        msg: '影片还原成功'
    }
}
Mock.mock('/v1/films/reset', 'get', trashReset) // 回收列表影片还原


// 影片属性管理
const attrArea = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.filmname(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/attr/attrArea', 'get', attrArea) // 影片地区管理

const areaDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            name: Random.region(),
            rename: Random.region(),
            desc: Random.csentence(5, 30),
            status: 1,
            id: 123
        }
    }
}
Mock.mock('/v1/attr/areaDetail', 'get', areaDetail) // 影片地区详情

const areaAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/areaAdd', 'post', areaAdd) // 地区新增

const areaEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/areaEdit', 'post', areaEdit) // 地区编辑

const areaRight = function () {
    return {
        code: 1,
        msg: '权重操作成功'
    }
}
Mock.mock('/v1/attr/areaRight', 'get', areaRight) // 地区权重升降

const areaDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/attr/areaDel', 'get', areaDel) // 影片地区删除

const attrActor = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.cname(),
            english_name: 'Sharke',
            birthday: Random.date(),
            country: Random.region(),
            gender: '男',
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/attr/attrActor', 'get', attrActor) // 影片演员管理

const actorDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            chinese_name: Random.cname(),
            english_name: 'Jams Bob',
            birthday: Random.date(),
            country: '美国',
            gender: 1,
            image: Random.dataImage(),
            content: Random.csentence(5, 30),
            status: 1,
            id: 123
        }
    }
}
Mock.mock('/v1/attr/actorDetail', 'get', actorDetail) // 影片演员详情

const actorAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/actorAdd', 'post', actorAdd) // 演员新增

const actorEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/actorEdit', 'post', actorEdit) // 演员编辑

const actorDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/attr/actorDel', 'get', actorDel) // 影片演员删除

const attrType = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.filmname(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/attr/attrType', 'get', attrType) // 影片类型管理

const typeDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            name: Random.region(),
            rename: Random.region(),
            desc: Random.csentence(5, 30),
            status: 1,
            id: 123
        }
    }
}
Mock.mock('/v1/attr/typeDetail', 'get', typeDetail) // 影片类型详情

const typeAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/typeAdd', 'post', typeAdd) // 类型新增

const typeEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/typeEdit', 'post', typeEdit) // 类型编辑

const typeRight = function () {
    return {
        code: 1,
        msg: '权重操作成功'
    }
}
Mock.mock('/v1/attr/typeRight', 'get', typeRight) // 类型权重升降

const typeDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/attr/typeDel', 'get', typeDel) // 影片类型删除

const attrLanguage = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.filmname(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/attr/attrLanguage', 'get', attrLanguage) // 影片语言管理

const languageDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            name: Random.region(),
            rename: Random.region(),
            desc: Random.csentence(5, 30),
            status: 1,
            id: 123
        }
    }
}
Mock.mock('/v1/attr/languageDetail', 'get', languageDetail) // 影片语言详情

const languageAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/languageAdd', 'post', languageAdd) // 语言新增

const languageEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/attr/languageEdit', 'post', languageEdit) // 语言编辑

const languageRight = function () {
    return {
        code: 1,
        msg: '权重操作成功'
    }
}
Mock.mock('/v1/attr/languageRight', 'get', languageRight) // 语言权重升降

const languageDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/attr/languageDel', 'get', languageDel) // 影片语言删除


// 权限管理
const rightAdmin = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.cname(),
            nickname: 'Sharke',
            team: '平台管理员',
            email: Random.email(),
            login_time: Random.date() + ' ' + Random.time(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/right/rightAdmin', 'get', rightAdmin) // 管理员管理

const adminDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            team: 1,
            username: Random.name(),
            email: Random.email(),
            nickname: Random.cname(),
            tel: 13193122834,
            password: Math.ceil(Math.random() * 1000000),
            login_default: Math.ceil(Math.random() * 10),
            status: 1,
            id: 123
        }
    }
}
Mock.mock('/v1/right/adminDetail', 'get', adminDetail) // 管理员详情

const adminAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/right/adminAdd', 'post', adminAdd) // 管理员新增

const adminEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/right/adminEdit', 'post', adminEdit) // 管理员编辑

const adminDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/right/adminDel', 'get', adminDel) // 管理员删除

const rightLog = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            name: Random.cname(),
            title: '登录',
            created_time: Random.date() + ' ' + Random.time(),
            browser: 'Mozilla/5.0',
            url: Random.url(),
            ip: Random.ip()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/right/rightLog', 'get', rightLog) // 管理员日志

const logDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/right/logDel', 'get', logDel) // 日志删除





// 系统基本设置
const settingEnter = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            check_name: Random.cname(),
            created_time: Random.date() + ' ' + Random.time(),
            check_status: Random.checkstatus(),
            reason: Random.csentence(5, 30),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/enter', 'get', settingEnter) // 消息-录入

const enterDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            film_name: Random.filmname(),
            created_time: Random.datetime(),
            check_name: Random.cname(),
            reason: Random.csentence(5, 30),
            check_status: Random.checkstatus(),
            status: Random.status(),
            id: 123
        }
    }
}
Mock.mock('/v1/setting/enterDetail', 'get', enterDetail) // 消息-录入 详情

const enterDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/setting/enterDel', 'get', enterDel) // 消息-录入 删除

const settingCheck = function () {
let list = []
for (let i = 0; i < 10; i++) {
    let data = {
        id: Random.id(),
        film_name: Random.filmname(),
        is_read: '是',
        created_time: Random.date() + ' ' + Random.time(),
        status: Random.status()
    }
    list.push(data)
}
return {
    code: 1,
    msg: 'ok',
    data: {
        rows: list,
        total: 100
    }
}
}
Mock.mock('/v1/setting/check', 'get', settingCheck) // 消息-审核列表

const checkDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            film_name: Random.filmname(),
            created_time: Random.datetime(),
            is_read: '是',
            status: Random.status(),
            id: Random.id()
        }
    }
}
Mock.mock('/v1/setting/checkDetail', 'get', checkDetail) // 消息-审核 详情

const newsCheck = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/right/newsCheck', 'get', newsCheck) // 消息-审核列表 审核

const settingLetter = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            letter: Random.filmname(),
            right: Math.ceil(Math.random() * 100),
            add_time: Random.date() + ' ' + Random.time(),
            add_name: Random.cname()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/letter', 'get', settingLetter) // 消息-常用词汇

const letterDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            add_name: Random.cname(),
            created_time: Random.datetime(),
            name: Random.csentence(2,4),
            right: Math.ceil(Math.random() * 100),
            id: 123
        }
    }
}
Mock.mock('/v1/right/letterDetail', 'get', letterDetail) // 常用词汇详情

const letterAdd = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/right/letterAdd', 'post', letterAdd) // 常用词汇新增

const letterEdit = function () {
    return {
        code: 1,
        msg: 'ok'
    }
}
Mock.mock('/v1/right/letterEdit', 'post', letterEdit) // 常用词汇编辑

const letterDel = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/right/letterDel', 'get', letterDel) // 消息-常用词汇 删除

const letterRight = function () {
    return {
        code: 1,
        msg: '删除成功'
    }
}
Mock.mock('/v1/right/letterRight', 'get', letterRight) // 消息-常用词汇 权重

const userAdmin = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            title: Random.csentence(5,30),
            link: Random.url(),
            created_time: Random.date() + ' ' + Random.time(),
            ip: Random.ip()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/user/userAdmin', 'get', userAdmin) // 用户管理
