import { Provider } from "@/context/provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  );
}