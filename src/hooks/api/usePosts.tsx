import { useQuery, UseQueryResult } from "@tanstack/react-query";

type DetailsAttachment = {
  fileUrl: string;
};

type Location = {
  pdfUrl: string;
};

type Day = {
  day: number;
  headline: string;
  detailsAttachment: DetailsAttachment;
  shortInformation: string;
  location: Location;
  dailyPhoto: string;
};

type Itinerary = {
  id: string;
  name: string;
  brief: Day[];
};

const useGetItinerary = (itinerary_id: string): UseQueryResult<Itinerary, Error> => {
  return useQuery({
    queryKey: itinerary_id ? ["posts", itinerary_id] : ["posts"],
    enabled: !!itinerary_id,
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://live.vamoos.com/v3/api/itineraries/${itinerary_id}`,
          { method: "GET" },
        );
        if (!response.ok) {
          throw new Error(
            `Error111: ${response.status} ${response.statusText}`,
          );
        }
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useGetItinerary;
