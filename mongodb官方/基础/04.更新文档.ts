// https://docs.mongodb.com/drivers/node/current/usage-examples/updateOne/

import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const users = database.collection("users")
        const filter = {name: "Red"}
        // 这个选项是如果没有找到匹配的文档就创建一个
        const options = {upsert: true}
        const updateDoc = {
            // 没有修改的字段会保留下来
            $set: {name: "赵敏", email: "zhaomin@163.com"},
        }
        const result = await users.updateOne(filter, updateDoc, options)
        console.log(`${result.matchedCount} 条匹配的文档, 更新了 ${result.modifiedCount} 条文档`)
    } finally {
        client.close()
    }
}

run().catch(console.dir)
