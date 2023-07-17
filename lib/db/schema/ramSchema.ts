import mongoose from "mongoose";

const ramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Ram = mongoose.models["Ram"] || mongoose.model("Ram", ramSchema);
