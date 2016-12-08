var db = require('mongoose')
db.connect('mongodb://localhost/books_db');

db.Promise = Promise //

var Schema = db.Schema;
var studentSchema = new Schema({
    name: String,
    gender: String,
    birthday: {
        type: Date,
        default: Date.now
    },
    user_name: String,
    pwd: String,
    mobile: String,
    email: String,
    address: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

/**
 * 通过methods,定义一个instance方法
 * 在模型的实例上进行调用
 */
// 获取年龄
studentSchema.methods.getAge = function () {
    return (new Date()).getFullYear() - this.birthday.getFullYear()
}

// 格式化输出日期数据
studentSchema.methods.getBirthday = function () {
    return (`${this.birthday.getFullYear()}-${this.birthday.getMonth() + 1}-${this.birthday.getDate()}`)
}

/**
 * 定义static方法 通过模型名字加方法名直接调用
 */
studentSchema.statics.findByName = function (name, callBack) {
    this.find({ name: name }, callBack)
}

var bookSchema = new Schema({
    title: String,
    img: String,
    link: String,
    price: Number,
    author: String,
    publisher: String
})

// ref的时候需要指定模型的名字即 db.model()中参数一的值
// mongoose通过population实现集合数据的关联
var studentBookSchema = new Schema({
    booked_date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'dangdang_book'
    }
})
studentBookSchema.methods.getBookedDate = function () {
    return (`${this.booked_date.getFullYear()}-${this.booked_date.getMonth() + 1}-${this.booked_date.getDate()}  ${this.booked_date.getHours()}:${this.booked_date.getMinutes()}`)
}

// 创建数据模型
var Student = db.model('student', studentSchema)
var DangDangBook = db.model('dangdang_book', bookSchema)
var StudentBook = db.model('student_book', studentBookSchema)
module.exports = {
    Student: Student,
    DangDangBook: DangDangBook,
    StudentBook: StudentBook
}