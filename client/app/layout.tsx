import type { Metadata } from "next";
import { viVN } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/css/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://melias.vercel.app/"),
  title: {
    default: "Melia",
    template: "%s | Khách sạn Melia",
  },
  applicationName: "Khách sạn Melia",
  authors: [{ name: "Trần Văn Lương", url: "https://github.com/tranluong460" }],
  generator: "Next.js",
  keywords: ["Melia", "Hotel", "Khách sạn Melia"],
  referrer: "origin-when-cross-origin",
  creator: "Trần Văn Lương",
  publisher: "Trần Văn Lương",
  icons: {
    icon: "/logo.svg",
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
            <AntdRegistry>
              <main>{children}</main>
            </AntdRegistry>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
