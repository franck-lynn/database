import {IX, XModel} from '../models/schema'
import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"


// 由于name 键值唯一, 再次运行时会出现冗余错误
const createX = async (input:  AnyObject | AnyKeys<IX>) => {
    return  XModel.create(input)
}
// 删除所有的用户
const deleteAllX = () => {
    return XModel.deleteMany({})
}
export {createX, deleteAllX}