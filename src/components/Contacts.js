function Contacts({ contactsToShow, handleContactDelete }) {
  return (
    contactsToShow.map(({ id, name, number }) => (
      <p key={id}>
        {name} {number}
        <button onClick={() => handleContactDelete({ id, name })}>Delete</button>
      </p>
    ))
  )
}

export default Contacts;