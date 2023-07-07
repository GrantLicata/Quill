import mongoose from "mongoose";

const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Note collection does not exist create a new one.
const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
