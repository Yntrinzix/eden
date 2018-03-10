const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
port = process.env.PORT || 3001,
routes = require('./server/routes/routes'),
cors = require('cors');

const websiteURI = 'http://localhost:3000/'
const DB = 'mongodb://admin:admin@ds261678.mlab.com:61678/eden'

//DB- Connect
mongoose.connect(DB);

//Server Body//

app.options(websiteURI, cors());
app.use(cors());
app.use(bodyParser.json());                           //Important
app.use(bodyParser.urlencoded({ extended: true }));   //Important
app.use('/api', routes);

//Listen to port//
app.listen(port, process.env.IP, () => console.log(`Server listening at ${port}`));