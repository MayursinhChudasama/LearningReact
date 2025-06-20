import { useEffect, useState } from "react";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../utils/http.js";

export default function NewEventsSection() {
  // const [data, setData] = useState();
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // useEffect(() => {
  //   fetchEvents()
  //     .then((events) => {
  //       setData(events);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || "failed"}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      className='content-section'
      id='new-events-section'>
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
