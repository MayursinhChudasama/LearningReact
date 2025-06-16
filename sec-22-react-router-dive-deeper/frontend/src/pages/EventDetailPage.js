import { useLoaderData } from "react-router";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useLoaderData();
  return <EventItem event={data.event} />;
}

export async function eventDetailLoader({ resp, params }) {
  const id = params.eventID;
  console.log("-->", resp);
  console.log(params);
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
