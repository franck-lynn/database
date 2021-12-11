// https://docs.mongodb.com/drivers/node/current/usage-examples/deleteMany/

import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const users = database.collection("users")
        const query = {name: '赵敏'}

        const result = users.deleteMany(query)
        console.log("删除了 " + (await result).deletedCount + "条文档")
    }finally{
        client.close()
    }
}

run().catch(console.dir)
