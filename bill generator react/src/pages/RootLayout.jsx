import { Outlet } from "react-router";
import Navbar from "../componenets/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
