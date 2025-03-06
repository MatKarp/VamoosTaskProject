import React, { useCallback, useMemo } from "react";
import DayThumbnailButton from "../../components/DayThumbnailButton/index.jsx";
import { useNavigate, useParams } from "react-router-dom";
import usePosts from "../../hooks/api/usePosts.tsx";
import ItineraryLayout from "../../layouts/ItineraryLayout";

const mapWithKey = (fn, array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = fn(i, array[i]);
  }
  return result;
};

const ItineraryView = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { itinerary_id } = useParams();

  const { data, isFetching } = usePosts(itinerary_id);
  const days = useMemo(() => data?.brief || [], [data]);

  const handleOnClick = useCallback(
    (day_id) => {
      navigate(`/itinerary/` + itinerary_id + "/day/" + day_id);
    },
    [itinerary_id, navigate],
  );

  const handleOnBackToLogin = useCallback(() => {
    navigate(`/`);
  }, [navigate, itinerary_id]);
  if (isFetching) {
    return <div>Loading</div>;
  }
  return (
    <ItineraryLayout
      logoutButtonNode={<button onClick={handleOnBackToLogin}>Logout</button>}
      daysListNode={mapWithKey(
        (index, day) => (
          <div key={index} className={"day_thumbnail-wrapper"}>
            <DayThumbnailButton {...day} onClick={handleOnClick} />
          </div>
        ),
        days,
      )}
    />
  );
};

export default ItineraryView;
