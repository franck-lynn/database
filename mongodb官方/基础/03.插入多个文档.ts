// https://docs.mongodb.com/drivers/node/current/usage-examples/insertMany/
import {MongoClient} from "mongodb"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

// 插入多个文档的函数
const run = async () => {
    try {
        // 等待数据库连接
        await client.connect()
        // 确定数据库
        const database = client.db("test")
        // 确定集合
        const movies = database.collection("movies")
        // 待插入的文档
        const docs = [
            {name: 'Red', town: 'Kanto'}, 
            {name: 'Blue', town: 'Galar'}, 
            {name: 'Leon', town: 'Galar'}, 
        ]
        // 这个选项防止插入的数据失败
        const options = {ordered: true}
        const result = await movies.insertMany(docs, options)
        // insert 没有 insertedCount 属性, insertMany 有
        console.log(`${result.insertedCount} 个文档被插入`)
    } finally {
        client.close()
    }
}

run().catch(console.dir)