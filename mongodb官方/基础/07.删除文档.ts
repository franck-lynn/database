// https://docs.mongodb.com/drivers/node/current/usage-examples/deleteOne/
import {MongoClient} from "mongodb"

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run = async () => {
    try{
        await client.connect()
        const database = client.db('test')
        const users = database.collection("users")
        // 查询要删除的文档
        const query = {name: 'Leon'}
        const result = await users.deleteOne(query)
        if(result.deletedCount === 1){
            console.dir('成功删除了一条文档')
        }else{
            console.log("没有文档被删除")
        }
    }finally{
        client.close()
    }
}

run().catch(console.dir)







