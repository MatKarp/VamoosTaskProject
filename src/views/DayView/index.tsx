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
  const result = data?.brief.find((dayObj) => dayObj.day === day_id);

  const previousDay = data?.brief.find((dayObj) => dayObj.day === day_id - 1);
  const nextDay = data?.brief.find((dayObj) => dayObj.day === day_id + 1);

  const textNodeContent = useMemo(
    () =>
      result && (
        <>
          <h1>
            Day {result.day} {result.headline}
          </h1>
          <div>{result.shortInformation}</div>
        </>
      ),
    [result],
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
              className={classNames([
                "flex-row",
                "align-items-center",
                "links",
              ])}
            >
              {result?.detailsAttachment?.fileUrl && (
                <a
                  aria-selected={"false"}
                  target="_blank"
                  href={result?.detailsAttachment?.fileUrl}
                >
                  Details Atachment
                </a>
              )}
              {result?.location?.pdfUrl && (
                <a target="_blank" href={result?.location?.pdfUrl}>
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
      photoNode={<img src={result?.dailyPhoto} className={"image"} />}
      textNode={textNodeContent}
    />
  );
};

export default DayView;
