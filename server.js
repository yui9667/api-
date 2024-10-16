import express from 'express';
const app = express();

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running as ${PORT}`);
});
let users = [
  { id: 1, name: 'Yui Jensen' },
  { id: 2, name: 'Michel Jensen' },
  { id: 3, name: 'Mayu Yokote' },
];

//*GET
app.get('/users', (req, res) => {
  res.json(users);
});

//*POST
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  res.json({ message: 'Adding new name', newUser });
  users.push(newUser);
});

//*PUT
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((item) => item.id === id);
  if (user) {
    user.name = req.body.name || user.name;
    user.id = req.body.id || user.id;
    res.json({ message: 'User updated', user });
  } else res.status(404).json({ message: 'User not found!😢' });
});

//*DELETE
app.delete('/users/:id', (req, res) => {
  const deleteID = parseInt(req.params.id);
  const findId = users.find((item) => item.id === deleteID);
  if (findId) {
    users = users.filter((item) => item.id !== deleteID);
    res.json({ message: 'Deleting item  💀', deleteID });
  } else {
    res.status(404).json({ message: 'User not found!' });
  }
});
