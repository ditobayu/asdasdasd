import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userID1: {
      type: String,
    },
    userID2: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
