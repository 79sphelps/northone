import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};


const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: false
  },
  dueDate: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.model("Todo", TodoSchema);
