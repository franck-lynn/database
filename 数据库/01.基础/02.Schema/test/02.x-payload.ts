import { XxxModel, IXxx  } from '../src/models/schema'
import mongoose, { Schema, model } from "mongoose"
import {Decimal } from 'decimal.js'

const xxxPayload = new XxxModel({
    name: "迪丽", // string 类型
    binary: Buffer.from('runoob', 'ascii'), // Buffer 类型
    living: true, // boolean 类型
    update: new Date(), //日期类型
    age: 12, // number 类型
    integerOnly: 12.02,  // 整数类型
    _someId: new mongoose.Types.ObjectId ,
    decimal: new Decimal(16) , // Decimal 类型
    arr: ["a", "b"], // string[] 类型
    ofString: ["c", "d"], // string[] 类型
    ofNumber: [1, 2, 3],  // number[] 类型
    ofMixed: [], // 啥都可以的类型
    ofObjectId: [new mongoose.Types.ObjectId, new mongoose.Types.ObjectId], 
    ofArray: [['A'], ["B", "C"]], // string[[]] 类型
    nested: {
        stuff: "stuff"
    }
})

const xxxObject: IXxx = {
    name: "热巴", 
    binary: Buffer.from('runoob', 'ascii'), // Buffer 类型
    living: true, // boolean 类型
    update: new Date(), //日期类型
    age: 12, // number 类型
    integerOnly: 12.02,  // 整数类型
    _someId: new mongoose.Types.ObjectId ,
    decimal: new Decimal(16) , // Decimal 类型
    arr: ["a", "b"], // string[] 类型
    ofString: ["c", "d"], // string[] 类型
    ofNumber: [1, 2, 3],  // number[] 类型
    ofMixed: [], // 啥都可以的类型
    ofObjectId: [new mongoose.Types.ObjectId, new mongoose.Types.ObjectId], 
    ofArray: [['A'], ["B", "C"]], // string[[]] 类型
    nested: {
        stuff: "stuff"
    }
}

export { xxxPayload, xxxObject }