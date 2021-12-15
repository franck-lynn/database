// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
// https://gist.github.com/WangHansen/f23f70b758bb9f38fc68414c809e765f#file-userschema-ts
import { Document, Model, model, Types, Schema, Query, CallbackError } from "mongoose"
import { Company } from "./company.schema"
import {genSalt, hashSync, compare} from 'bcryptjs'


enum Gender {
    Male = 1,
    Female = 0,
}

export interface User {
    name: string
    password: string
    company: Types.ObjectId | Record<string, unknown>
    gender: Gender
    friends: Array<string>
    creditCards: Map<string, string>
}
/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 * 不要直接导出这个接口, 因为不推荐使用, 除非有必要
 * 因为 company 字段类型不确定
 */
interface UserBaseDocument extends User, Document {
    friends: Types.Array<string>
    creditCards: Types.Map<string>
    name: string
    getGender: () => string
}
// Export this for strong typing
// 导出这个强类型接口
export interface UserDocument extends UserBaseDocument {
    company: Company["_id"]
}
// Export this for strong typing
// 导出这个强类型接口
// Export this for strong typing
/*
 接口“UserPopulatedDocument”错误扩展接口“UserBaseDocument 
 属性“company”的类型不兼容。
 不能将类型“Company”分配给类型“ObjectId | Record<string, unknown> 
 不能将类型“Document<any, any, any>”分配给类型“Record<string, unknown> 
 类型“Document<any, any, any>”中缺少类型“string”的索引签名  
 */

// export interface UserPopulatedDocument extends UserBaseDocument {
//     company: Company
// }

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, require: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    gender: { type: Number, enum: [0, 1], default: 0, required: true },
    friends: [{ type: String }],
    creditCards: { type: Map, of: String },
})

// Methods
userSchema.methods.getGender = function (this: UserBaseDocument) {
    return this.gender > 0 ? "Male" : "Female"
}


// For model
// export interface UserModel extends Model<UserDocument> {
//     findMyCompany(id: string): Promise<UserPopulatedDocument>
// }


// Static methods
userSchema.statics.findMyCompany = async function (this: Model<UserDocument>, id: string) {
    return this.findById(id).populate("company").exec()
}

// Document middlewares
userSchema.pre<UserDocument>("save", async function (this:UserDocument, next: (err?: CallbackError) => void) {
    if (this.isModified("password")) {
        const salt = await genSalt(12)
        this.password = hashSync(this.password, salt)
    }
})

// Query middlewares
// userSchema.post<Query<UserDocument, UserDocument>>("findOneAndUpdate", async function (doc) {
//     await updateCompanyReference(doc)
// })

// Default export
export default model<UserDocument>("User", userSchema)
