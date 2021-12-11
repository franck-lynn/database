import mongoose, {model, Schema, MongooseOptions} from "mongoose"
const uri = "mongodb://localhost:27017/test"
// const uri = "mongodb://localhost:27017/replicaSet=my_repl"

// const main = async () => {
//     await mongoose.connect(uri)
// }
// main().catch(err => console.log(err))

// 连接数据库
// const connectionOption: MongooseOptions = {useNewuriParser: true, useUnifiedTopology: true}
mongoose.connect(uri,  () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 定义 接口
interface IActor {
    name: string
    sex: string
    constellation: string
}
const actorSchema = new Schema<IActor>({
    name: {type: String, required: true},
    sex: String,
    constellation: String,
})
const Actor = model<IActor>("Actor", actorSchema)
const a1 = new Actor({
    name: "奥黛丽·赫本",
    sex: "女",
    constellation: "金牛座",
})
const run = async () => {
    try {
        // 先进行查询
        const exist = await Actor.findOne({name: a1.name})
        if (!exist) {
            const result = await Actor.create(a1)
            console.log(`${result}`)
        }
    } finally {
        mongoose.disconnect()
    }
}

run().catch((err) => console.log(err))

// 保存
// movie
//     .save()
//     .then(() => console.log("meow"))
//     .then(() => mongoose.disconnect())
