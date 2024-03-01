import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../schema/MongoSchema";
import { TokenVerifyType } from "../../../../types/typings";

export const ClientRegister = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body; // get data from reqest's body

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Required data missing" });
  } else if (password.listen < 5) {
    return res.status(400).json({ message: "Password too small" });
  } else if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Make sure the value of Password is same as Confirm Password",
    });
  }

  try {
    const userInDb = await User.findOne({ email: email });

    if (userInDb) {
      return res.status(405).json({
        message: `An account with the email ${email} already exists`,
      });
    }

    const salt = bcrypt.genSaltSync(5); // generate salt

    const hashedPassword = bcrypt.hashSync(password, salt); // hash the password

    const data = { email, password: hashedPassword }; // data object for prisma

    const newUser = new User(data);

    newUser.save();

    res.status(200).json({ message: "Account Created!" }); // send the response
  } catch (error) {
    return res.status(500).json({
      message: "Something happened while registering a new user",
      error,
    });
  }
};

export const ClientLogIn = async (req: Request, res: Response) => {
  // get data from request's body

  const email: string = req.body.email!;
  const password: string = req.body.password!;

  if (!email || !password) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    // check if there is an email with the account with the provided email
    const userInDb = await User.findOne({ email: email });

    // if there is no admin account with that email
    if (!userInDb)
      return res.status(403).json({
        message: `No account with the email ${email} is registered with us`,
      });

    const isPasswordValid = bcrypt.compareSync(password, userInDb.password!);

    // if password not valid

    if (!isPasswordValid)
      return res.status(403).json({ message: "Unauthorized" });

    // sign a jwt token

    const token = jwt.sign(
      { email: userInDb.email },
      process.env.USER_JWT_SECRET!,
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

export const TokenVerification = (req: Request, res: Response) => {
  // get token from request's header

  const token = req.header("ff-user-token");

  // if no Token

  if (!token) return res.status(403).json({ message: "Unauthorised" });

  try {
    // it returns the issuedAt, ExpiresAt and the email used to sign it | if not a valid token, it will trigger the catch block

    const isAuth = jwt.verify(
      token,
      process.env.USER_JWT_SECRET!
    ) as TokenVerifyType;

    return res.status(200).json({ authenticated: true, user: isAuth });
  } catch (error) {
    return res.status(500).json({
      authenticated: false,
      message: "Something happened when verifying admin data",
      error,
    });
  }
};
