# Contact Manager

This is a basic contact manager application built using a MERN stack. It allows users to perform CRUD operations on contacts, and also includes some other basic features like search capability and user input validation. This project is a part of University of Helsinki's [Full Stack Open](https://fullstackopen.com/en/).

You can find a live version at: https://wispy-field-1310.fly.dev.

![Demo](demo.gif)

## Setup

To run the app, you'll need a MongoDB database. You can create one easily for free at [MongoDB Atlas](https://www.mongodb.com/atlas/database) — sign up for an account and deploy a shared cluster. For simplicity, authenticate with username and password (this should be different from your MongoDB Atlas credentials) and also allow access from all IP addresses. Then, grab the connection string URI, which should look something like the following.

```
mongodb+srv://<username>:<password>@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Replace `<username>` and `<password>` with the database credentials and `myFirstDatabase` with `contactManager`. Then, create a `.env` file in the `server` folder (replacing the URI appropriately).

```
# .env
MONGODB_URI=mongodb+srv://fullstack:secret@cluster0.o1opl.mongodb.net/contactManager?retryWrites=true&w=majority
PORT=3001
```

Finally, `cd` into the `server` folder and run `npm install && npm start` to start the Express backend, and the same command in the `client` folder to start the React frontend.
