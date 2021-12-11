import mongoose, { Schema, Query, Document, model, Model,  MongooseOptions } from 'mongoose';

const uri = 'mongodb://localhost:27017/test'
// 连接数据库
const connectionOption: MongooseOptions = { useNewuriParser: true, useUnifiedTopology: true }
mongoose.connect(uri, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on('error', console.error.bind(console, 'mongoDB连接异常'))

// https://mongoosejs.com/docs/typescript/query-helpers.html
interface IMovie {
    name: string
    email: string
    avatar?: string
}

const movieSchema = new Schema<IMovie>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: String
})
//! 定义查询助手, 放在 schema 定义之后, 模型定义之前
interface IQueryHelper {
    byName(name: string): Query<IMovie, Document<IMovie>> & IQueryHelper
}
movieSchema.query.byName = function (name: string){
    return this.find({name: name})
}
//! 注意, 模型定义要放在 schema 定义之后才可以
//! 定义模型

const movieModel = model<IMovie, Model<IMovie, IQueryHelper>>('movie', movieSchema)

const run = async() => {
    try {
        const result = await movieModel.find().byName('罗马假日')
        console.log(result)
    } finally {
        mongoose.disconnect()
    }
}

run().catch(err => console.log(err))



