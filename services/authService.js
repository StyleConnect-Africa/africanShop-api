import User from "../model/User.js";
import jsonwebtoken from "jsonwebtoken";

const registerUser = async ({ name, email, password, phoneNo, role }) => {
  const user = new User({ name, email, password, phoneNo, role });
  return user.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Use the matchPassword method from the User model
  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jsonwebtoken.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return { token, user };
};

export { registerUser, loginUser };
