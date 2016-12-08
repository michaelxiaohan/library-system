var express = require('express')
var router = express.Router()
var db = require('../db')
var DangDangBook = db.DangDangBook
var Student = db.Student
var StudentBook = db.StudentBook
// 渲染列表页面
router.get('/list',(req,res)=>{
    // 判断cookie值是否存在确定用户有没有登陆
    if(req.cookies.user_id){
        Student.findById(req.cookies.user_id)
            .then(data=>{
                res.render('book/list',{isLogined:true,user:data})
            })
    }
    else{
        res.render('book/list',{isLogined:false})
    } 
})
// 获取json数据
router.get('/get_data/:page?',(req,res)=>{
    var currentPage = 1
    var pageSize = 10
    if(req.params.page){
        currentPage = Number(req.params.page)
    }
    if(currentPage<=0){
        currentPage=1
    }
    DangDangBook.find().limit(pageSize).skip((currentPage-1)*pageSize)
        .then(data=>{
            res.json({status:'y',data:data,current_page:currentPage})
        })
        .catch(err=>{
            console.log(err)
            res.json({status:'n',data:[],msg:'获取数据失败'})
        })
})
// StudentBook.find()
//     .populate('book_id')
//     .populate('user_id')
//     .then(data=>{
//         console.log('00000000')
//         console.log(data[0])
//     })
router.post('/pick',(req,res)=>{ 
    if(req.cookies.user_id){
        console.log(req.body)
        var sb = new StudentBook() //学生借阅书籍信息
        sb.user_id = req.cookies.user_id
        sb.book_id = req.body.id
        sb.save()
            .then(data=>{
                if(data){
                    console.log(data)
                }
                res.json({
                    status:'y',
                    msg:'借阅成功,请注意爱护公共财物'
                })
            })  
    }
    else{
        res.json({
            status:'n',
            msg:'请先登录'
        })
    }
})

module.exports = router