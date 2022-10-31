import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-[\d-]{4,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number.`
    },
  },
});

contactSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;