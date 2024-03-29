import mongoose, { Schema, Document } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  email: String,
  password: String,
});

// Define admin schema

const admin = new Schema({
  email: String,
  password: String,
});

// Define interface for FatafatData document
interface TipsData extends Document {
  date: string;
  tips: { index: number; tip: string }[];
  // Add createdAt field
}

const tips: Schema<TipsData> = new Schema({
  date: String,
  tips: [
    {
      index: { type: Number, required: true },
      tip: { type: String, required: true },
    },
  ],
});

// Define interface for FatafatData document
interface IFatafatData extends Document {
  date: string;
  data: { index: number; gameResultPatti: number; gameNumber: number }[];
  createdAt: Date; // Add createdAt field
}

// Define the fatafatData schema
const fatafatDataSchema: Schema<IFatafatData> = new Schema({
  date: { type: String, required: true },
  data: [
    {
      index: { type: Number, required: true },
      gameResultPatti: { type: Number, required: true },
      gameNumber: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Add createdAt field with default value
});

// Export FatafatData model
export const FatafatData = mongoose.model<IFatafatData>(
  "FatafatData",
  fatafatDataSchema
);

// Export User model
export const User = mongoose.model("User", userSchema);

// Export User model
export const Admin = mongoose.model("Admin", admin);

// Export Tips model
export const Tips = mongoose.model("Tips", tips);

// Export Patti tips model

// Export Patti Tips
export const KolkataFFTips = mongoose.model("KolkataFFTips", tips);
