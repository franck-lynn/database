// https://docs.mongodb.com/drivers/node/current/quick-start/
import {MongoClient} from "mongodb"
// url 带上复制集, 数据库连接地址
// const url = "mongodb://localhost:27017/replicaSet=my_repl"
// 也可以不带数据集
const url = "mongodb://localhost:27017" 
// 数据量连接对象
const client = new MongoClient(url)

const run = async () => {
    try {
        await client.connect() // 等待数据库连接
        const database = client.db("test") // 哪个数据库
        const users = database.collection("actors") // 哪个集合
        const query = {name: "奥黛丽·赫本"} // 查询哪一个文档
        const user = await users.findOne(query)
        console.log(user)
    } finally{
        await client.close()
    }
}
run().catch(console.dir)
