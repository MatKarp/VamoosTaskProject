
import { Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import ItineraryView from "./views/ItineraryView";
import DayView from "./views/DayView";
import HomeView from "./views/HomeView";
import { ErrorBoundary } from "react-error-boundary";

function App() {
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
