// https://docs.mongodb.com/drivers/node/current/usage-examples/command/

import {MongoClient} from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const run  = async () => {
    try{
        await client.connect()
        const db = client.db('test')
        
        
        const result = await db.command({
            dbStats: 1
        })
        console.log(result)
    }finally{
        client.close()
    }
}
run().catch(console.dir)














