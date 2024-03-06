import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin, FatafatData } from "../../../schema/MongoSchema";
import { GameEntry, TokenVerifyType } from "../../../../types/typings";

export const AdminRegister = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body; // get data from reqest's body

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Required data missing" });
  } else if (password.listen < 5) {
    return res.status(400).json({ message: "Password too small" });
  } else if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Password doesn't match",
    });
  }

  try {
    const adminInDb = await Admin.find();

    if (adminInDb.length > 1) {
      return res.status(403).json({
        message: "Admin account can't be created without proper permissions",
      });
    }

    const salt = bcrypt.genSaltSync(10); // generate salt

    const hashedPassword = bcrypt.hashSync(password, salt); // hash the password

    const data = { email, password: hashedPassword }; // data object for prisma

    const newAdmin = new Admin(data);

    newAdmin.save();

    res.status(200).json({ message: "Account Created!" }); // send the response
  } catch (error) {
    return res.status(500).json({
      message: "Something happened while registering a new admin",
      error,
    });
  }
};

export const AdminLogIn = async (req: Request, res: Response) => {
  // get data from request's body

  const email: string = req.body.email!;
  const password: string = req.body.password!;

  if (!email || !password) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    // check if there is an email with the account with the provided email
    const adminInDb = await Admin.findOne({ email: email });

    // if there is no admin account with that email
    if (!adminInDb) return res.status(403).json({ message: "Unauthorized" });

    const isPasswordValid = bcrypt.compareSync(password, adminInDb.password!);

    // if password not valid

    if (!isPasswordValid)
      return res.status(403).json({ message: "Unauthorized" });

    // sign a jwt token

    const token = jwt.sign(
      { email: adminInDb.email },
      process.env.ADMIN_JWT_SECRET!,
      { expiresIn: "48h" }
    );

    // response with data

    return res.status(200).json({ authToken: token, email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened while logging in", error });
  }
};

export const AdminTokenVerification = (req: Request, res: Response) => {
  // get token

  const token = req.header("ff-admin-token");

  // if no token

  if (!token) return res.status(403).json({ message: "Unauthorised" });

  try {
    // it returns the issuedAt, ExpiresAt and the email used to sign it | if not a valid token, it will trigger the catch block

    const isAuth = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET!
    ) as TokenVerifyType;

    return res.status(200).json({ authenticated: true, admin: isAuth });
  } catch (error) {
    return res.status(500).json({
      authenticated: false,
      message: "Something happened when verifying admin data",
      error,
    });
  }
};

export const GeneratedData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await FatafatData.find({ date: { $ne: currentDate } })
      .sort({ createdAt: -1 })
      .limit(10); // Fetch only the last ten records

    const originalArray: any = lastTen;

    const newArray: number[][] = originalArray.map((entry: any) => {
      const innerArray: number[] = Array(8).fill(null);

      entry.data.forEach((gameData: any) => {
        if (gameData.index < 8) {
          innerArray[gameData.index] = gameData.gameNumber;
        }
      });

      return innerArray;
    });

    const historicalData: (number | null)[][] = newArray;

    const predictHighestProbabilityBalls = (
      data: (number | null)[][]
    ): number[] | string => {
      const allBalls: (number | null)[] = data
        .flat()
        .filter((ball) => ball !== null);

      // Check if there are any non-closed slots
      if (allBalls.length === 0) {
        return "All closed or missing";
      }

      const ballCounter: Record<number, number> = {};
      allBalls.forEach((ball) => {
        if (ball !== null) {
          ballCounter[ball] = (ballCounter[ball] || 0) + 1;
        }
      });

      const sortedBalls = Object.entries(ballCounter).sort(
        (a, b) => b[1] - a[1]
      );
      const mostCommonBalls = sortedBalls.slice(0, 3);

      const predictedBalls: number[] = mostCommonBalls.map(([ball]) =>
        parseInt(ball, 10)
      );
      return predictedBalls;
    };

    // Example usage

    const result = predictHighestProbabilityBalls(historicalData);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};
