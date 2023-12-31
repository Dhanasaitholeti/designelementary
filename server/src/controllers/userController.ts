import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../utils/helpers/tokenGenerator";
import getUserDataWithEmail from "../utils/helpers/emaildata";
import userModel from "../models/userModel";

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const EmailUsersData = await getUserDataWithEmail(email);
    if (!EmailUsersData)
      return res.status(403).json({ message: "Invalid Credentials" });

    const passwdRes = await bcrypt.compare(
      password,
      EmailUsersData.password_hash
    );

    if (!passwdRes)
      return res
        .status(403)
        .json({ message: "Password provided is incorrect" });

    const token = await tokenGenerator({
      UserId: EmailUsersData.id,
      Email: EmailUsersData.email,
    });

    res.status(200).json({
      token,
      user: {
        id: EmailUsersData.id,
        name: EmailUsersData.name,
        email: EmailUsersData.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to login" });
  }
};

export const userSignup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  try {
    const EmailUsersData = await getUserDataWithEmail(email);
    if (EmailUsersData)
      return res.send(400).json({
        message: "Email is already in use, Try with a different email",
      });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const NewUser = await userModel.create({
      name,
      email,
      password_hash,
    });

    res.status(201).json({ message: "Created New User" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to create new Account" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ user: req.userData });
  } catch (error) {
    res.status(500).json({ message: "unable to get user. Try to Login" });
  }
};
