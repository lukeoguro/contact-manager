function Contacts({ contactsToShow }) {
  return (
    contactsToShow.map(contact => (
      <p key={contact.id}>
        {contact.name} {contact.number}
      </p>
    ))
  )
}

export default Contacts;