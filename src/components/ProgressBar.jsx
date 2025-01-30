import { useProgressBar } from "./hooks/useProgressBar.js";

export default function ProgressBar({ timer }) {
  useProgressBar();

  return <progress max={timer} />;
}
