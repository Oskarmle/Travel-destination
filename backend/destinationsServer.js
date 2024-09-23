const express = require("express");
var cors = require("cors");
const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Get request 
app.get("/destinations", (req, res) => {
    console.log("params", req.params);

    res.send("This is a get request");
});

// Post request
app.post("/destinations", (req, res) => {
    console.log("post", req.body);

    res.send("This is a post request!");
});

// Put request
app.put("/destinations/:destinationId", (req, res) => {
    console.log("params", req.params);

    res.send("This is a put request!");
});

// Delete request
app.delete("/destinations/:destinationId", (req, res) => {
    console.log("params", req.params);

    res.send("This is a delete request!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
