import mongoose, {model, Schema, MongooseOptions, Document } from "mongoose"

const url = "mongodb://localhost:27017/test"
// const url = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(url, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

const ActorSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true}
})
// 为用户模型创建一个接口, 一个扩展了 Document 接口 会将 save, remove 等添加进来
interface IActor extends Document{
    email: string
    firstname: string
    lastname: string
}
// 创建模型
const Actor = model<IActor>('Actor', ActorSchema)

const run = async () => {
    try {
        const exist = await Actor.findOne({email: "zzr@163.com"})
        if (!exist) {
            const actor = await Actor.create(new Actor({
                email: 'zzr@163.com',
                firstname: '周芷若',
                lastname: '峨眉掌门'
            }))
            console.log(actor)
        }
    } finally {
        mongoose.disconnect()
    }
}

run().catch(console.dir)
