import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

export const createChallenge = async (req, res) => {
  try {
    const { title, desc, participant, data, startDate } = req.body;
    const challenge = new Challenge({
      title,
      desc,
      participant,
      data,
      startDate,
    });
    const savedChallenge = await challenge.save();
    res.status(200).json(savedChallenge);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const joinChallenge = async (req, res) => {
  try {
    const { userId, challengeId } = req.body;
    const challenge = await Challenge.findByIdAndUpdate(challengeId);
    const user = await User.findById(userId);

    challenge.participant.push({
      id: user._id,
      name: user.firstName + " " + user.lastName,
      progress: 0,
    });
    await challenge.save();
    res.status(200).json(challenge);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getChallenge = async (req, res) => {
  try {
    const { id } = req.header;
    console.log(id);
    const challenge = await Challenge.findById(id);
    res.status(200).json(challenge);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllChallenge = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
