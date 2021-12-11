
import mongoose, {model, Schema, MongooseOptions, PopulatedDoc, Document} from "mongoose"
const uri = 'mongodb://localhost:27017/test'
// const uri = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = { useNewuriParser: true, useUnifiedTopology: true }
mongoose.connect(uri, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on('error', console.error.bind(console, 'mongoDB连接异常'))

// 定义接口
interface IMovie {
    name: string
    director: string
    actor: PopulatedDoc<IActor & Document>
    years: string
}
interface IActor {
    name: string
    sex: string
    constellation: string
}
// 定义 schema
const movieSchema = new Schema({
    name: {type: String, required: true},
    director: {type: String, required: true},
    // 关联 actor 的主键, 告诉 mongoose 查询 movie 时, movie 数据上
    // 有一个关联的其他文档的主键, ref 指的是其他表
    actor: {type: 'ObjectId', ref: 'Actor'}, 
    years: {type: Date, default: Date.now}
})
const actorSchema = new Schema({
    name: {type: String, required: true},
    sex: String,  
    constellation: String
})
// 定义 model
const Movie = model<IMovie>('Movie', movieSchema)
/* eslint-disable @typescript-eslint/no-unused-vars */
const Actor = model<IActor>('Actor', actorSchema)

// 聚合查询
const run = async () => {
    try {
        // const result = await Actor.findOne({name: "奥黛丽·赫本"}).populate('movie', 'name')
        // 只有在数据中有对应的关联主键才可以查到与之关联的数据库, populate 参数是被关联的数据表
        // 的名称, name, constellation 是字段的名称
        const result = await Movie.findOne({name: "罗马假日"}).populate('actor', 'name constellation')
        console.log(result)
    } finally{
        mongoose.disconnect()
    }
}
run().catch(console.dir)
