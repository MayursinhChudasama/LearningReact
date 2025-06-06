import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    async function callFunc() {
      async function fetchUserPlaces() {
        const response = await fetch("http://localhost:3000/user-places");
        const resData = await response.json();
        console.log(resData.places);

        return resData.places;
      }
      const places = await fetchUserPlaces();
      console.log(places);
      setUserPlaces(places);
    }
    callFunc();
  }, []);
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }
  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    async function updateUserPlaces(places) {
      const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({ places: places }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      return resData.message;
    } //updateUserPlaces
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
    }
  } //handleSelectPlace

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      async function updateUserPlaces(places) {
        const response = await fetch("http://localhost:3000/user-places", {
          method: "PUT",
          body: JSON.stringify({ places: places }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
        return resData.message;
      } //updateUserPlaces
      console.log("==>", userPlaces);

      console.log(
        "-->",
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );

      updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  return (
    <>
      <Modal
        open={modalIsOpen}
        onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img
          src={logoImg}
          alt='Stylized globe'
        />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText='Select the places you would like to visit below.'
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
