import mongoose, { Schema, model, Document, Types } from "mongoose"

import { ParentModel, ChildModel, Child, Parent } from "../src/models/populate.schema"
import {
    deleteAllParent,
    deleteAllChild,
    createParent,
    createChild,
    findParentAndChild,
} from "../src/services/populate,service"

const uri = "mongodb://localhost:27017/test"
mongoose.connect(uri)
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

const run = async() => {
    const rs = await findParentAndChild("parentA")
    console.log(rs)
}
run()