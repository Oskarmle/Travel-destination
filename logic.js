// const deleteButtonPopUp = document.getElementById("deleteButton");
// const cancelDelete = document.getElementById("canceDelete");
// const confirmDeleteBox = document.getElementById("confirmDelete");

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

window.addEventListener("load", async () => {
  const allDestinations = await getData();
  console.log(allDestinations);

  if (allDestinations.length === 0) {
    console.log("No destinations available");
    return;
  }

  allDestinations.forEach((destination) => {
    let template = document.getElementById("destinationTemplate");
    let clone = template.content.cloneNode(true);

    clone.querySelector(".destinationCity").textContent = destination.city;
    clone.querySelector(".destinationCountry").textContent =
      destination.country;

    document.getElementById("destinationTest").appendChild(clone);
  });
});
