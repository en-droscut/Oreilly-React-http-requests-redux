import ProgressBar from "./ProgressBar.jsx";
import { useDeleteConfirmation } from "./hooks/useDeleteConfirmation.js";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useDeleteConfirmation(TIMER, onConfirm);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
