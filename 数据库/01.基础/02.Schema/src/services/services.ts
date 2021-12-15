import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import {IXxx, XxxModel } from '../models/schema'

const deleteAllXxx = async () => {
    return XxxModel.deleteMany({})
}

const createXxxA = async (input: AnyObject | AnyKeys<IXxx> ) => {
    return XxxModel.create(input)
}


export {createXxxA, deleteAllXxx}

