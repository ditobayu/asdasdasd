import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    data: {
      type: Array,
      default: [],
    },
    participant: {
      type: Array,
      default: [],
    },
    startDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", ChallengeSchema);
export default Challenge;
