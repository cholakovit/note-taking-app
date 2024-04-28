import { Request, Response } from "express";
import * as argon2 from "argon2";
import userModel from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import {
  ERROR_CREATING_USER,
  ERROR_HASHING_PASSWORD,
  ERROR_VERIFING_USER,
  USER_CREATED_SUCCESSFULLY,
  USER_NOT_FOUND,
} from "../helper/constants";
import logger from "../logger/logger";

class UserController {
  login = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = await this.verifyUsers(username, password);

    if (result === true) {
      res.status(StatusCodes.OK).send({ result });
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ result });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const hashedPassword: string = await this.hashPassword(password);
      const newUser = new userModel({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      logger.debug(USER_CREATED_SUCCESSFULLY);
      res.status(StatusCodes.CREATED).send({ newUser });
    } catch (err) {
      logger.error(ERROR_CREATING_USER, err);
    }
  };

  verifyUsers = async (username: string, password: string) => {
    try {
      const user = await userModel.findOne({ username }).exec();
      if (!user) {
        logger.debug(USER_NOT_FOUND);
        return false;
      }

      const validPassword = await argon2.verify(user.password, password);
      return validPassword;
    } catch (err) {
      logger.error(ERROR_VERIFING_USER, err);
      return false;
    }
  };

  hashPassword = async (password: string): Promise<string> => {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (err) {
      logger.error(ERROR_HASHING_PASSWORD, err);
      throw new Error(ERROR_HASHING_PASSWORD);
    }
  };
}

export default UserController;
