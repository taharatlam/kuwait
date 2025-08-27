import { Inter } from "next/font/google";

import "@/scss/main.scss";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ahmed Hasan Safar Co",
  description: "Ahmed Hasan Safar Co",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
          <ToastContainer />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
