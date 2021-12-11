// https://docs.mongodb.com/drivers/node/current/usage-examples/replaceOne/
import {MongoClient} from "mongodb"

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const users = database.collection("users")
        // 查找符合 name:Blue 条件的文档
        const query = {name: "Blue"}
        const options = {upsert: true}
        // 将符合条件的文档替换成下面的
        const replacement = {
            name: "令狐冲",
            plot: "打印",
        }
        // replaceOne 是整个文档的替换, 并非只是更新一部分
        const result = await users.replaceOne(query, replacement, options)

        if (result.modifiedCount === 0 && result.upsertedCount === 0) {
            console.log("集合内没有任何变化")
        } else {
            if (result.matchedCount === 1) {
                console.log(`${result.matchedCount} 匹配`)
            }
            if (result.modifiedCount === 1) {
                console.log(`修改了一项文档`)
            }
            if (result.upsertedCount === 1) {
                console.log(`插入了一项文档, 文档的 _id 是: ${result.upsertedId}`)
            }
        }
    } finally {
        client.close()
    }
}
run().catch(console.dir)
