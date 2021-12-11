// https://docs.mongodb.com/drivers/node/current/usage-examples/count/

import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const users  = database.collection('users')
        
        // estimate 估算
        const estimate = await users.estimatedDocumentCount()
        console.log(`估计users集合中文档的数量是: ${estimate}`)
        
        const query = {contries: "canada"}
        const countCanada = await users.countDocuments(query)
        console.log(`来自加拿大的电影数量: ${countCanada}`)
        console.log()
    } finally{
        client.close()
    }
}
run().catch(console.dir)