import mongoose, { model, Schema }   from 'mongoose'
import bcrypt from 'bcryptjs'
// https://www.youtube.com/watch?v=TbT7eO1fxuI
export interface IUser {
    firstname: string
    lastname: string
    email: string
    password: string
}

export interface UserDocument extends IUser, mongoose.Document{
    fullname: string
    creaatedAt: Date
    updateAt: Date
    comparePassword: (CandidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {type: String, required: true , unique: true},
    firstname: {type: String, required: true },
    lastname: {type: String, required: true },
    password: {type: String, required: true },
})

userSchema.index({email: 1})

// 虚拟方法
userSchema.virtual("fullname").get(function (this: UserDocument){
    return `${this.firstname} ${this.lastname}`
})
// 当用户注册时
userSchema.pre("save", async function (this:UserDocument, next: mongoose.HookNextFunction) {
    // 仅当修改或者新的时候执行
    if(!this.isModified("password")) return next()
    // 随机盐
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
    return next()
})
// 比较密码
userSchema.methods.comparePassword = async function (CandidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    return bcrypt.compare(CandidatePassword, user.password).catch((e) => false)
}

export default model<UserDocument>("User", userSchema)
// https://github.com/TomDoesTech/The-Ultimate-Guide-to-TypeScript-With-Mongoose
