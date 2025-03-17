module.exports = {
  // url: 'mongodb://localhost:27017/northOneToDos'
  url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.po6aaqm.mongodb.net/northOneToDos?retryWrites=true&w=majority`
};
