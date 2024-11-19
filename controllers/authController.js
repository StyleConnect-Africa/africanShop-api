import {
  registerUser,
  loginUser,
  updateUser,
} from "../services/authService.js";

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is set by authMiddleware
    const updates = req.body;

    const updatedUser = await updateUser(userId, updates);

    res
      .status(200)
      .json({
        message: "User information updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStoreInfo = async (req, res) => {
  try {
    const updateData = req.body;
    const updatedStore = await updateStore(req.user.userId, updateData);
    res.status(200).json({
      message: "Store information updated successfully",
      updatedStore,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { register, login, updateStoreInfo, updateUserInfo };
