import { useNavigate, useParams } from "react-router-dom";
import usePosts from "../../hooks/api/usePosts.tsx";
import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import DayLayout from "../../layouts/DayLayout";

import "./style.scss";
import { ErrorBoundary } from "react-error-boundary";
import NavigationButton from "../../components/NavigationButton";

const DayView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const day_id: number = Number(params.day_id);
  const itinerary_id: string = params.itinerary_id;
  const { data, isFetching } = usePosts(itinerary_id);

  const days = data?.brief || [];

  const current_day_index = days.findIndex((dayObj) => dayObj.day === day_id);
  const current_day = days[current_day_index];

  const previousDay = days[current_day_index - 1]
  const nextDay= days[current_day_index + 1]

  const textNodeContent = useMemo(
    () =>
      current_day && (
        <>
          <h1>
            Day {current_day.day} {current_day.headline}
          </h1>
          <div>{current_day.shortInformation}</div>
        </>
      ),
    [current_day],
  );

  const handleOnBackToItinerary = useCallback(() => {
    navigate(`/itinerary/` + itinerary_id);
  }, [navigate, itinerary_id]);

  const handleOnBackToLogin = useCallback(() => {
    navigate(`/`);
  }, [navigate, itinerary_id]);
  if (isFetching) {
    return <div>Loading</div>;
  }

  return (
    <DayLayout
      navBarNode={
        <div className={"nav-bar-root"}>
          <button onClick={handleOnBackToItinerary}>Back To Itinerary</button>
          <div
            className={classNames(["flex-row", "align-items-center", "links"])}
          >
            {current_day?.detailsAttachment?.fileUrl && (
              <a
                aria-selected={"false"}
                target="_blank"
                href={current_day?.detailsAttachment?.fileUrl}
              >
                Details Atachment
              </a>
            )}
            {current_day?.location?.pdfUrl && (
              <a target="_blank" href={current_day?.location?.pdfUrl}>
                Location
              </a>
            )}
          </div>
          <button onClick={handleOnBackToLogin}>Logout</button>
        </div>
      }
      previousButtonNode={
        previousDay && (
          <ErrorBoundary fallback={"There was errors in this component"}>
            <NavigationButton
              day={previousDay.day}
              label={"PREVIOUS"}
              headline={previousDay.headline}
            />
          </ErrorBoundary>
        )
      }
      nextButtonNode={
        nextDay && (
          <ErrorBoundary fallback={"There was errors in this component"}>
            <NavigationButton
              day={nextDay.day}
              label={"NEXT"}
              headline={nextDay.headline}
            />
          </ErrorBoundary>
        )
      }
      photoNode={<img src={current_day?.dailyPhoto} className={"image"} />}
      textNode={textNodeContent}
    />
  );
};

export default DayView;
