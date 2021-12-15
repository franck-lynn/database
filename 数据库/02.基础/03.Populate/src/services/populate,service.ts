import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import { ParentModel, ChildModel, Child, Parent } from "../models/populate.schema"
// 删除
const deleteAllChild = async () => {
    return ChildModel.deleteMany({})
}
const deleteAllParent = async () => {
    return ParentModel.deleteMany({})
}
// 生成
const createChild = async (input: AnyObject | AnyKeys<Child>) => {
    return ChildModel.create(input)
}
const createParent = async (input: AnyObject | AnyKeys<Parent>) => {
    return ParentModel.create(input)
}

const findParentAndChild = async (name: string) => {
    const doc = await ParentModel.findOne({name}).populate("child")
    return doc
}

export { deleteAllParent, deleteAllChild, createChild, createParent, findParentAndChild }
