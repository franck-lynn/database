import mongoose, {model, Schema, MongooseOptions, Document} from "mongoose"

const url = "mongodb://localhost:27017/test"
// const url = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(url, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

//! 1. 创建一个表示文档的接口
interface IMovie extends Document {
    title: string
    author: string
    body: string
    comments: [{body: string; date: Date}]
    date: Date
    hidden: boolean
    meta: {
        vote: number
        favs: number
    }
}

//! 2. 定义 scheam, 创建与文档接口对应的 Schema
const movieSchema = new Schema<IMovie>({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number,
    },
})

// ids 默认的, mongoose 会增加一个 id, 也可以自己指定. 但是要在保存之前定义
// console.log(movieSchema.path('_id'))
// 例如: doc._id = 1
// 原型方法

const Movie = model<IMovie>("Movie", movieSchema)

// 现在, 所有的 movie 实例上都有了 findTitle 这个方法
const a1 = new Movie({
    title: "007",
    author: "皮尔斯.布鲁斯南",
    body: "黄金眼",
    comments: [{body: "看过", date: "2021-08-09"}],
    hidden: false,
    meta: {
        votes: 1,
        favs: 2,
    },
})

const run = async (): Promise<void> => {
    try {
        const exist = await Movie.findOne({title: "007"})
        if (!exist) {
            const movie = await Movie.create(a1)
            console.log(movie)
        }
    } finally {
        mongoose.disconnect()
    }
}

run().catch(console.dir)
// https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
