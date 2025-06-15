import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />{" "}
        {
          // this Outlet component is where the chbildren of RootLayout(in the App.js) will be rendered
        }
      </main>
    </>
  );
}
