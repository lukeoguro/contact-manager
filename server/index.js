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
  Contact.find({}).then(contacts => {
    res.send(`
    <p>Contact manager has info for ${contacts.length} contacts</p>
    <p>${new Date().toString()}</p>
  `);
  });
});

app.get('/api/contacts', (_, res) => {
  Contact.find({}).then(contacts => res.json(contacts));
});

app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    })
    .catch(err => next(err));
});

app.post('/api/contacts', async (req, res, next) => {
  const { name, number } = req.body;

  const existingContact = await Contact.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") }
  });
  if (existingContact) {
    return res.status(400).json({ error: "Contact exists" });
  };

  try {
    const contact = new Contact({ name, number });
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (err) {
    next(err);
  }
});

app.put('/api/contacts/:id', (req, res, next) => {
  const body = req.body;

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(
    req.params.id,
    contact,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    })
    .catch(err => next(err));
});

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err));
});

const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (err, _, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});