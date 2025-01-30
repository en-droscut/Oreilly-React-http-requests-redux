import { useDispatch, useSelector } from "react-redux";
import { placesActions } from "../../store/slices/places-slice.js";
import { fetchAvailablePlaces } from "../../api/http.js";
import { sortPlacesByDistance } from "../../api/loc.js";
import { useEffect } from "react";

export function useAvailablePlaces() {
  const dispatch = useDispatch();
  const availablePlaces = useSelector((state) => state.places.availablePlaces);

  const setAvailablePlaces = (places) => {
    dispatch(placesActions.setAvailablePlaces(places));
  };

  const isFetching = useSelector((state) => state.places.isFetching);
  const setIsFetching = (bool) => {
    dispatch(placesActions.setIsFetching(bool));
  };

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

  return {
    availablePlaces,
    isFetching,
    error,
  }
}