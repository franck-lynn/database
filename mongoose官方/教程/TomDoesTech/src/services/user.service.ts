import { AnyKeys, AnyObject, FilterQuery, QueryOptions} from 'mongoose'
import User, { IUser, UserDocument } from '../models/user.model'

const createUser = async (input: AnyObject | AnyKeys<IUser>) => {
    return await User.create(input)
}

const findUser = (query: FilterQuery<UserDocument>, options: QueryOptions) => {
    return User.findOne(query, null, options)
}

export {createUser, findUser}