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
      title: 'Books API',
      version: '1.0.0',
      description: 'A simple Express Books API',
    },
  },
  apis: ['./books.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

let books = [
  { id: 1, title: '1894', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R Tolkien' },
];
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieves a list of all books
 *     description: Retrieve a list of books in the library
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 */

app.get('/books', (req, res) => {
  //logic
  res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 */

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.json({ message: 'Book added successfully!', book: newBook });
});
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *       404:
 *         description: Book not found!
 */

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Oops, book not found!' });
  }
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json({ message: 'Book updated successfully', book });
});
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Book not found
 */

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.json({ message: 'Book deleted successfully!' });
});
