const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/evaluation");
};

// User Schema

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: false, default: "Female0" },
    type: { type: String, required: false, default: "customer" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// Branch Detail Schema

const BranchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("branch", BranchSchema);

// Master Account

const masterSchema = new mongoose.Schema(
  {
    userdetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    balance: { type: String, required: true },
    branchinfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
      required: true,
    },
    userdetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fixed",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Master = mongoose.model("master", masterSchema);

// Saving Schema

const savingSchema = new mongoose.Schema(
  {
    account_number: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Saving = mongoose.model("saving", savingSchema);

// FixedAccount

const fixedSchema = new mongoose.Schema(
  {
    account_number: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    startDate: { type: String, required: true },
    maturityDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Fixed = mongoose.model("fixed", fixedSchema);

app.listen(5500, async () => {
  try {
    await connect();
  } catch (error) {
    console.log("error:", error);
  }

  console.log("listining on port 5500");
});
