import Chat from "../models/Chat.js";
import User from "../models/User.js";

// READ

export const sendChat = async (req, res) => {
  try {
    const { userID1, userID2, message } = req.body;
    const newChat = new Chat({
      userID1,
      userID2,
      message,
    });
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    console.log(error.messsage);
    res.status(404).json({ message: error.message });
  }
};

export const getChat = async (req, res) => {
  try {
    const { userID1, userID2 } = req.body;
    const chatList = await Chat.find({
      $or: [
        {
          userID1,
          userID2,
        },
        { userID2: userID1, userID1: userID2 },
      ],
    });
    res.status(200).json(chatList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    const userList = user.map((val) => {
      return {
        _id: val._id,
        firstName: val.firstName,
        lastName: val.lastName,
      };
    });
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return { _id, firstName, lastName, picturePath, location, occupation };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return { _id, firstName, lastName, picturePath, location, occupation };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
