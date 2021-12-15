import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import { ParentModel, ChildModel, Child, Parent } from "../models/populate.schema"

const deleteAllChild = async () => {
    return ChildModel.deleteMany({})
}
const deleteAllParent = async () => {
    return ParentModel.deleteMany({})
}


const createChild = async(input: AnyObject | AnyKeys<Child>) => {
    return ChildModel.create(input)
}
const createParent = async(input: AnyObject | AnyKeys<Parent>) => {
    return ParentModel.create(input)
}

const findParentAndChild = async () => {
    const doc = await ParentModel.findOne({}).populate<{ child: Child }>("child")
    return doc
}

export { deleteAllParent, deleteAllChild, createChild, createParent, findParentAndChild  }
