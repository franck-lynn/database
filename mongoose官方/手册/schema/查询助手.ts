import mongoose, {model, Schema, MongooseOptions, Document, Query, Model } from "mongoose"

const uri = "mongodb://localhost:27017/test"
// const uri = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewuriParser: true, useUnifiedTopology: true}
mongoose.connect(uri, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 查询助手
interface IActor extends Document{
    name: string
    sex: string
    constellation: string
}
const actorSchema = new Schema<IActor>({
    name: {type: String, required: true},
    sex: {type: String, required: true},
    constellation: String,
})

interface IQueryHelper {
    byName(name: string): Query<IActor, Document<IActor>> & IQueryHelper
}

actorSchema.query.byName = function (name: string){
    return this.find({name: name})
}

const Actor = model<IActor, Model<IActor, IQueryHelper>>('Actor', actorSchema)

const run = async() => {
    try {
        const result = await Actor.find().byName('奥黛丽·赫本')
        console.log(result)
    } finally {
        mongoose.disconnect()
    }
}

run().catch(err => console.log(err))