import React from "react";
import classNames from "classnames";
import "./styles.scss"; // Import SCSS file

const DayLayout = ({
  previousButtonNode,
  nextButtonNode,
  photoNode,
  textNode,
  navBarNode,
}) => {
  return (
    <div className="day-layout">
      <div>{navBarNode}</div>
      <div className="day-layout-content">
        <div className={classNames("photo-text-container")}>
          <div className="photo-section">{photoNode}</div>
          <div className="text-section">{textNode}</div>
        </div>
      </div>
      <div className="navigation-buttons">
        <div>{previousButtonNode}</div>
        <div>{nextButtonNode}</div>
      </div>
    </div>
  );
};

export default DayLayout;
