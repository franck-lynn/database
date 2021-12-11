// https://docs.mongodb.com/drivers/node/current/usage-examples/distinct/
import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        
        const database = client.db('test')
        const users = database.collection('users')
        
        // 指定文档的字段, 年份字段, 并且匹配包含有 Barbra Streisand 字段的电影
        const fieldName = 'years'
        // 指定文档查询的选项
        const query = {directors: 'Barbra Streisand'}
        const distinctValue = await users.distinct(fieldName, query)
        console.log(distinctValue)
    } finally {
        client.close()
    }
}
run().catch(console.dir)






