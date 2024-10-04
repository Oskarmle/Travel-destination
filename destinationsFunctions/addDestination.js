// Import functions
import { saveDestination } from "./saveDestination.js";

// Import class
import { Destination } from "./Destination.js";

let title = document.getElementById("title");
let city = document.getElementById("city");
let country = document.getElementById("country");
let dateStart = document.getElementById("dateStart");
let dateEnd = document.getElementById("dateEnd");
let description = document.getElementById("description");

export async function addNewDestination(allFilteredDestinations) {
  const newTitle = title.value;
  const newCity = city.value;
  const newCountry = country.value;
  const newDateStart = dateStart.value;
  const newDateEnd = dateEnd.value;
  const newDescription = description.value;
  const destination1 = new Destination(
    newTitle,
    newCity,
    newCountry,
    newDateStart,
    newDateEnd,
    newDescription
  );

  const result = await saveDestination(destination1, allFilteredDestinations);

  if (result.error) {
    document.getElementById("titleErrorMessage").textContent =
      result.error.errors?.title?.message || "";
    document.getElementById("cityErrorMessage").textContent =
      result.error.errors?.city?.message || "";
    document.getElementById("countryErrorMessage").textContent =
      result.error.errors?.country?.message || "";
    document.getElementById("dateStartErrorMessage").textContent =
      result.error.errors?.dateStart?.message || "";
    document.getElementById("dateEndErrorMessage").textContent =
      result.error.errors?.dateEnd?.message || "";
    document.getElementById("descriptionErrorMessage").textContent =
      result.error.errors?.description?.message || "";
  } else {
    document.getElementById("titleErrorMessage").textContent = "";
    document.getElementById("cityErrorMessage").textContent = "";
    document.getElementById("countryErrorMessage").textContent = "";
    document.getElementById("dateStartErrorMessage").textContent = "";
    document.getElementById("dateEndErrorMessage").textContent = "";
    document.getElementById("descriptionErrorMessage").textContent = "";
  }
  document.getElementById("stateMessage").textContent = "";
}
