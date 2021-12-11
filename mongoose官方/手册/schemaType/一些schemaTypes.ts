import mongoose, {model, Schema, MongooseOptions} from "mongoose"

const uri = "mongodb://localhost:27017/test"
// const uri = "mongodb://localhost:27017"
// 连接数据库
const connectionOption: MongooseOptions = {useNewuriParser: true, useUnifiedTopology: true}
mongoose.connect(uri, connectionOption, () => console.log("数据库连接成功"))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

interface IActor {
    name: string
    binary: Buffer
    living: boolean
    update: Schema.Types.Date
    age: number
    mixed: Schema.Types.ObjectId
    decimal: Schema.Types.Decimal128
    array: string[]
    ofNumber: number[]
    ofDates: Date[]
    ofBoolean: boolean[]
    map: Map<string, string>
    nexted: {
        stuff: string
    }
    mapOfString: {
        type: Map<string, string>
        of: string
    }
}

const actorSchema = new Schema<IActor>({
    name: String,
    binary: Buffer,
    living: Boolean,
    update: {type: Date, dedault: Date.now},
    age: {type: Number, min: 18, max: 90},
    mixed: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBoolean: [Boolean],
    map: Map,
    nested: {
        stuff: {type: String, lowercase: true, trim: true},
    },
    mapOfString: {
        type: Map,
        of: String,
    },
})

const Actor = model<IActor>("Actor", actorSchema)

const a1 = new Actor({
    name: "张无忌",
    binary: Buffer.alloc(4),
    living: true,
    update: Date.now(),
    age: 21,
    decimal: 666,
    array: ["张", "无", "忌"],
    ofNumber: 10,
    ofDates: ["2021-08-20", Date.now()],
    ofBoolean: [true, false],
    map: new Map().set("key", "value"),
    nested: {stuff: "Alice"},
    mapOfString: new Map().set("key", "value")  
})

const run = async () => {
    try {
        const exist = await Actor.findOne({name: "张无忌"})
        // console.log(exist)
        if (!exist) {
            const aa = await Actor.create(a1)
            console.log(aa)
        } else {
            console.log(exist)
        }
    } finally {
        mongoose.disconnect()
    }
}

run().catch(console.dir)
