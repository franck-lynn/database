// https://docs.mongodb.com/drivers/node/current/usage-examples/updateMany/
import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        // 简称: 连 库 集 档 结
        // 1. 连接数据库
        await client.connect()
        // 2. 数据库
        const database = client.db('test')
        // 3. 集合
        const movies = database.collection('movies')
        // 4. 文档
        const filter = {rated: 'G'}
        const updateDoc = {
            $inc: {num_mflix_comments: 2}
        }
        // 5. 结果
        const result = await movies.updateMany(filter, updateDoc)
        // {
        //     acknowledged: true,
        //     modifiedCount: 2,
        //     upsertedId: null,
        //     upsertedCount: 0,
        //     matchedCount: 2
        //   }
        console.log(result)
    } finally{
        client.close()
    }
}
run().catch(console.dir)





