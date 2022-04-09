import Navbar from "./navbar";
import Footer from "./footer.server";
import { ReactElement } from "react";

//@ts-ignore
export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="mb-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      <Footer />
    </div>
  );
}
