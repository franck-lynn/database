// https://docs.mongodb.com/drivers/node/current/usage-examples/updateOne/

import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const movies = database.collection("movies")
        const filter = {name: "Red"}
        // 这个选项是如果没有找到匹配的文档就创建一个
        const options = {upsert: true}
        const updateDoc = {
            $set: {name: "简爱", plot: "Blacksmith 是一部无声电影 by william K.L. Dickson"},
        }
        const result = await movies.updateOne(filter, updateDoc, options)
        console.log(`${result.matchedCount} 条匹配的文档, 更新了 ${result.modifiedCount} 条文档`)
    } finally {
        client.close()
    }
}

run().catch(console.dir)
