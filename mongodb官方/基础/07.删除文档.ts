// https://docs.mongodb.com/drivers/node/current/usage-examples/deleteOne/
import {MongoClient} from "mongodb"

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const run = async () => {
    try{
        await client.connect()
        const database = client.db('test')
        const movies = database.collection("movies")
        // 查询要删除的文档
        const query = {title: 'Sandcastles in the Sand'}
        const result = await movies.deleteOne(query)
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







