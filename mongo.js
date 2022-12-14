// Command-line database
import mongoose from 'mongoose';

(async () => {
  const [, , password, name, number] = process.argv;

  if (password === undefined) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
  } else {
    const url = `mongodb+srv://fullstack:${password}@cluster0.kaiikmc.mongodb.net/contactManager?retryWrites=true&w=majority`;

    await mongoose.connect(url);

    const Contact = mongoose.model('Contact', new mongoose.Schema({
      name: String,
      number: String,
    }));

    if (name === undefined || number === undefined) {
      const contacts = await Contact.find({});
      if (contacts.length === 0) {
        console.log("No contacts yet. Add one!");
      } else {
        console.log(`Contacts (${contacts.length}):`);
        contacts.forEach(contact => console.log(`${contact.name} ${contact.number}`));
      }
    } else {
      const contact = new Contact({ name, number });
      await contact.save();
      console.log(`Added: ${contact.name} ${contact.number}`);
    }

    return mongoose.connection.close();
  }
})();