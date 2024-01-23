import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đắm chìm trong thế giới tràn ngập phúc lợi - Melia Rewards",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
