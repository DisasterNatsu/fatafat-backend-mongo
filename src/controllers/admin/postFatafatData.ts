import { Request, Response } from "express";
import { IDataObject, TipsInterface } from "../../../types/typings";
import { FatafatData, Tips } from "../../schema/MongoSchema";
import { toNumber } from "../../helper/indexConverter";

export const postFatafatdata = async (req: Request, res: Response) => {
  // required data recieved from request's body

  let {
    date,
    data,
    indexAt,
  }: { date: string; data: IDataObject; indexAt: string } = req.body;

  // if necessary data is not provided

  if (!date || !data || !indexAt) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    // change the string index to number

    const index = toNumber(indexAt);

    data.index = index; // add it to the data object recieved from data

    // check if data with the same date already exists

    let existingData = await FatafatData.findOne({ date });

    if (!existingData) {
      existingData = new FatafatData({ date, data: [] }); // create new entry
    }

    // Find index of data with same index (only works if data exists)
    const existingIndex = existingData.data.findIndex(
      (item) => item.index === index
    );

    if (existingIndex !== -1) {
      // If an object with the same index exists, replace it with the new data
      existingData.data[existingIndex] = data;
    } else if (existingData.data.length < 8) {
      // If not, push the new data into the array
      existingData.data.push(data);
    } else {
      return res.status(400).json({ message: "Invalid Request" });
    }

    // Sort the data array by index
    existingData.data.sort((a, b) => a.index - b.index);

    // Save the updated data
    const updatedData = await existingData.save();

    return res.status(200).json(updatedData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened while writing the data", error });
  }
};

export const postBajiTips = async (req: Request, res: Response) => {
  let {
    date,
    tips,
    indexAt,
  }: { date: string; tips: TipsInterface; indexAt: string } = req.body;

  // if necessary data is not provided

  if (!date || !tips || !indexAt) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    // change the string index to number

    const index = toNumber(indexAt);

    tips.index = index; // add it to the data object recieved from data

    // since we do not need to store previous tips let find them by date

    const previousTipsData = await Tips.find({ date: { $ne: date } });

    if (previousTipsData.length > 0) {
      Tips.deleteMany({});
    }

    let existingData = await Tips.findOne({ date });

    if (!existingData) {
      existingData = new Tips({ date, tips: [] }); // create new entry
    }

    // Find index of data with same index (only works if data exists)

    const existingIndex = existingData.tips.findIndex(
      (item) => item.index === index
    );

    if (existingIndex !== -1) {
      // If an object with the same index exists, replace it with the new data
      existingData.tips[existingIndex] = tips;
    } else if (existingData.tips.length < 8) {
      // If not, push the new data into the array
      existingData.tips.push(tips);
    } else {
      return res.status(400).json({ message: "Invalid Request" });
    }

    // Sort the data array by index
    existingData.tips.sort((a, b) => a.index - b.index);

    // Save the updated data
    const updatedData = await existingData.save();

    return res.status(200).json(updatedData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened while writing the data", error });
  }
};
