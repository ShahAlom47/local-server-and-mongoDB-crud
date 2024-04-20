// user name: sahalom4729
// password:4C6aUsYlSF0hyBnt

// mongodb crud  for documentation

const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT ||3000;
const cors = require('cors');
app.use(express.json());
app.use(cors())




const uri = "mongodb+srv://sahalom4729:4C6aUsYlSF0hyBnt@cluster0.r31xce1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("userDB");
    const haiku = database.collection("user");

    // create data
    app.post('/user',async(req,res)=>{

      const user=req.body;
      console.log(user);
      const result = await haiku.insertOne(user);
      res.send(result)
      console.log(result);
    })


    // get multiple data

    app.get('/users', async(req, res) => {
      const cursor = haiku.find()
      const result =await cursor.toArray()

      res.send(result)
    })

// get for single  data ,use id 
    app.get('/user/:id', async(req, res) => {
      const id=req.params.id
      const query ={_id: new ObjectId(id)}
      const result = await haiku.findOne(query)
      res.send(result);

    })


    // update data
    app.put('/user/:id', async(req, res) => {
      const id=req.params.id
      const User=req.body;
     
    const filter={_id: new ObjectId(id)}
    const options= {unsert:true}

   
    const upadatedUser = {
      $set:{
        name:User.name,
        email:User.email,
      },
    }

     const result = await haiku.updateOne(filter,upadatedUser,options)
     res.send(result)

    })


    app.get('/users/:id', async(req, res) => {
      const id=req.params.id
      const query ={_id: new ObjectId(id)}
      const result = await haiku.findOne(query)
      res.send(result);

    })


// delete data 
    app.delete('/users/:id', async(req, res)=>{

      const id=req.params.id
      console.log('this is id',id);
      const query ={_id: new ObjectId(id)}
      const result = await haiku.deleteOne(query)
      res.send(result);
    })
    

    

    // aita connection hoice ki na aita dekar jonno use kora hoyece 
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})