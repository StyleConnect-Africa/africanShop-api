import User from "../model/User.js";
import jsonwebtoken from "jsonwebtoken";
import { sendEmail } from "../utils/sendmail.js";
import axios from "axios";
import transporter from "../config/nodemailerConfig.js";

const registerUser = async ({
  name,
  email,
  password,
  phoneNo,
  role,
  storeName,
  businessEmail,
  businessPhoneNo,
}) => {
  try {
    const user = new User({
      name,
      email,
      password,
      phoneNo,
      role,
      storeName,
      businessEmail,
      businessPhoneNo,
    });
    const savedUser = await user.save();

    if (role === "vendor") {
      // Send email
      console.log("Attempting to send email to:", businessEmail);

      if (businessEmail) {
        await sendEmail(
          businessEmail,
          "Registration Successful",
          `Hello ${name}, your store "${storeName}" has been successfully registered.`
        );
      } else {
        console.error(
          "No business email provided for sending registration email."
        );
      }

      // Send SMS
      const platfomrName = "Style Connect Africa";
      const message = `Welcome to${platfomrName} , ${name}! Your store "${storeName}" is now live. We're excited to have you on board. Let's grow together!`;

      const url = "https://smsc.hubtel.com/v1/messages/send";
      const params = {
        From: process.env.SENDER_ID, // Replace with your sender ID
        To: businessPhoneNo,
        Content: message,
        ClientId: process.env.HUBTEL_CLIENT_ID,
        ClientSecret: process.env.HUBTEL_CLIENT_SECRET,
        RegisteredDelivery: true,
      };

      try {
        const response = await axios.get(url, { params });
        console.log("SMS sent successfully:", response.data);
      } catch (smsError) {
        console.error(
          "Error sending SMS:",
          smsError.response ? smsError.response.data : smsError.message
        );
      }
    }

    return savedUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "This email is already registered. Please use a different email."
      );
    } else if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      throw new Error(`Validation error: ${messages.join(", ")}`);
    } else {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Use the matchPassword method from the User model
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jsonwebtoken.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return { token, user };
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "Invalid credentials"
    ) {
      throw new Error("Login failed: Incorrect email or password.");
    } else {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
};
const updateUser = async (userId, updates) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      throw new Error(`Validation error: ${messages.join(", ")}`);
    } else {
      throw new Error(`Update failed: ${error.message}`);
    }
  }
};
 const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id; // Assuming req.user is set by authMiddleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = `/uploads/profile_pictures/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { registerUser, loginUser, updateUser,uploadProfilePicture };
