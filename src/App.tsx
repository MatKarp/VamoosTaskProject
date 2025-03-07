import { Route, Routes, useNavigate } from "react-router-dom";
import ItineraryView from "./views/ItineraryView";
import DayView from "./views/DayView";
import HomeView from "./views/HomeView";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider.tsx";

function App() {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ErrorBoundary fallback={"Errors in root view /"}>
            <HomeView />
          </ErrorBoundary>
        }
      />
      <Route
        path="/itinerary/:itinerary_id"
        element={
          <ErrorBoundary fallback={"Errors in root of Itinerary View"}>
            <ItineraryView />
          </ErrorBoundary>
        }
      />
      <Route
        path={"/itinerary/:itinerary_id/day/:day_id"}
        element={
          <ErrorBoundary fallback={"Errors in root of Day View"}>
            <DayView />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}

export default App;
