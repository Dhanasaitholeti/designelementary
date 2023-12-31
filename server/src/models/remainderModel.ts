import mongoose from "mongoose";
const schema = mongoose.Schema;

const recurringDays = [2, 3, 5, 7];
const categories = ["work", "personal", "home"];
const statusValues = ["completed", "pending"];

const remainderSchema = new schema(
  {
    date: {
      type: Date,
      require: true,
    },
    category: {
      type: String,
      enum: categories,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: statusValues,
      default: "pending",
    },
    email: {
      type: String,
      require: true,
    },
    contact_number: {
      type: String,
      require: true,
    },
    sms: {
      type: String,
      require: true,
    },
    recurring: {
      type: Number,
      enum: recurringDays,
      require: true,
    },
  },
  {
    collection: "remainders",
  }
);

const remainderModel = mongoose.model("remainders", remainderSchema);

export default remainderModel;
