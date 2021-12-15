import { ParentModel, ChildModel, Child, Parent } from "../models/populate.schema"

const findParentAndChild = async () => {
    const doc = await ParentModel.findOne({}).populate<{ child: Child }>("child")
    return doc
}

export { findParentAndChild }
