const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.plugin(require('mongoose-unique-validator'));
mongoose.Promise = require('bluebird');
const router = require('./config/router');
const errorHandler = require('./lib/errorHandler');

const { dbURI, port } = require('./config/environment');

const app = express();
app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Aye aye captain, pulling into port ${port}`));

module.exports = app;


// const express = require('express');
//
// const app = express();
// const port = process.env.PORT || 4000;
// app.use(express.static(`${__dirname}/public`));
//
// app.listen(port, () => console.log(`Express running on port ${port}`));
//
// module.exports = app;

// NPM_CONFIG_PRODUCTION false
// "bcrypt": "^1.0.3",
// "node-sass": "^4.7.2",

