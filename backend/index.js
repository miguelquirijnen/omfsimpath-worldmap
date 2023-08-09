require("dotenv").config();

const mongoose = require("mongoose");

const production = true;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(process.env.DB_URI);
} catch (e) {
  console.log("could not connect");
}

const yourSchema = new mongoose.Schema({
  dataURL: String,
  xcoord: String,
  ycoord: String,
  width: String,
  height: String,
  continent: String,
  date: Date,
});

// create a Mongoose model for the 'messages' collection
const Message = mongoose.model(`omfsimpath${production ? "-prod" : ""}`, yourSchema);

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listening at port 5000");

app.use(express.json());
app.use(cors());
app.get("/", async (req, resp) => {
  resp.send("Status 200: OMFS-IMPATH Worldmap backend online");
});

// Post one message
app.post("/message", async (req, res) => {
  const request = req.body;
  try {
    const newMessage = new Message({
      dataURL: request.dataURL,
      xcoord: request.xcoord,
      ycoord: request.ycoord,
      width: request.width,
      height: request.height,
      continent: request.continent,
      date: new Date(),
    });
    await newMessage.save();
    console.log(
      `Message posted: ${request.xcoord} ${request.ycoord} ${request.width} ${request.height} ${request.continent}`
    );
    res.status(200).send("Message saved successfully.");
  } catch (e) {
    console.error("Something went wrong:", e);
    res.status(500).send("Failed to save the message.");
  }
});

// Retrieve all messages
app.get("/messages", async (req, res) => {
  try {
    // Fetch all instances from the database
    const messages = await Message.find({});
    console.log(`Sending all messages (${messages.length})`);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).send("Failed to fetch messages from the database.");
  }
});

app.put("/messages", async (req, res) => {
  const request = req.body;
  try {
    // Iterate over the list of messages to update
    for (const messageData of request) {
      const { dataURL, xcoord, ycoord, width, height } =
        messageData;
      console.log(messageData)
      // Find the message by its ID and update its fields
      await Message.updateMany(
        { dataURL },
        {
          xcoord,
          ycoord,
          width,
          height,
        }
      );
    }
    console.log("Messages updated successfully.");
    res.status(200).send("Messages updated successfully.");
  } catch (e) {
    console.error("Failed to update messages:", e);
    res.status(500).send("Failed to update messages.");
  }
});

// Update a single message in the database
app.put("/message", async (req, res) => {
  const request = req.body;

  try {
    const { dataURL, xcoord, ycoord, width, height } =
      request;
    await Message.findOneAndUpdate(
      { dataURL },
      {
        xcoord,
        ycoord,
        width,
        height,
      }
    );
    console.log(`Message with dataURL ${dataURL} updated successfully.`);
    res.status(200).send(`Message with dataURL ${dataURL} updated successfully.`);
  } catch (error) {
    console.error("Failed to update message:", error);
    res.status(500).send("Failed to update message.");
  }
});

// Remove a single message in the database
app.delete("/message", async (req, res) => {
  const request = req.body;

  try {
    const { dataURL, xcoord, ycoord, width, height } =
      request;
    await Message.findOneAndUpdate(
      { dataURL },
      {
        xcoord,
        ycoord,
        width,
        height,
      }
    );
    console.log(`Message with dataURL ${dataURL} updated successfully.`);
    res.status(200).send(`Message with dataURL ${dataURL} updated successfully.`);
  } catch (error) {
    console.error("Failed to update message:", error);
    res.status(500).send("Failed to update message.");
  }
});

app.listen(5000);