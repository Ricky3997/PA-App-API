require('dotenv').load();

const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const authService = require('./service/auth');
const app = express();
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck');
const cors = require('cors');
const mongoose = require("mongoose");
const initDb = require('./service/db').initDb;
const config = require("./config");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://dev.app.projectaccess.org',
    'https://dev.app.projectaccess.org',
  ]
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));


app.use('/auth', authRoutes);

app.use('/api', authService.checkToken, routes);

app.use('/health', healthcheck({
  healthy : () => {
    return { smooth: 'sailing', uptime: process.uptime() }
  },
  test: () => {
    switch (mongoose.connection.readyState) {
      case 1:
        return; //Connected, all smooth
      case 0:
        return {error: 'Database disconnected'};
      default:
        return {error: 'Something is not quite right'};
    }
  }
}));

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong, sorry!');
});


const server = app.listen(port, () => {
  console.log('API started on port ' + port + ' at ' + new Date().toString());
  mongoose.connect(config.mongodb.URI, { useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true }).then(async () => {
    await initDb();
  }, (err) => {
    console.error("Cannot connect to MongoDB, shutting down");
    server.close();
  });
});





