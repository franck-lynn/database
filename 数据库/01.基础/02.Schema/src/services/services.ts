import { AnyKeys, AnyObject, FilterQuery, QueryOptions } from "mongoose"
import {IXxx, XxxModel } from '../models/schema'

const deleteAllXxx = async () => {
    return XxxModel.deleteMany({})
}

const createXxx = async (input: AnyObject | AnyKeys<IXxx> ) => {
    return XxxModel.create(input)
}

const findXxx = async(query: FilterQuery<IXxx>, options: QueryOptions = { lean: true }) => {
    return XxxModel.findOne(query, null, options)
}

export {createXxx, deleteAllXxx, findXxx}

