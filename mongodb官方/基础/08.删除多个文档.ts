// https://docs.mongodb.com/drivers/node/current/usage-examples/deleteMany/

import {MongoClient} from "mongodb"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const movies = database.collection("movies")
        const query = {title: 'Santa Clays'}

        const result = movies.deleteMany(query)
        console.log("删除了 " + (await result).deletedCount + "条文档")
    }finally{
        client.close()
    }
}

run().catch(console.dir)
