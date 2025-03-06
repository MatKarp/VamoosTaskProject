import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback} from "react";

const NavigationButton = ({ day, headline, label }) => {
    const { itinerary_id } = useParams();

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => {
        navigate(`/itinerary/` + itinerary_id + "/day/" + day);
    }, [navigate]);
    return (
        <button role={'button'} onClick={handleOnClick}>
            <div>{label}</div>
            <div>{headline}</div>
            <div>DAY {day}</div>
        </button>
    );
};

export default NavigationButton