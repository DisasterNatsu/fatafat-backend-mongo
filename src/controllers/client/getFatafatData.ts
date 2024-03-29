import { Request, Response } from "express";
import { FatafatData, KolkataFFTips, Tips } from "../../schema/MongoSchema";

export const getFatafatData = async (req: Request, res: Response) => {
  const date: string = req.params.date;

  console.log(date);

  try {
    let data = await FatafatData.findOne({ date });

    if (!data) return res.status(200).json(null);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server error" });
  }
};

export const getPreviousTwoDays = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await FatafatData.find({ date: { $ne: currentDate } })
      .sort({ createdAt: -1 })
      .limit(2); // Fetch only the last ten records

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

export const getPreviousTenDays = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await FatafatData.find().sort({ createdAt: -1 }).limit(50); // Fetch only the last ten records

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

export const previousData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  console.log(currentDate);

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await FatafatData.find({ date: { $ne: currentDate } }).sort(
      { createdAt: -1 }
    );

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

export const getTipsData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const tipsData = await Tips.findOne({ date: currentDate });

    return res.status(200).json(tipsData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

// get patti tips

export const getPattiTips = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const tipsData = await KolkataFFTips.findOne({ date: currentDate });

    return res.status(200).json(tipsData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};
