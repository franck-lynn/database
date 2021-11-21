// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
import mongoose, {model, Schema, MongooseOptions, Document} from "mongoose"

const url = "mongodb://localhost:27017/test"
// const url = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(url, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 为用户模型创建一个接口, 一个扩展了 Document 接口 会将 save, remove 等添加进来
interface IActor extends Document {
    email: string
    firstname: string
    lastname: string
    // fullname: string  //! 使用虚拟方法, 要在这里增加一个属性 
}
interface IActorPlus extends IActor{
    fullname?: string   
}
const ActorSchema = new Schema<IActor>({
    //! unique: true 使用这个会产生警告
    email: {type: String, required: true, createIndexes: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
})

// 虚拟方法, 中间件创建了一个虚拟属性, 而不是一个方法,  fullname 虚拟方法调用 get 函数
ActorSchema.virtual("fullname").get(function (this: IActor) {
    return this.firstname + "---" + this.lastname 
})

//! 创建模型, model 需要 fullname 定义的属性
const Actor = model<IActorPlus>("Actor", ActorSchema)


const run = async () => {
    try {
        
        // const exist = await Actor.findOne({email: "zm@163.com"})
        // console.log(exist)
        const zm = new Actor({
            email: "zm@163.com",
            firstname: "赵敏",
            lastname: "明教教主夫人",
        })
        console.log(
            zm.fullname
        )
        
        // if (!exist) {
        //     const actor = await Actor.create(
        //         new Actor({
        //             email: "zm@163.com",
        //             firstname: "赵敏",
        //             lastname: "明教教主夫人",
        //         })
        //     )
        //     console.log(actor)
        // }
    } finally {
        mongoose.disconnect()
    }
}

run().catch(console.dir)
