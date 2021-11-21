import { Document, Schema, SchemaType } from 'mongoose';

interface IActor extends Document{
    name: string
}

const actorSchema = new Schema<IActor>({
    name: String
})

const isSchemaType = actorSchema.path('name') instanceof SchemaType
console.log(isSchemaType)
const isSchemaTypesString = actorSchema.path('name') instanceof Schema.Types.String
console.log(isSchemaTypesString)
// const schemaString = actorSchema.path('name').unique(true)
// console.log(
//     schemaString
// )
/*
SchemaString {
  enumValues: [],
  regExp: null,
  path: 'name',
  instance: 'String',
  validators: [],
  getters: [],
  setters: [],
  _presplitPath: [ 'name' ],
  options: SchemaStringOptions { type: [Function: String] },
  _index: null,
  [Symbol(mongoose#schemaType)]: true
}
*/