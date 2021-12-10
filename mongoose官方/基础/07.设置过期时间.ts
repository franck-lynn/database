import mongoose, {model, Schema, PopulatedDoc, Document, Query, Model } from "mongoose"
import {IndexDescription, CreateCollectionOptions} from 'mongodb'
//! 定义接口
interface IUser extends Document, IndexDescription{
    name: string
    email: string
    password: string
    meta: {
        createdAt: Date
        updateAt: Date
    }
    avatar?: string
}


//! 定义schema
const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    meta: {
        createdAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() },
    },
    avatar: { type: String },
    expireAfterSeconds: 10
})


// https://mongoosejs.com/docs/guide.html



// const schema = new Schema<>({ name: String, timestamp: Date, metadata: Object }, {
//     timeseries: {
//       timeField: 'timestamp',
//       metaField: 'metadata',
//       granularity: 'hours'
//     },
//     autoCreate: false,
//     expireAfterSeconds: 86400
//   }











