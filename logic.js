//const deleteButtonPopUp = document.querySelector(".deleteButton");
// const cancelDelete = document.querySelector(".canceDelete");
// const confirmDeleteBox = document.querySelector(".confirmDelete");

// deleteButtonPopUp.addEventListener("click", function () {
//   if (confirmDeleteBox.style.display !== "flex") {
//     confirmDeleteBox.style.display = "flex";
//   }
// });

// cancelDelete.addEventListener("click", function () {
//   if (confirmDeleteBox.style.display !== "none") {
//     confirmDeleteBox.style.display = "none";
//   }
// });

import { getData } from "./getAllDestinations.js";

const allCountries = [];

window.addEventListener("load", async () => {
  const allDestinations = await getData();

  if (allDestinations.length === 0) {
    console.log("No destinations available");
    return;
  }

  allDestinations.forEach((destination) => {
    if (!allCountries.includes(destination.country)) {
      allCountries.push(destination.country);
    }

    let template = document.getElementById("destinationTemplate");
    let clone = template.content.cloneNode(true);

    clone.querySelector(".city").textContent = destination.city;
    clone.querySelector(".description").textContent = destination.country;
    clone
      .querySelector(".deleteButton")
      .addEventListener("click", () => deleteDestination(destination._id));
    document.getElementById("main").appendChild(clone);
  });
});

async function deleteDestination(id) {
  console.log("Delete destination with this ID", id);

  const url = `http://127.0.0.1:3003/destinations/${id}`;
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
}
