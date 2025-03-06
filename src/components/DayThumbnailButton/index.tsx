import React, { useState } from "react";
import "./style.scss";
import { useCallback } from "react";

const DayThumbnailButton = ({ day, dailyPhoto, headline, onClick }) => {
  const [loading, setLoading] = useState(true);

  const handleOnCLick = useCallback(() => onClick(day), [day, onClick]);

  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className={"day-thumbnail-button-root"}
      role="button"
      onClick={handleOnCLick}
    >
      <div className={"container-relative"}>
        <div className={"container-absolute"}>
          <div className={"text-wrapper"}>
            <h2>Day {day}</h2>
          </div>
          <div className={"text-wrapper"}>
            <h3>{headline}</h3>
          </div>
        </div>
        <img src={dailyPhoto} onLoad={handleOnLoad} />
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
};

export default DayThumbnailButton;
