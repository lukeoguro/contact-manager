import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [query, setQuery] = useState('');
  const contactsToShow = getContactsToShow();

  useEffect(() => {
    const request = axios.get("http://localhost:3001/contacts");
    request.then(response => setContacts(response.data));
  }, []);

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