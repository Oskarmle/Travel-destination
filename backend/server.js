const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Destination = require("./schemas/Destination.js");
const User = require("./schemas/User.js");
// const LoginUser = require("../schemas/LoginUser.js");

mongoose.connect("mongodb://mongo:27017/travel");

dotenv.config();

const port = 3003;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Set up a connection to MongoDB
const uri = "mongodb://mongo:27017/travel";  
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middleware in the middle of everything ...... :)
app.use("/users/login", (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Post request
app.post("/destinations", async (req, res) => {
  const destination = new Destination({
    title: req.body.title,
    city: req.body.city,
    country: req.body.country,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    description: req.body.description,
  });

  try {
    const result = await destination.save();
    res.status(201).json(result);
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
});

app.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
});

// Login request
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (user.email) {
      if (password === user.password) {
        console.log("cool");
        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
        console.log("token", token);

        res.status(200).json({
          message: "Login successful",
          token: token,
        });
      } else {
        console.log("not cool");
      }
    }

    console.log("user", user);

    if (user === null) {
      console.log("the user is null");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
});

// Get request
app.get("/destinations", async (req, res) => {
  const destination = await Destination.find({});

  res.status(200).json(destination);
});

// Get request for filtered destination
app.get("/destinations/:filter", async (req, res) => {
  console.log("get destination with this filter", req.params.filter);
  try {
    const destinations = await getFilteredDestinations(req.params.filter);
    res.json(destinations);

    // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
  res.end();
});

// Delete request
app.delete("/destinations/:id", (req, res) => {
  console.log("delete destination with this id", req.params.id);
  res.send("Got a DELETE request at /destinations");
  deleteDestination(req.params.id);
});

// Put request
app.put("/destinations/:destinationId", async (req, res) => {
  console.log("params", req.params);
  const { destinationId } = req.params;
  const updateData = req.body;

  try {
    // Log the params and body for debugging purposes
    console.log("params", destinationId);
    console.log("body", updateData);

    // Check if destinationId is valid
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).send("Invalid destination ID");
    }

    // Find the destination by ID and update it
    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      updateData,
      { new: true, runValidators: true } // Options: return the updated doc and run validators
    );

    if (!updatedDestination) {
      return res.status(404).send("Destination not found");
    }

    // Send back the updated document
    res.status(200).json(updatedDestination);
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).send("Server error");
  }
  // res.send("This is a put request!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function getFilteredDestinations(filter) {
  try {
    await client.connect();
    const myDB = client.db("travel");
    const myColl = myDB.collection("destinations");

    const destinations = await myColl.find({ country: filter }).toArray();
    console.log("filtered destinations", destinations);
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
