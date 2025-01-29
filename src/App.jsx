// import { useState } from "react";
import { useRef, useCallback, useEffect } from "react";
import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import { useDispatch, useSelector } from "react-redux";
import { placesActions } from "./store/places-slice.js";

function App() {
  const selectedPlace = useRef();
  const dispatch = useDispatch();

  // const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const errorUpdatingPlaces = useSelector(
    (state) => state.places.errorUpdatingPlaces
  );

  const setErrorUpdatingPlaces = (error) => {
    dispatch(placesActions.setErorrUpdatingPlaces(error));
  };

  // const [userPlaces, setUserPlaces] = useState([]);
  const userPlaces = useSelector((state) => state.places.userPlaces);

  const setUserPlaces = (places) => {
    dispatch(placesActions.setUserPlaces(places));
  };

  // const [isFetching, setIsFetching] = useState();
  const isFetching = useSelector((state) => state.places.isFetching);

  const setIsFetching = (bool) => {
    dispatch(placesActions.setIsFetching(bool));
  };

  // const [error, setError] = useState();
  const error = useSelector((state) => state.places.appError);

  const setError = (err) => {
    dispatch(placesActions.setAppError(err));
  };

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalIsOpen = useSelector((state) => state.places.modalIsOpen);

  const setModalIsOpen = (bool) => {
    dispatch(placesActions.setModalIsOpen(bool));
  };

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    const updatedPlaces = [...userPlaces];
    if (!updatedPlaces.some((place) => place.id === selectedPlace.id)) {
      updatedPlaces.unshift(selectedPlace);
    }

    setUserPlaces(updatedPlaces);

    try {
      await updateUserPlaces(updatedPlaces);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
    }
  }

  const handleRemovePlace = useCallback(async () => {
    const updatedPlaces = userPlaces.filter(
      (place) => place.id !== selectedPlace.current.id
    );

    setUserPlaces(updatedPlaces);

    try {
      await updateUserPlaces(updatedPlaces);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to delete place.",
      });
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occured"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title="An error occurred!" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places ..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
