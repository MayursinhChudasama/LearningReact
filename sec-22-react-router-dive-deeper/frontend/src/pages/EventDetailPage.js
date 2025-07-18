import { redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");
  return <EventItem event={data.event} />;
}

export async function loader({ req, params }) {
  const id = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch event details." }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
export async function action({ params, request }) {
  const eventId = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
    });
  }

  return redirect("/events");
}
