require('dotenv').load();

const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const authService = require('./service/auth');
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger-config');
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan');
const initDb = require('./service/db').initDb;
const config = require("./config");
const port = process.env.PORT || 5000;

const app = express();
app.use(morgan(':method :url :status - :response-time ms'));
app.disable('x-powered-by'); //Security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors(config.corsOptions));
app.use(cors(config.corsOptions));
app.get('/', (req,res) => { res.redirect('/docs')});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)));
app.use('/auth', authRoutes);
app.use('/api', authService.checkToken, routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong, sorry!');
});
app.use('/health', healthcheck({
  healthy : () => {
    return { smooth: 'sailing',
      gitCommit: process.env.LAST_GIT_SHA,
      uptime: process.uptime() }
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


const server = app.listen(port, () => {
  console.log('API started on port ' + port + ' at ' + new Date().toString());
  mongoose.connect(config.mongodb.URI, { useUnifiedTopology: true, useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true }).then(async () => {
    await initDb();
  }, (err) => {
    console.error(err);
    console.error("Cannot connect to MongoDB, shutting down");
    server.close();
  });
});





