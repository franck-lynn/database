import {createX} from '../src/services/service'
import {xPayload} from './02.x-payload'

import mongoose from "mongoose"


const uri = "mongodb://localhost:27017/test"
mongoose.connect(uri)
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"));



(async() => {
    const result = await createX(xPayload)
    console.log(result)
})()



