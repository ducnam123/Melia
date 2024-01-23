import { currentDateTime } from "../lib/date";

const successResponse = (
  resultCode: number,
  title: string,
  message: string,
  data?: any
) => ({
  result_code: resultCode,
  time: currentDateTime(),
  result: {
    title,
    message,
    data,
  },
});

const errorResponse = (
  resultCode: number,
  title: string,
  error: any,
  data?: any
) => ({
  result_code: resultCode,
  time: currentDateTime(),
  result: {
    title,
    error,
    data,
  },
});

export { successResponse, errorResponse };
