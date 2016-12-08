var express = require('express');
var router = express.Router();
var db = require('../../db')

// 可以登录的管理员信息
var arrAdmin = [
    {
        userName: 'admin',
        userPWD: 'admin'
    }, {
        userName: 'admin001',
        userPWD: '123456'
    }
]

router.get('/', (req, res) => {
    res.render('admin/admin_user/login')
})

router.post('/', (req, res) => {
    var userName = req.body.userName
    var userPWD = req.body.userPWD
    console.log(req.body)
    var result = arrAdmin.find((item) => {
        if (item.userName == userName) {
            return item
        }
    })
    if (result) {
        if (result.userPWD == userPWD) {
            res.json({ status: 'y', msg: '登陆成功' })
        }
        else {
            res.json({ status: 'n', msg: '密码错误' })
        }
    }
    else {
        res.json({ status: 'n', msg: '用户信息不存在' })
    }
})


module.exports = router