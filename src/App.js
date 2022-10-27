import { useState } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [query, setQuery] = useState('');
  const contactsToShow = getContactsToShow();

  function getContactsToShow() {
    if (query) {
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(query.toLowerCase());
      });
    } else {
      return contacts;
    }
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  function handleContactSubmit(e) {
    e.preventDefault();

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} has already been added to contacts.`);
    } else {
      const newContact = {
        name,
        number,
        id: contacts.length + 1,
      };

      setContacts(contacts.concat(newContact));
      setName('');
      setNumber('');
    }
  }

  return (
    <div>
      <h1>Contact Manager</h1>

      <h2>Search</h2>
      <Filter
        query={query}
        handleQueryChange={handleQueryChange}
      />

      <h2>Add a new contact</h2>
      <ContactForm
        handleContactSubmit={handleContactSubmit}
        name={name}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />

      <h2>Contacts</h2>
      <Contacts
        contactsToShow={contactsToShow}
      />
    </div>
  )
}

export default App;