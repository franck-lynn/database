/*
查询
模糊查询
范围查询 $in :[], 在这些范围,
        $not: 不在这个范围
        $gt $lt $gte $lte
并且的关系 {a, b} 
    例如:
    db.user.find(
        {$or: 
           [{age: {$lt: 3}} , {age: {$gt: 5}}]
        }
    )
分页查询
    let pagesize = 2
    let limit = 2
    db.user.find().limit(limit)
    db.user.find().limit(limit).skip((pagesize -1) * limit)
    db.user.find().limit(limit).skip((pagesize -1) * limit)
    可以使用 sort().limit().skip()
*/
// https://www.bilibili.com/video/BV1dp4y1C7tn?from=search&seid=10105126549739031239

import mongoose, {model, Schema, MongooseOptions, PopulatedDoc, Document, Query, Model} from "mongoose"
const uri = "mongodb://localhost:27017/test"
// 连接数据库
mongoose.connect(uri,  () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 定义 接口
interface IMovie {
    name: string
    director: string
    actor: PopulatedDoc<IActor & Document>
    years: Date
}
interface IActor {
    name: string
    sex: string
    constellation: string
}

// 定义schema
const movieSchema = new Schema<IMovie>({
    name: {type: String, required: true},
    director: {type: String, required: true},
    actor: {type: "ObjectId", ref: "IActor"},
    years: {type: Date, default: Date.now},
})
// const actorSchema = new Schema({
//     name: {type: String, required: true},
//     sex: String,
//     constellation: String
// })


// const Actor = model('Actor', actorSchema)

//! 定义查询助手, 放在 schema 定义之后, 模型定义之前
// 1. 定义接口
interface IQueryHelpers {
    // 要查询的是数据库的哪个字段? 返回值类型
    byName(name: string): Query<IMovie, Document<IMovie>> & IQueryHelpers
}
// 2.定义 byName 函数
movieSchema.query.byName = function (name): Query<IMovie, Document<IMovie>> & IQueryHelpers{
    console.log("输入的名字", name)
    return this.find({name: name})
}

//! 注意, 模型定义要放在 schema 定义之后才可以
//! 定义模型
// 默认是小写加 s, 可以指定自己的集合名称
const Movie = model<IMovie, Model<IMovie, IQueryHelpers>>("Movie", movieSchema, "movies")

// 模糊查询
const query = async () => {
    try {
        // const result = await Movie.find().where('years').equals('1956-01-01T00:00:00.000Z') 
        const result = await Movie.find().byName('罗马假日') 
        console.log(result)
    } finally {
        mongoose.disconnect()
    }
}
query().catch(console.dir)

/* 
// 准备一些数据
const movies: IMovie[] = [
    {name: "罗马假日", director: "威廉·惠勒", actor: "610e8b2c952a1836d44c67ee", years: "1953"},
    {name: "窈窕淑女", director: "乔治·库克", actor: "610e8b2c952a1836d44c67ee", years: "1964"},
    {name: "战争与和平", director: "金·维多", actor: "610e8b2c952a1836d44c67ee", years: "1956"},
]

// 插入集合
const run = async () => {
    try {
        for (let i = 0; i < movies.length; i++){
            const exist = await Movie.findOne({name: movies[i].name})
            if(!exist){
                await Movie.create(new Movie({
                    name: movies[i].name,
                    director: movies[i].director,
                    actor: movies[i].actor,
                    years: movies[i].years,
                }))
            }
        }
    } finally {
        mongoose.disconnect()
    }
}
run().catch(console.dir)
 */

