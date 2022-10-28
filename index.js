import express from 'express';
const app = express();
app.use(express.json());

let contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/info', (_, res) => {
  res.send(`
    <p>Contact manager has info for ${contacts.length} contacts</p>
    <p>${new Date().toString()}</p>
  `);
});

app.get('/api/contacts', (_, res) => {
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(contact => contact.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send();
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

  if (contacts.find(({ name }) => name === body.name)) {
    return res.status(400).json({ error: "'name' must be unique" });
  }

  const contact = {
    "id": generateId(),
    "name": body.name,
    "number": body.number,
  };

  contacts = contacts.concat(contact);
  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(contact => contact.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});