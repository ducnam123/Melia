import mongoose from "mongoose";
import { winstonLogger } from "../middleware/logger";

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        winstonLogger.info("Kết nối cơ sở dữ liệu MongoDB thành công!!!");
      })
      .catch((error) => {
        winstonLogger.error("Lỗi khi kết nối với MongoDB: ", error);
      });
  } catch (error) {
    winstonLogger.error("Lỗi khi kết nối với cơ sở dữ liệu: ", error);
  }
};

export default connect;
