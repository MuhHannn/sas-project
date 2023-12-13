import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
  },
  Note: {
    type: String,
    maxlength: 2000,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let NotesModel;

try {
  NotesModel = mongoose.model("Notes");
} catch (error) {
  NotesModel = mongoose.model("Notes", noteSchema);
}

export default NotesModel;
