// components/MainLayout.tsx
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
