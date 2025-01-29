// import { useState } from "react";
import { useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useDispatch, useSelector } from "react-redux";
import { placesActions } from "../store/places-slice.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const dispatch = useDispatch();

  // const [availablePlaces, setAvailablePlaces] = useState([]);
  const availablePlaces = useSelector((state) => state.places.availablePlaces);

  const setAvailablePlaces = (places) => {
    dispatch(placesActions.setAvailablePlaces(places));
  };

  // const [isFetching, setIsFetching] = useState();
  const isFetching = useSelector((state) => state.places.isFetching);

  const setIsFetching = (bool) => {
    dispatch(placesActions.setIsFetching(bool));
  };

  // const [error, setError] = useState();
  const error = useSelector((state) => state.places.error);

  const setError = (message) => {
    dispatch(placesActions.setError(message));
  };

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError(
          error.message || "Could not fetch places, please try again later."
        );
      }
    }

    fetchPlaces();

    return () => {};
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
