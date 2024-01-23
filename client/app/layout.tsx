import type { Metadata } from "next";
import { viVN } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/css/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_ENV === "development"
      ? "http://localhost:3000"
      : "https://melias.vercel.app/"
  ),
  title: {
    default: "Melia",
    template: "%s | Khách sạn Melia",
  },
  icons: {
    icon: "/logo.svg",
  },
  applicationName: "Khách sạn Melia",
  authors: [{ name: "Trần Văn Lương", url: "https://github.com/tranluong460" }],
  generator: "Next.js",
  keywords: ["Melia", "Hotel Melia", "Melia Hotel", "Khách sạn Melia"],
  referrer: "origin-when-cross-origin",
  creator: "Vercel",
  publisher: "Trần Văn Lương",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClerkProvider localization={viVN}>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};
export default RootLayout;
