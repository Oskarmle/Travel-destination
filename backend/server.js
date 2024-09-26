const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = 3003;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set up a connection to MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Post request for destinations
app.post("/destinations", async (req, res) => {
  console.log(req.body);
  await createDestination(req.body);
  res.send("Got a POST request");
});

// Get request for destinations
app.get("/destinations", async (req, res) => {
  try {
    const destinations = await getAllDestinations();
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});

// Get request for filtered destination
app.get("/destinations/:filter", async (req, res) => {
  console.log("get destination with this filter", req.params.filter);
  try {
    const destinations = await getFilteredDestinations(req.params.filter);
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});

// Delete request for destinations
app.delete("/destinations/:id", async (req, res) => {
  console.log("delete destination with this id", req.params.id);
  await deleteDestination(req.params.id);
  res.send("Got a DELETE request at /destinations");
});

// Put request for destinations
app.put("/destinations/:destinationId", (req, res) => {
  console.log("params", req.params);
  res.send("This is a put request!");
});

///////////////////////////////////////// User routes /////////////////////////////////////////
// Post request for users
app.post("/users", async (req, res) => {
  console.log(req.body);
  await createUser(req.body);
  res.send("Got a POST request");
});

// Get request for users
app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Delete request for users
app.delete("/users/:id", async (req, res) => {
  console.log("delete user with this id", req.params.id);
  await deleteUser(req.params.id);
  res.send("Got a DELETE request at /users/:id");
});

// Put request for users
app.put("/users/:id", (req, res) => {
  console.log("params", req.params);
  res.send("This is a put request!");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Helper functions
async function createDestination(newDestination) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("destinations");

    const result = await myColl.insertOne(newDestination);
    console.log("A document was inserted with the _id:", result.insertedId);
    return result;
  } finally {
    await client.close();
  }
}

async function getAllDestinations() {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("destinations");

    const destinations = await myColl.find({}).toArray();
    return destinations;
  } finally {
    await client.close();
  }
}

async function getFilteredDestinations(filter) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("destinations");

    const destinations = await myColl.find({ country: filter }).toArray();
    return destinations;
  } finally {
    await client.close();
  }
}

async function deleteDestination(destinationId) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("destinations");

    const query = {
      _id: ObjectId.isValid(destinationId) ? new ObjectId(destinationId) : null,
    };

    if (!query._id) {
      console.log("Invalid ObjectId format.");
      return; // Exit early if the ID is not valid
    }
    const result = await myColl.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted destination with the ID", query);
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    await client.close();
  }
}

// User functions
async function createUser(newUser) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("users");

    // Create an index for emails, and insure that the email is unique
    await myColl.createIndex({ email: 1 }, { unique: true });
    console.log("index created on the email field");

    const result = await myColl.insertOne(newUser);
    console.log("A user document was inserted with the _id:", result.insertedId);
    return result;
  } catch (error) {
    console.log("error creating new user", error);
  } finally {
    await client.close();
  }
}

async function getAllUsers() {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("users");

    const users = await myColl.find({}).toArray();
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
