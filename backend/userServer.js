const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = 3003;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Set up a connection to MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Post request
app.post("/users", (req, res) => {
  // HERE WE NEED TO send back the created object or at least the new ID
  console.log(req.body);
  createUser(req.body);

  res.send("Got a POST request");
});

// Get request
app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.send("Got a GET request at /users");
  }
});

// Delete request
app.delete("/users/:id", (req, res) => {
  console.log("delete destination with this id", req.params.id);
  res.send("Got a DELETE request at /users/:id");
  deleteUser(req.params.id);
});

// Put request
app.put("/users/:id", (req, res) => {
  console.log("params", req.params);

  res.send("This is a put request!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Helper functions
async function createUser(newUser) {
  try {
    // Connect the client to the server
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("users");

    // Create an index for emails, and insure that the email is unique
    await myColl.createIndex({ email: 1}, {unique: true})
    console.log("index created on the email field");
    
    const result = await myColl.insertOne(newUser);
    console.log(
      "A user document was inserted with the _id:",
      result.insertedId
    );
    console.log("result object", result);
    return result;
  } catch (error) {
    console.log("error creating new user", error);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getAllUsers() {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("users");

    const users = await myColl.find({}).toArray();
    // console.log(destinations);
    return users;
  } finally {
    await client.close();
  }
}

async function deleteUser(userId) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("users");

    // Safely create an ObjectId from the string ID
    const query = {
      _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    };

    if (!query._id) {
      console.log("Invalid ObjectId format.");
      return; // Exit early if the ID is not valid
    }
    const result = await myColl.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted user with the ID", query);
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    await client.close();
  }
}
