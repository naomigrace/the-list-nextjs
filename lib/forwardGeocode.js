export default async function forwardGeocode(location, GOOGLE_API_KEY) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${GOOGLE_API_KEY}`
  );

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch coordinates for " + location);
  }

  return json.results[0].geometry.location;
}
