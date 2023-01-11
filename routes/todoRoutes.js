const express = require("express");
const Todo = require("../models/todoModel");
const router = express.Router();

//through this request you can create new todo
router.post("/", async (req, res) => {
  try {
    //getting values from user
    const { title, description, dueDate, completed, priority } = req.body;
    //checking wheather title is given or not
    if (title.length === 0) {
      return res.status(400).json({
        err: "title is missing",
      });
    }
    //validating the priority for range 1 to 5
    if (!(priority >= 1 && priority <= 5)) {
      return res.status(400).json({
        err: "you can only put values from 1 to 5",
      });
    }
    const TodoData = {
      title,
      description,
      dueDate,
      completed,
      priority,
    };
    //sending the data to db
    const TodoDB = await Todo.create(TodoData);

    return res.status(201).json({ TodoDB });
  } catch (error) {
    console.log("<<<<<", error);

    return res.status(500).json({
      err: error,
    });
  }
});

//through this request you can get all todos
router.get("/", async (req, res) => {
  try {
    //getting all the data from todo table
    const allTodos = await Todo.findAll();
    return res.status(200).json({
      allTodos,
    });
  } catch (error) {
    console.log("<<<<<", error);

    return res.status(500).json({
      err: error,
    });
  }
});

//through this request you can get indiviual todo using id
router.get("/:id", async (req, res) => {
  try {
    //getting todo using given id
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });

    //checking wheather given id's todo is present in db or not
    if (!todo) {
      return res.status(404).json({
        message: "Todo not Found",
      });
    }

    return res.status(200).json({
      todo,
    });
  } catch (error) {
    console.log("<<<<<", error);

    return res.status(500).json({
      err: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    //getting todo using given id
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });

    //checking wheather given id's todo is present in db or not
    if (!todo) {
      return res.status(404).json({
        message: "Todo not Found",
      });
    }

    //getting values from user
    const { title, description, dueDate, completed, priority } = req.body;

    //checking wheather title is given or not
    if (title.length === 0) {
      return res.status(400).json({
        err: "title is missing",
      });
    }

    //validating the priority for range 1 to 5
    if (!(priority >= 1 && priority <= 5)) {
      return res.status(400).json({
        err: "you can only put values from 1 to 5",
      });
    }

    const TodoData = {
      title,
      description,
      dueDate,
      completed,
      priority,
    };
    //updating the todo data
    todo.update(TodoData);

    return res.status(200).json({ todo });
  } catch (error) {
    console.log("<<<<<", error);

    return res.status(500).json({
      err: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //getting todo using given id
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });

    //checking wheather given id's todo is present in db or not
    if (!todo) {
      return res.status(404).json({
        message: "Todo not Found",
      });
    }

    //to delete the given id's todo
    todo.destroy();

    return res.status(200).json({
      message: "todo is sucessfully deleted",
    });
  } catch (error) {
    console.log("<<<<<", error);

    return res.status(500).json({
      err: error,
    });
  }
});

module.exports = router;
