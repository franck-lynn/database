import { XModel, IX  } from '../src/models/schema'
import mongoose, { Schema, model } from "mongoose"
import {Decimal } from 'decimal.js'
import {ObjectId} from 'mongodb'

const xPayload = new XModel({
    name: "迪丽", // string 类型
    binary: Buffer.from('runoob', 'ascii'), // Buffer 类型
    living: true, // boolean 类型
    update: new Date(), //日期类型
    age: 12, // number 类型
    integerOnly: 12.02,  // 整数类型
    _someId:  new ObjectId ,
    decimal: new Decimal(16) , // Decimal 类型
    arr: ["a", "b"], // string[] 类型
    ofString: ["c", "d"], // string[] 类型
    ofNumber: [1, 2, 3],  // number[] 类型
    ofMixed: [], // 啥都可以的类型
    ofObjectId: new mongoose.Types.ObjectId, 
    ofArray: [['A'], ["B", "C"]], // string[[]] 类型
    nested: {
        stuff: "stuff"
    }
    
})

const xObject: IX = {
    name: "热巴", // string 类型
    binary: Buffer.from('runoob', 'ascii'), // Buffer 类型
    living: true, // boolean 类型
    update: new Date(), //日期类型
    age: 12, // number 类型
    integerOnly: 12.02,  // 整数类型
    _someId:  new ObjectId,
    // decimal: new Decimal(16) , // Decimal 类型
    // decimal:  new mongoose.Types.Decimal128('16'), // Decimal 类型
    decimal: new Decimal(16), 
    arr: ["a", "b"], // string[] 类型
    ofString: ["c", "d"], // string[] 类型
    ofNumber: [1, 2, 3],  // number[] 类型
    ofMixed: ["123", ["e"], "f"], // 啥都可以的类型
    ofObjectId: new mongoose.Types.ObjectId , 
    ofArray: [['A'], ["B", "C"]], // string[[]] 类型
    nested: {
        stuff: "stuff"
    }
}

export { xPayload, xObject }