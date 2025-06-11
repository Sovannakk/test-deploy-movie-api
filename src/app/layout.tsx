import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Provider } from "@/context/provider";
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