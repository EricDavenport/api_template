const express = require("express");
//require basicAuth
const basicAuth = require('express-basic-auth');
//require bcrypt
const bcrypt = require('bcrypt');
// set salt
const saltRounds = 2;

const {User, Item} = require('./models');
const { use } = require("bcrypt/promises");

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

// routes go here
app.get('/', (req, res) => {
  res.send('<h1>App Running</h1>')
})

// Find all users
app.get('/users', async (req, res) =>{
  let users = await User.findAll()
  res.json(users)
})

// Create new user
app.post('/users', async (req, res) =>{
  let newUser = await User.create(req.body);
  res.json(newUser)
})

// Update single user
app.put('/users/:id', async (req, res) => {
  let updateUser = await User.update(req.body, {
    where : {
      id: req.params.id
    }
  })
  res.send()
})

// Read single user
app.get('/users/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.json(user)
})
// delete single user
app.delete('/users/:id', async (req, res) => {
  await User.destroy({where: { id: req.params.id }});
  res.send('deleted')
})

// create new item
app.post('/items', async (req, res) => {
  let item = await Item.create(req.body);
  res.json(item)
})

// load all item
app.get('/items', async (req, res) => {
  let items = await Item.findAll();
  res.json(items)
})

// load single item
app.get('/items/:id', async (req, res) => {
  let item = await Item.findByPk(req.params.id);
  res.json(item)
})

// update single item
app.put('items/:id', async (req, res) => {
  let updatedItem = await Item.update(req.body, {
    where: { id: req.params.id }
  });
  res.json(updatedItem)
})

// delete a single item
app.delete('/items/:id', async (req, res) => {
  await Item.destroy({where: { id: req.params.id }});
  res.send('deleted')
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
});