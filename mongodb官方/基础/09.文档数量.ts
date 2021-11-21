// https://docs.mongodb.com/drivers/node/current/usage-examples/count/

import {MongoClient} from "mongodb"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies  = database.collection('movies')
        
        // estimate 估算
        const estimate = await movies.estimatedDocumentCount()
        console.log(`估计movies集合中文档的数量是: ${estimate}`)
        
        const query = {contries: "canada"}
        const countCanada = await movies.countDocuments(query)
        console.log(`来自加拿大的电影数量: ${countCanada}`)
        console.log()
    } finally{
        client.close()
    }
}
run().catch(console.dir)