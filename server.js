const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== "dev") {
  app.use(cors());
} else {
  let corsOptions = {
      // origin: 'http://localhost:3000'
      origin: 'https://northone-fp6p0zqmv-79sphelps-projects.vercel.app/'
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

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// catch 404 and forward to error handler
// note this is after all good routes and is not an error handler
// to get a 404, it has to fall through to this route - no error involved
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers - these take err object.
// these are per request error handlers.  They have two so in dev
// you get a full stack trace.  In prod, first is never setup

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
