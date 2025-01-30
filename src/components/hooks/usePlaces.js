import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPlaces, updateUserPlaces } from "../../http.js";
import { placesActions } from "../../store/slices/places-slice";

export function usePlaces() {
  const dispatch = useDispatch();
  const selectedPlace = useRef();

  const userPlaces = useSelector((state) => state.places.userPlaces);
  const errorUpdatingPlaces = useSelector(
    (state) => state.places.errorUpdatingPlaces
  );
  const isFetching = useSelector((state) => state.places.isFetching);
  const error = useSelector((state) => state.places.appError);
  const modalIsOpen = useSelector((state) => state.places.modalIsOpen);

  useEffect(() => {
    async function fetchPlaces() {
      dispatch(placesActions.setIsFetching(true));

      try {
        const places = await fetchUserPlaces();
        dispatch(placesActions.setUserPlaces(places));
      } catch (error) {
        dispatch(
          placesActions.setAppError({
            message: error.message || "Failed to fetch user places.",
          })
        );
      }

      dispatch(placesActions.setIsFetching(false));
    }

    fetchPlaces();
  }, [dispatch]);

  const handleStartRemovePlace = (place) => {
    dispatch(placesActions.setModalIsOpen(true));
    selectedPlace.current = place;
  };

  const handleStopRemovePlace = () => {
    dispatch(placesActions.setModalIsOpen(false));
  };

  const handleSelectPlace = async (selectedPlace) => {
    const updatedPlaces = [...userPlaces];
    if (!updatedPlaces.some((place) => place.id === selectedPlace.id)) {
      updatedPlaces.unshift(selectedPlace);
    }

    dispatch(placesActions.setUserPlaces(updatedPlaces));

    try {
      await updateUserPlaces(updatedPlaces);
    } catch (error) {
      dispatch(placesActions.setUserPlaces(userPlaces));
      dispatch(
        placesActions.setErorrUpdatingPlaces({
          message: error.message || "Failed to update places",
        })
      );
    }
  };

  const handleRemovePlace = useCallback(async () => {
    const updatedPlaces = userPlaces.filter(
      (place) => place.id !== selectedPlace.current.id
    );

    dispatch(placesActions.setUserPlaces(updatedPlaces));

    try {
      await updateUserPlaces(updatedPlaces);
    } catch (error) {
      dispatch(placesActions.setUserPlaces(userPlaces));
      dispatch(
        placesActions.setErorrUpdatingPlaces({
          message: error.message || "Failed to delete place.",
        })
      );
    }

    dispatch(placesActions.setModalIsOpen(false));
  }, [dispatch, userPlaces]);

  const handleError = () => {
    dispatch(placesActions.setErorrUpdatingPlaces(null));
  };

  return {
    userPlaces,
    errorUpdatingPlaces,
    isFetching,
    error,
    modalIsOpen,
    handleStartRemovePlace,
    handleStopRemovePlace,
    handleSelectPlace,
    handleRemovePlace,
    handleError,
  };
}
