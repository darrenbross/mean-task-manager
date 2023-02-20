const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');

const { List, Task } = require('./db/models');

// Middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Route Handlers*/

/* List Routes */

/** 
 * GET /lists
 * Purpose: Gets all lists as an array.
 */
app.get('/lists',(req, res) => {
  // Return array of lists
  List.find({}).then((lists) => {
    res.send(lists);
  }).catch((e) => {
    res.send(e);
  });
});

/**
 * POST /list
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
  // We create a new list with info from the request body JSON.
  let title = req.body.title;

  let newList = new List({
    title
  });
  newList.save().then((listDoc) => {
    // full list is returned.
    res.send(listDoc);
  })
});

/**
 * PATCH /list
 * Purpose: Update a specified list.
 */
app.patch('/lists/:id', (req, res) => {
  // We update an existing list with new info from the request body JSON.
  List.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /list
 * Purpose: Delete a specified list.
 */
app.delete('/lists/:id', (req, res) => {
  // We delete an existing list with the id from the URL.
  List.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list.
 */
app.get('/lists/:listId/tasks', (req, res) => {
  // Returns all tasks for a specific list.
  Task.find({
    _listId: req.params.listId
  }).then((tasks) => {
    res.send(tasks);
  })
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((task) => {
    res.send(Task);
  })
});

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list.
 */
app.post('/lists/:listId/tasks', (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update a specified list.
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  // We update an existing list with new info from the request body JSON.
  Task.findOneAndUpdate({ 
    _id: req.params.taskid,
    _listId: req.params.listId
   }, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /list
 * Purpose: Delete a specified list.
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  // We delete an existing list with the id from the URL.
  Task.findOneAndRemove({
    _id: req.params.id,
    _listId: req.params.listId
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})


/* */