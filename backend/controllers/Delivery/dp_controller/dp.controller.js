import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DelPersonModel from "../../../models/Delivery/Dp_model/del_person.model.js";

export const registerDelPerson = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    phone,
    address,
    vehicleNumber,
    password,
    status,
  } = req.body;

  if (
    !email ||
    !firstname ||
    !lastname ||
    !phone ||
    !address ||
    !vehicleNumber ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await DelPersonModel.findOne({ email });
    if (userExists)
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });

    if (String(phone).length !== 10) {
      return res.status(200).json({
        success: false,
        message: "Phone number must contain 10 digits!",
      });
    }

    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter at least 8 characters as password!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new DelPersonModel({
      email,
      firstname,
      lastname,
      phone,
      address,
      vehicleNumber,
      password: hashedPassword,
      status,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const delPersonLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await DelPersonModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.firstname + " " + user.lastname,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const allDelPersons = async (req, res) => {
  try {
    const users = await DelPersonModel.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getDelPerson = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await DelPersonModel.findById(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeDelPerson = async (req, res) => {
  const { id } = req.params;
  try {
    await DelPersonModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const updateDelPerson = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    firstname,
    lastname,
    phone,
    address,
    vehicleNumber,
    password,
    status,
  } = req.body;

  try {
    let updatedData = {
      email,
      firstname,
      lastname,
      phone,
      address,
      vehicleNumber,
      status,
    };

    // Hash the password only if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      updatedData.password = await bcrypt.hash(password, salt); // Hash password
    }

    // Update user data
    const user = await DelPersonModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
