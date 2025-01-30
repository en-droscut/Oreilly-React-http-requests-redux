import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { progressBarActions } from "../store/slices/progressBar-slice.js";

export default function ProgressBar({ timer }) {
  const dispatch = useDispatch();

  // const [remainingTime, setRemainingTime] = useState(timer);
  const remainingTime = useSelector((state) => state.progressBar.remainingTime);

  const setRemainingTime = (time) => {
    dispatch(progressBarActions.setRemainingTime(time));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 10);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timer} />;
}
