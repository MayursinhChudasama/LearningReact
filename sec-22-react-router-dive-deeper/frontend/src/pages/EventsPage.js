import { useLoaderData } from "react-router";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  if (data.isError) {
    return <p>Error ocurred.</p>;
  }

  return (
    <>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

export async function eventLoader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    return new Response(
      JSON.stringify({ message: "Could not fetch events." }),
      { status: 500 }
    );
  } else {
    // const resData = await response.json();
    return response;
  }
}
