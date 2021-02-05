const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// let corsOptions = {
//     origin: 'http://localhost:3000'
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./api/models');
db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the DB'))
  .catch(err => {
    console.log('Cannot connect to the DB');
    process.exit();
  });

// if (process.env.NODE_ENV !== "dev") {
//   app.use(express.static(path.join(__dirname, '/client/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'))
//   });
// }

if (process.env.NODE_ENV !== "dev") {
  app.use('/', express.static(path.join(__dirname, '/build')));
}

require('./api/routes')(app);
// const todoRoutes = require('./api/routes');
// app.use('/api', todoRoutes);

if (process.env.NODE_ENV !== "dev") {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the server application.' });
// });