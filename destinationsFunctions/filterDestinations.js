export async function filterDestinations(country) {
  console.log("Filter this country", country);
  const url = `http://127.0.0.1:3003/destinations/${country}`;
  console.log("URL", url);
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const filteredDestinations = await response.json();
    return filteredDestinations;
  } catch (error) {
    console.error(error);
  }
}
