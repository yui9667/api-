import express from 'express';

const app = express();

app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

let books = [
  { id: 1, title: '1894', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R Tolkien' },
];

app.get('/books', (req, res) => {
  //logic
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.json({ message: 'Book added successfully!', book: newBook });
});

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

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.json({ message: 'Book deleted successfully!' });
});
