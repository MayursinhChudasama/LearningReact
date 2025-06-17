import { redirect } from "react-router";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return <EventForm method={"POST"} />;
}
