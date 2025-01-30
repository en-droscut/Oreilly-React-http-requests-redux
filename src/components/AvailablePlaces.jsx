import { useAvailablePlaces } from "./hooks/useAvailablePlaces.js";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const { availablePlaces, isFetching, error } = useAvailablePlaces();

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
