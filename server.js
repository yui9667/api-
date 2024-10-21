import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const app = express();

app.use(express.json());
const PORT = 3000;
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'A simple Express Users API',
    },
  },
  apis: ['./server.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of all users
 *     description: Retrieves a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

//*POST
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  res.json({ message: 'Adding new name', newUser });
  users.push(newUser);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adding a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */

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
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user name
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User name updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *       404:
 *         description: User not found!
 */

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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user's name
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user's name to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user deleted successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found!
 */
