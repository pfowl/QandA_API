const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

// Port to listen on
app.set('port', 3000);
// Middleware
app.use(cors()); //<- might need this for front end requests
app.use(express.json());

app.use('', router);

// console.log('DATE', new Date().toISOString());
app.listen(app.get('port'), () => {
  console.log('Listening on port,', app.get('port'));
});
