import { Request, Response } from "express";
import remainderModel from "../models/remainderModel";

export const getRemainder = async (req: Request, res: Response) => {
  try {
    const remainders = await remainderModel.find({});
    res.status(200).json({ remainders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: error.messsage });
  }
};

export const createRemainder = async (req: Request, res: Response) => {
  const {
    date,
    category,
    subject,
    description,
    email,
    contact_number,
    sms,
    recurring,
  } = req.body;
  try {
    const newRemainder = await remainderModel.create({
      date,
      subject,
      category,
      description,
      email,
      contact_number,
      sms,
      recurring,
    });

    res
      .status(201)
      .json({ message: "New reminder created", data: newRemainder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateRemainder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    date,
    category,
    subject,
    description,
    email,
    contact_number,
    sms,
    recurring,
  } = req.body;

  try {
    const updatedRemainder = await remainderModel.findByIdAndUpdate(
      id,
      {
        date,
        subject,
        category,
        description,
        email,
        contact_number,
        sms,
        recurring,
      },
      { new: true }
    );

    if (!updatedRemainder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({
      message: "Reminder updated successfully",
      data: updatedRemainder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRemainder = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    console.log("herer");
    await remainderModel.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: error.messsage });
  }
};

export const updateRemainderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const completedRemainder = await remainderModel.findByIdAndUpdate(
      id,
      {
        status: "completed",
      },
      { new: true }
    );
    res.status(200).json({
      remainder: completedRemainder,
      message: "Thank you completing the task",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured while updating task" });
  }
};
