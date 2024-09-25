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

    clone.querySelector(".city").textContent = destination.city;
    clone.querySelector(".description").textContent = destination.country;
    clone
      .querySelector(".deleteButton")
      .addEventListener("click", () => deleteDestination(destination._id));
    document.getElementById("main").appendChild(clone);
  });
});

function deleteDestination(id) {
  console.log("Delete destination with this ID", id);
}
