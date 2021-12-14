import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import User, { IUser, UserDocument } from "../models/user.model"
// 生成一个用户
const createUser = async (input: AnyObject | AnyKeys<IUser>) => {
    return User.create(input)
}

// 查找用户
const findUser = (query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) => {
    return User.findOne(query, null, options)
}

// 用户登录
const loginUser = async ({ email, password }: { email: UserDocument["email"]; password: UserDocument["password"] }) => {
    const user = await findUser({ email }, { lean: false })
    if (!user) throw new Error("用户不存在")
    return user.comparePassword(password)
}

// 删除所有的用户
const deleteAllUser = () => {
    return User.deleteMany({})
}
export { createUser, findUser, loginUser, deleteAllUser }
