import { MongoClient, MongoClientOptions} from 'mongodb'
// const {MongoClient}  = mongodb.MongoClient

// const MongoClient = require('mongodb').MongoClient
const MONGODB_OPTIONS: MongoClientOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}
const url =  'mongodb://localhost:27017/test?replicaSet=my_repl'

MongoClient.connect(url, MONGODB_OPTIONS,(err, client) => {
    console.log(client)
    client.close()
})