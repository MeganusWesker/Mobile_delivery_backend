import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter device name"],
  },

  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  
  price: {
    type: Number,
    required: [true, "please enter device price"],
  },

  processor: {
    type: String,
    required: [true, "please enter device processor"],
  },

  ram: {
    type: Number,
    required: [true, "please enter device ram"],
  },

  rom: {
    type: Number,
    required: [true, "please enter device rom"],
  },

  os: {
    type: String,
    required: [true, "please enter device os"],
  },

  type: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Mobile = mongoose.model("Mobile", mobileSchema);
