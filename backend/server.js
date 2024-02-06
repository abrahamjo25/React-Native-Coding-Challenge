const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const uri =
  "mongodb+srv://abirhamjohannes:oLWFnkS60IavC5KH@cluster0.upansia.mongodb.net/todo?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(bodyParser.json());

const todoSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting todo" });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
