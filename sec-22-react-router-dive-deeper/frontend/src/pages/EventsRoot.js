import { Outlet } from "react-router";
import EventNavigation from "../components/EventsNavigation";
export default function EventsRootLayout() {
  return (
    <>
      <EventNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
