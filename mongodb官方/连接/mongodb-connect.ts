import { MongoClient} from 'mongodb'

const uri = 'mongodb://localhost:27017/test?replicaSet=my_repl'
const client = new MongoClient(uri)

interface Haiku {
    title: string;
    content: string;
  }
  
  
  async function run() {
    try {
      await client.connect();
      const database = client.db("insertDB");
      // Specifying a Schema is optional, but it enables type hints on
      // finds and inserts
      const haiku = database.collection<Haiku>("haiku");
      const result = await haiku.insertOne({
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      });
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);