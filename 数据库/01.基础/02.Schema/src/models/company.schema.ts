
import { Document, Model, model, Types, Schema, Query } from "mongoose"

//! 继承了 Document, 就有了 _id 属性了, 不需要再定义
export interface Company extends Document{
    name: string
}