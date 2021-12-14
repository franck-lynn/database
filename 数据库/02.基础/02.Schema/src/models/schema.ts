import { Schema, model } from "mongoose"
import { ObjectId } from 'mongodb'

export interface IX {
    // 可选与否可以不在这里定义, 
    // 在 schema 中没有 required 属性的都是可选的
    name: string
    binary: Buffer
    living: boolean
    update: Date
    age: number
    integerOnly: number
    _someId: Schema.Types.ObjectId,
    // _someId: ObjectId, // 不行, 有冲突
    decimal: Schema.Types.Decimal128
    arr: string[]
    ofString: string[]
    ofNumber: number[]
    ofMixed: Schema.Types.Mixed[]
    ofObjectId:  Schema.Types.ObjectId 
    ofArray: string[][] // 二维数组
    nested: {
        stuff: string
    }
}
const xSchema = new Schema<IX>({
    // schema 的选项
    // index 是否对这个对象创建索引, unique: 布尔值 是否对这个属性创建唯一索引
    name: { type: String, index: true, unique: true },
    binary: { type: Buffer },
    living: { type: Boolean },
    update: { type: Date, default: new Date() },
    age: { type: Number, min: 0, max: 200 },
    integerOnly: {
        type: Number,
        get: (v: number): number => Math.round(v),
        set: (v: number) => Math.round(v) ,
        // alias: "i",
    },
    _someId: { type: Schema.Types.ObjectId },
    // _someId: { type: ObjectId }, // 不行, 有冲突
    decimal: Schema.Types.Decimal128,
    arr: { type: [String] },
    ofString: { type: [String] },
    ofNumber: { type: [Number] },
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: Schema.Types.ObjectId,
    ofArray: [[String]],
    nested: {
        stuff: {type: String, uppercase: true},
    },
})

// xSchema.index({name: 1})

const XModel = model<IX>("User", xSchema)
export { XModel }
