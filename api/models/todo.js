module.exports = (mongoose) => {
  const Todo = mongoose.model(
    "todo",
    mongoose.Schema(
      {
        title: String,
        description: String,
        status: Boolean,
        dueDate: String,
      },
      { timestamps: true }
    )
  );

  return Todo;
};
