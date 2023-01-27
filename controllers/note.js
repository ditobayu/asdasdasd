import User from "../models/User.js";

export const test = async (req, res) => {
  try {
    res.json({ message: "done" });
  } catch (error) {}
};
export const addproject = async (req, res) => {
  try {
    const { id, project } = req.body;
    const user = await User.findById(id);
    user.data.projects.push(project);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeProject = async (req, res) => {
  try {
    const { id, index } = req.body;
    const user = await User.findById(id);
    user.data.projects.splice(index, 1);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { id, task } = req.body;
    const user = await User.findById(id);
    user.data.tasks.push(task);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id, index, task } = req.body;
    const user = await User.findById(id);
    user.data.tasks[index] = { ...task };
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const editProject = async (req, res) => {
  try {
    const { id, index, project } = req.body;
    const user = await User.findById(id);
    user.data.projects[index] = { ...project };
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id, index } = req.body;
    const user = await User.findById(id);
    user.data.tasks.splice(index, 1);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { id } = req.header;
    const user = await User.findById(id);
    res.status(200).json(user.data.projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
