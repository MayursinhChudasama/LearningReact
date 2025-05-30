import { useEffect, useState } from "react";
import { sortPlacesByDistance } from "../loc.js";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetchiing] = useState(false); //loadingState
  const [availablePlaces, setAvailablePlaces] = useState([]); //dataState
  const [error, setError] = useState(); //errorState

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetchiing(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch placessss");
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetchiing(false);
        });
      } catch (error) {
        setError(error);
      }
      setIsFetchiing(false);
    }
    fetchPlaces();
    // fetch("http://localhost:3000/places")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });
  }, []);
  if (error) {
    return (
      <ErrorPage
        title='Error occurred!!'
        message={error.message}
      />
    );
  }
  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching places data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
