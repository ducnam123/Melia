import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đắm chìm trong thế giới tràn ngập phúc lợi - Melia Rewards",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
