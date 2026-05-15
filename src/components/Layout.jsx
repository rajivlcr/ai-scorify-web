import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto w-full p-4">{children}</div>

      <Footer />
    </div>
  );
}
