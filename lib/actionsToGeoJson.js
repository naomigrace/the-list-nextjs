import forwardGeocode from "./forwardGeocode";

export default async function actionsToGeoJson(actions, GOOGLE_API_KEY) {
  return Promise.all(
    actions.map(async (action) => {
      const coordinates = await forwardGeocode(action.location, GOOGLE_API_KEY);

      if (coordinates) {
        const marker = {
          type: "Feature",
          properties: {
            cluster: false,
            title: action.title,
            slug: action.slug,
          },
          geometry: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat],
          },
        };

        return marker;
      } else {
        console.error(
          "Something bad happened with data coming back from google",
          data
        );
      }
    })
  );
}
