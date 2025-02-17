module.exports = (mongoose) => {
  const Todo = mongoose.model(
    "todo",
    mongoose.Schema(
      {
        title: String,
        description: String,
        status: Boolean,
        dueDate: String,
        start: String,
      },
      { timestamps: true }
    )
  );

  return Todo;
};
