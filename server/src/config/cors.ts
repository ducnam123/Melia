const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Không được phép truy cập!!!"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
