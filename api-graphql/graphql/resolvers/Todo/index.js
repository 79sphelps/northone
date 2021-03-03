import Todo from "../../../server/models/Todo";

export default {
  Query: {
    findOne: async (parent, { _id }, context, info) => {
      return await Todo.findOne({ _id }).exec();
    },
    findAll: async (parent, args, context, info) => {
      const todos = await Todo.find({})
        .populate()
        .exec();

      return todos.map(u => ({
        _id: u._id.toString(),
        title: u.title,
        description: u.description,
        status: u.status,
        dueDate: u.dueDate
      }));
    }
  },
  Mutation: {
    create: async (parent, { todo }, context, info) => {
      const newTodo = await new Todo({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        dueDate: todo.dueDate
      });

      return new Promise((resolve, reject) => {
        newTodo.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    update: async (parent, { _id, todo }, context, info) => {
      return new Promise((resolve, reject) => {
        //User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          Todo.findOneAndUpdate(_id, { $set: { ...todo } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    delete: async (parent, { _id }, context, info) => {
      console.log('id: ', _id);

      return new Promise((resolve, reject) => {
        Todo.findByIdAndDelete(_id).exec((err, res) => {
          console.log(res);
          err ? reject(err) : resolve({_id: _id});
        });
      });
    },
    deleteAll: async (parent, { _id }, context, info) => {
      console.log('id: ', _id);

      return new Promise((resolve, reject) => {
        Todo.findByIdAndDelete(_id).exec((err, res) => {
          console.log(res);
          err ? reject(err) : resolve({_id: _id});
        });
      });
    }
  },
  Todo: {
    /*
    posts: async ({ _id }, args, context, info) => {
      return await Post.find({ author: _id });
    },

    comments: async ({ _id }, args, context, info) => {
      return await Comment.find({ author: _id });
    }
    */
  }
};