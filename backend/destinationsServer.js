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
app.post("/destinations", (req, res) => {
    // HERE WE NEED TO send back the created object or at least the new ID
    console.log(req.body);
    createDestination(req.body);
    res.send("Got a POST request");
});

// Get request
app.get("/destinations", (req, res) => {
    getAllDestinations();
    res.send("Getting travel destinations");
});

// Delete request
app.delete("/destinations/:id", (req, res) => {
    console.log("delete destination with this id", req.params.id);
    res.send("Got a DELETE request at /destinations");
    deleteDestination(req.params.id);
});

// Put request
app.put("/destinations/:destinationId", (req, res) => {
    console.log("params", req.params);

    res.send("This is a put request!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//Helper functions
async function createDestination(newDestination) {
    try {
        // Connect the client to the server
        await client.connect();
        const myDB = client.db("travel");
        const myColl = myDB.collection("destinations");

        const result = await myColl.insertOne(newDestination);
        console.log("A document was inserted with the _id:", result.insertedId);
        console.log("result object", result);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function getAllDestinations() {
    try {
        await client.connect();
        const myDB = client.db("travel");
        const myColl = myDB.collection("destinations");

        const destinations = await myColl.find({}).toArray();
        console.log(destinations);
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

        // Safely create an ObjectId from the string ID
        const query = {
            _id: ObjectId.isValid(destinationId)
                ? new ObjectId(destinationId)
                : null,
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
