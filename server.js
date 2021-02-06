const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== "dev") {
  app.use(cors());
} else {
  let corsOptions = {
      origin: 'http://localhost:3000'
  };
  app.use(cors(corsOptions));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./api/models');
db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the DB'))
  .catch(err => {
    console.log('Cannot connect to the DB');
    process.exit();
  });

if (process.env.NODE_ENV !== "dev") {
  app.use('/', express.static(path.join(__dirname, '/build')));
}

require('./api/routes')(app);

if (process.env.NODE_ENV !== "dev") {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
