import { Schema, model, Document, Types } from 'mongoose'

export interface Parent {
    _id?: Schema.Types.ObjectId
    child?: Schema.Types.ObjectId | Record<string, unknown>
    name?: string
}
const parentSchema = new Schema<Parent>({
    child: {type: 'ObjectId', ref: "Child"},
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






