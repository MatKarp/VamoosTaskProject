import { useNavigate, useParams } from "react-router-dom";
import useGetItinerary from "../../hooks/api/usePosts.tsx";
import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import DayLayout from "../../layouts/DayLayout";
import "./style.scss";
import { ErrorBoundary } from "react-error-boundary";
import NavigationButton from "../../components/NavigationButton";
import { useAuth } from "../../contexts/AuthProvider.tsx";

const DayView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const dayId = useMemo(() => Number(params.day_id), [params.day_id]);

  const { loginData, logout } = useAuth();

  const { user_id, passcode } = loginData;
  const itinerary_id = useMemo(
    () => user_id && user_id + "-" + passcode,
    [user_id, passcode],
  );

  const { data, isFetching } = useGetItinerary(itinerary_id);

  const days = useMemo(() => data?.brief || [], [data]);

  const currentDayIndex = useMemo(
    () => days.findIndex((dayObj) => dayObj.day === dayId),
    [days, dayId],
  );

  const currentDay = useMemo(
    () => days[currentDayIndex],
    [days, currentDayIndex],
  );

  const previousDay = useMemo(
    () => days[currentDayIndex - 1],
    [days, currentDayIndex],
  );
  const nextDay = useMemo(
    () => days[currentDayIndex + 1],
    [days, currentDayIndex],
  );

  const textNodeContent = useMemo(
    () =>
      currentDay && (
        <>
          <h1>
            Day {currentDay.day} {currentDay.headline}
          </h1>
          <div>{currentDay.shortInformation}</div>
        </>
      ),
    [currentDay],
  );

  const handleOnBackToItinerary = useCallback(() => {
    navigate(`/itinerary/${itinerary_id}`);
  }, [navigate, itinerary_id]);

  const handleOnBackToLogin = useCallback(() => {
    logout();
  }, [logout]);

  if (isFetching) {
    return <div>Loading</div>;
  }

  return (
    <DayLayout
      navBarNode={
        <div className="nav-bar-root">
          <button onClick={handleOnBackToItinerary}>Back To Itinerary</button>
          <div
            className={classNames("flex-row", "align-items-center", "links")}
          >
            {currentDay?.detailsAttachment?.fileUrl && (
              <a
                aria-selected="false"
                target="_blank"
                rel="noopener noreferrer"
                href={currentDay.detailsAttachment.fileUrl}
              >
                Details Attachment
              </a>
            )}
            {currentDay?.location?.pdfUrl && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={currentDay.location.pdfUrl}
              >
                Location
              </a>
            )}
          </div>
          <button onClick={handleOnBackToLogin}>Logout</button>
        </div>
      }
      previousButtonNode={
        previousDay && (
          <ErrorBoundary fallback={"There were errors in this component"}>
            <NavigationButton
              day={previousDay.day}
              label="PREVIOUS"
              headline={previousDay.headline}
            />
          </ErrorBoundary>
        )
      }
      nextButtonNode={
        nextDay && (
          <ErrorBoundary fallback={"There were errors in this component"}>
            <NavigationButton
              day={nextDay.day}
              label="NEXT"
              headline={nextDay.headline}
            />
          </ErrorBoundary>
        )
      }
      photoNode={
        <img src={currentDay?.dailyPhoto} className="image" alt="daily" />
      }
      textNode={textNodeContent}
    />
  );
};

export default DayView;
