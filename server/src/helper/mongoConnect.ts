import mongoose from "mongoose";
import logger from "../logger/logger";

class MongoConnect {
  MONGODB_API: string = process.env.MONGODB_API!;

  async connectDB() {
    try {
      const conn = await mongoose.connect(this.MONGODB_API);
      conn.connection.on("error", (err: Error) => {
        logger.error(`MongoDB Connection Problem! ${err.message}`);
      });

      logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      const error = err as Error;
      logger.error(`Error Occured: ${error.message}`);
    }
  }
}

export default MongoConnect;
