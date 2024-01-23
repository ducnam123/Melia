import mongoose from "mongoose";
import { winstonLogger } from "../middleware/logger";

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        winstonLogger.info("Kết nối Mongodb thành công!!!");
      })
      .catch((error) => {
        winstonLogger.error("Lỗi kết nối với Mongodb: ", error);
      });
  } catch (error) {
    winstonLogger.error("Không thể kết nối với cơ sở dữ liệu: ", error);
  }
};

export default connect;
