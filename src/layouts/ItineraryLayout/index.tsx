import React from "react";
import "./styles.scss";

const ItineraryLayout = ({ logoutButtonNode, daysListNode }) => {
  return (
    <div className="itinerary-layout">
      <div className="itinerary-content">
        {logoutButtonNode}
        <div className="days-grid">{daysListNode}</div>
      </div>
    </div>
  );
};

export default ItineraryLayout;
