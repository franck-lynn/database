
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import mongoose, {model, Schema, MongooseOptions, Document } from "mongoose"

const url = "mongodb://localhost:27017/test"
// const url = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(url, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 为用户模型创建一个接口, 一个扩展了 Document 接口 会将 save, remove 等添加进来
interface IActor extends Document{
    email: string
    firstname: string
    lastname: string
}

interface IMovie extends Document{
    name: string
    owner: IActor['_id']
}
const MovieSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: {type: 'ObjectId', required: true, ref: 'Actor'}
})

// 创建模型
const Movie = model<IMovie>('Movie', MovieSchema)

const run = async () => {
    try {
        const exist = await Movie.findOne({name: '天龙八部'})
        if (!exist) {
            const m1 = await Movie.create(new Movie({
                name: '天龙八部',
                owner: '6112803988de610850d5ffb1'
            }))
            console.log(m1)
        }else{
            console.log(exist)
        }
    } finally {
        mongoose.disconnect()
    }
}

run().catch(console.dir)

// MovieSchema.pre<IActor>('save', function (){
//     console.log(this)
// })
