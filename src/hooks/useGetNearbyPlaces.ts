import { useQuery, UseQueryOptions } from "react-query";
import { IGetFilterRequest } from "../interfaces/GetTableRequest";
import { http } from "../utils/axiosConfig";

type NearbyPlacesQuery = {
  location: {
    lat: number;
    long: number;
  };
  radius: number;
  type: string;
};

function getNearbyPlaces(requestData: NearbyPlacesQuery) {
  return http
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${requestData.location.lat},${requestData.location.long}&radius=${requestData.radius}&type=${requestData.type}&fields=photos&key=AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM`
    )
    .then((res) => {
      console.log("hmmmm", res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Could not get  data. Something went wrong");
      }
    });
}

export function useGetNearbyPlaces(
  requestData: NearbyPlacesQuery,
  options?: UseQueryOptions<any, Error, any>
) {
  return useQuery(
    [
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${requestData.location.lat},${requestData.location.long}&radius=${requestData.radius}&type=${requestData.type}&key=AIzaSyAg1KKPZn6_5ZSmyNpyQ37w3jBS6sXh8vM`,
    ],
    () => getNearbyPlaces(requestData),
    options
  );
}
