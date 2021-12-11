// https://docs.mongodb.com/drivers/node/current/quick-start/
import {MongoClient} from "mongodb"
// uri 带上复制集, 数据库连接地址
// const uri = "mongodb://localhost:27017/replicaSet=my_repl"
// 也可以不带数据集
const uri = "mongodb://localhost:27017" 
// 数据库连接对象
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect() // 等待数据库连接
        const database = client.db("test") // 哪个数据库
        const users = database.collection("users") // 哪个集合
        const query = {name: "franck-lynn"} // 查询哪一个文档
        const user = await users.findOne(query)
        console.log(user)
    } finally{
        await client.close()
    }
}
run().catch(console.dir)
