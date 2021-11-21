// https://docs.mongodb.com/drivers/node/current/usage-examples/insertOne/
import { MongoClient } from 'mongodb' 

const url = "mongodb://127.0.0.1:27017"
// const url = "mongodb://localhost:27017"
// const url = "mongodb://localhost:27017/test?replicaSet=my_repl"
// const url = "mongodb://localhost:27017/test?replicaSet=my_repl?retryWrites=true&w=majority"

const client = new MongoClient(url)
const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')
        const doc = {name: 'red', town: 'kanto'}
        const result = await movies.insertOne(doc)
        // reslut 有2个属性: acknowledged: true, acknowledged 是否属实的意思, 就是说是否插入了的判断
        // insertedId: new ObjectId("6108b8011879514a9b095dcc")
        console.log(`_id是 ${result.insertedId} 被插入集合 movies`)
    } finally{
        client.close()
    }
}

run().catch(console.dir)




