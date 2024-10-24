import { updateList } from "./updateList.js";

export async function deleteDestination(id, allFilteredDestinations) {
  allFilteredDestinations = allFilteredDestinations.filter(
    (item) => item._id !== id
  );

  console.log("Delete destination with this ID", id);

  const url = `http://localhost:3003/destinations/${id}`;

  console.log("URL", url);
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
  updateList(allFilteredDestinations);
}
