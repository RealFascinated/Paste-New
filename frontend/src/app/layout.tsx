import { getConfig } from "../common/config";
import { pasteFont } from "../common/font/font";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

export async function generateMetadata() {
  const config = await getConfig();

  return {
    title: config.siteTitle,
    description: "Create, share and view code snippets with ease.",
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={pasteFont.className}>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
