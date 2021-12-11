import mongoose, {model, Schema, MongooseOptions} from "mongoose"
const uri = "mongodb://localhost:27017/test"
// const uri = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewuriParser: true, useUnifiedTopology: true}
mongoose.connect(uri, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// 定义 接口
// interface IMovie {
//     name: string
//     director: string
//     actor: PopulatedDoc<IActor & Document>
//     years: string
// }
interface IActor {
    name: string
    sex: string
    constellation: string
}
// 定义schema
// const movieSchema = new Schema({
//     name: {type: String, required: true},
//     director: {type: String, required: true},
//     actor: {type: 'ObjectId', ref: 'IActor'},
//     years: {type: Date, default: Date.now}
// })
const actorSchema = new Schema({
    name: {type: String, required: true},
    sex: String,
    constellation: String,
})

// 定义类
// const Movie = model('Movie', movieSchema)
const Actor = model("Actor", actorSchema)

const actors: IActor[] = [
    {name: "奥黛丽·赫本", sex: "女", constellation: "金牛座"},
    {name: "高圆圆", sex: "女", constellation: "仙女座"},
]

// 保存数据
const run = async () => {
    try {
        // 现在数据库中查找有没有对应的项目, 没有就插入, 有就跳过
        for (let i = 0; i < actors.length; i++) {
            const exist = await Actor.findOne({name: actors[i].name})
            if (!exist) {
                const a1 = new Actor({
                    name: actors[i].name,
                    sex: actors[i].sex,
                    constellation: actors[i].constellation,
                })
                const result = await a1.save()
                console.log(result)
            }
        }
    } finally {
        mongoose.disconnect()
    }
}
run().catch(console.dir)
