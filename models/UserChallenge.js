import mongoose from "mongoose";

const UserChallengeSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    challengeName: {
      type: String,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const UserChallenge = mongoose.model("UserChallenge", UserChallengeSchema);
export default UserChallenge;
