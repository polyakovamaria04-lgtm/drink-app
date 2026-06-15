import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const updateData = { name };

    if (req.file) {
      updateData.avatarURL = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: updatedUser.name,
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
