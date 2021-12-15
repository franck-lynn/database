import { Schema, model, Document, Types } from 'mongoose'

export interface Parent {
    _id?: Schema.Types.ObjectId
    child?: Schema.Types.ObjectId | Record<string, unknown>
    name?: string
}
const parentSchema = new Schema<Parent>({
    //! 关联的是哪张表? ref 值得是表名称, 和 model( 里的参数一致 )
    child: {type: 'ObjectId', ref: "User"},
    name: String
})

export interface Child {
    _id?: Schema.Types.ObjectId
    name: string
}
const childSchema: Schema = new Schema<Child>({
    name: String
})

const ParentModel = model<Parent>("Company", parentSchema)
const ChildModel = model<Child>("User", childSchema)
 
export {ParentModel, ChildModel}






