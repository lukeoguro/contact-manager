import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import Contact from './models/contact.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('reqBody', (req, _) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'));

app.get('/info', (_, res) => {
  res.send(`
    <p>Contact manager has info for ${contacts.length} contacts</p>
    <p>${new Date().toString()}</p>
  `);
});

app.get('/api/contacts', (_, res) => {
  Contact.find({}).then(contacts => res.json(contacts));
});

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(contact => contact.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: "contact not found" });
  }
});

function generateId() {
  const maxId = contacts.length > 0 ? Math.max(...contacts.map(n => n.id)) : 0;
  return maxId + 1;
}

app.post('/api/contacts', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "'name' or 'number' is missing" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then(savedContact => {
    res.json(savedContact);
  });
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(contact => contact.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});