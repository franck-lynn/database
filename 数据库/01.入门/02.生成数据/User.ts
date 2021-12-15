import mongoose, { Schema, model, Document, Types } from "mongoose"

const uri = "mongodb://localhost:27017/test"
mongoose.connect(uri)
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

//! 定义接口
interface IUser {
    // _id?: Schema.Types.ObjectId
    name?: string
}
//! 定义schema
const userSchema = new Schema<IUser>({
    // _id: { type: Schema.Types.ObjectId },
    name: { type: String },
})
//! 定义 model
const User = model("User", userSchema)

// 生成数据库
const run1 = async () => {
    const u: IUser = {
        // _id: new Types.ObjectId,
        name: "用户名AAA",
    }
    await User.create(u)
}
run1()
