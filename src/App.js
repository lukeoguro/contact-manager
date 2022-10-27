import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Notification from './components/Notification';

import contactService from './services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [query, setQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const contactsToShow = getContactsToShow();

  useEffect(() => {
    contactService.getAll().then(initialContacts => setContacts(initialContacts));
  }, []);

  function showSuccessMessage(message) {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  }

  function showErrorMessage(message) {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  }

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
      if (window.confirm(`Update '${existingContact.name}'?`)) {
        const updatedContact = { ...existingContact, number };

        contactService
          .update(updatedContact.id, updatedContact).then(returnedContact => {
            setContacts(contacts.map(contact => {
              return contact.id === existingContact.id ? returnedContact : contact;
            }));
            setName('');
            setNumber('');
            showSuccessMessage(`Updated '${returnedContact.name}'`);
          })
          .catch(() => {
            showErrorMessage(`'${existingContact.name}' has been deleted and can't be updated`);
            setContacts(contacts.filter(c => c.id !== existingContact.id));
          });
      }
    } else {
      const newContact = { name, number };

      contactService.create(newContact).then(returnedContact => {
        setContacts(contacts.concat(returnedContact));
        setName('');
        setNumber('');
        showSuccessMessage(`Added '${returnedContact.name}'`);
      });
    }
  }

  function handleContactDelete({ name, id }) {
    if (window.confirm(`Delete '${name}'?`)) {
      contactService.remove(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id));
          showSuccessMessage(`Deleted '${name}'`);
        })
        .catch(() => {
          showErrorMessage(`'${name}' has already been deleted`);
          setContacts(contacts.filter(c => c.id !== id));
        });
    }
  }

  return (
    <div>
      <h1>Contact Manager</h1>

      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

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
        handleContactDelete={handleContactDelete}
      />
    </div>
  )
}

export default App;