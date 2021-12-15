import mongoose from "mongoose"

import { createXxx, deleteAllXxx, findXxx } from "../src/services/services"
import { xxxPayload, xxxObject } from "./02.x-payload"

const uri = "mongodb://localhost:27017/test"
mongoose.connect(uri)
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

// console.log(
//     typeof xPayload,
// )

// console.log(
//     xxxPayload.name, "\n",
//     // xxxPayload.binary.toString(),
//     xxxPayload.decimal, "\n",
//     xxxPayload.nested.stuff, "\n",
//     xxxPayload.ofString, "\n",
//     xxxPayload._someId, "\n",
//     xxxPayload.ofObjectId
// )

;(async () => {
    const xxx = await findXxx({ name: xxxPayload.name }, { lean: false })
    console.log(xxx!.name)
})()
