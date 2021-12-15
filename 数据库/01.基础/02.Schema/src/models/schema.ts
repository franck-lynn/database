import { Schema, model, Document, Model } from "mongoose"
import { ObjectId } from "mongodb"
import { Decimal } from "decimal.js"

export interface IXxx {
    // 可选与否可以不在这里定义,
    // 在 schema 中没有 required 属性的都是可选的
    name: string
    binary: Buffer
    living: boolean
    update: Date
    age: number
    integerOnly: number
    // _someId: Schema.Types.ObjectId
    _someId: ObjectId
    // decimal: Schema.Types.Decimal128
    decimal: Decimal
    arr: string[]
    ofString: string[]
    ofNumber: number[]
    ofMixed: Schema.Types.Mixed[]
    ofObjectId: ObjectId[]
    ofArray: string[][]
    nested: {
        stuff: string
    }
}
const xxxSchema = new Schema<IXxx, Model<IXxx>>({
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
        set: (v: number) => Math.round(v),
        // alias: "i",
    },
    _someId: { type: Schema.Types.ObjectId },
    // decimal: Schema.Types.Decimal128,
    decimal: Decimal,
    arr: { type: [String] },
    ofString: { type: [String] },
    ofNumber: { type: [Number] },
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArray: [[String]],
    nested: {
        stuff: { type: String, uppercase: true },
    },
})

const XxxModel = model<IXxx>("User", xxxSchema)
export { XxxModel }
