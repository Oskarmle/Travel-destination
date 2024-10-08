import { updateList } from "./updateList.js";

export async function editDestination(
  id,
  allFilteredDestinations,
  updatedDestination
) {

  const url = `http://127.0.0.1:3003/destinations/${id}`;
  console.log("URL", url);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    const destinationIndex = allFilteredDestinations.findIndex(
      (destination) => destination._id === id
    );
    if (destinationIndex !== -1) {
      allFilteredDestinations[destinationIndex] = json;
      console.log(allFilteredDestinations[destinationIndex]);
    } else {
      console.log("Destination wasn't found");
    }
    updateList(allFilteredDestinations);
    return json;
  } catch (error) {
    console.error(error);
  }
}
