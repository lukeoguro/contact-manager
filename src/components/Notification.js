function Notification({ successMessage, errorMessage }) {
  if (successMessage) {
    return (
      <div className='success'>
        {successMessage}
      </div>
    );
  } else if (errorMessage) {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  } else {
    return null;
  }
}

export default Notification;