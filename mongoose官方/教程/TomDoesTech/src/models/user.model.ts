import { CallbackError, model, Schema, Document }   from 'mongoose'
import {genSalt, hashSync, compare} from 'bcryptjs'
// https://www.youtube.com/watch?v=TbT7eO1fxuI
export interface IUser {
    firstname: string
    lastname: string
    email: string
    password: string
}
// Document 是一个类类型, 有构造函数, _id, __v, 等等这些属性
export interface UserDocument extends IUser, Document{
    fullname: string
    creaatedAt: Date
    updateAt: Date
    comparePassword: (CandidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    email: {type: String, required: true , unique: true},
    firstname: {type: String, required: true },
    lastname: {type: String, required: true },
    password: {type: String, required: true },
})

userSchema.index({email: 1})

// 虚拟方法
userSchema.virtual("fullname").get(function (this: UserDocument){
    return `${this.firstname}${this.lastname}`
})
// 当用户注册时
userSchema.pre("save", async function (this:UserDocument, next: (err?: CallbackError) => void) {
    // 仅当修改或者新的时候执行
    if(!this.isModified("password")) return next()
    // 随机盐
    const salt = await genSalt(12)
    const hash = hashSync(this.password, salt)
    this.password = hash
    return next()
})
// 比较密码
userSchema.methods.comparePassword = async function (CandidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    return compare(CandidatePassword, user.password).catch((e: Error) => false)
}

export default model<UserDocument>("User", userSchema)
// https://github.com/TomDoesTech/The-Ultimate-Guide-to-TypeScript-With-Mongoose
