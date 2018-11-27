const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const validate = require("./service/auth").validate;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/UI/build')));

app.use("/api", validate);

//  Connect all our routes to our application
app.use('/api', routes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/UI/build/index.html'));
});

app.listen(port, () => console.log('App is listening on port ' + port));
