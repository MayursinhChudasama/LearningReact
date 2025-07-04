import { Link, useParams } from "react-router";
import classes from "./EventsList.module.css";
function EventsList({ events }) {
  // const params = useParams();
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li
            key={event.id}
            className={classes.item}>
            {/* {console.log("->", params)} */}
            <Link to={event.id}>
              <img
                src={event.image}
                alt={event.title}
              />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
