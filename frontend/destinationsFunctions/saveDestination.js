import { updateList } from "./updateList.js";

// Post data to mongoDB
export async function saveDestination(destination1, allFilteredDestinations) {
  // Shitty way but working
  if (
    destination1.title === "" ||
    destination1.city === "" ||
    destination1.country === "" ||
    destination1.dateStart === "" ||
    destination1.dateEnd === "" ||
    destination1.description === ""
  ) {
    console.log(destination1);
  } else {
    allFilteredDestinations.push(destination1);
  }

  const url = "http://localhost:3003/destinations";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destination1),
    });
    // if (!response.ok) {
    //   console.log("error from backend", response);
    //   throw new Error(`Response status: ${response.status}`);
    // }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
  updateList(allFilteredDestinations);
}
