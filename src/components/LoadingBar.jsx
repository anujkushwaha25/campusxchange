import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./LoadingBar.css";

const LoadingBar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading when route changes
    setLoading(true);
    setProgress(0);

    const startTimer = setTimeout(() => {
      setProgress(70);
    }, 50);

    const completeTimer = setTimeout(() => {
      setProgress(100);
    }, 500);

    const hideTimer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 700);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="youtube-loading-container">
      <div
        className="youtube-loading-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;