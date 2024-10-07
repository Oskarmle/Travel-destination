export function updateList(allFilteredDestinations) {
  let token = sessionStorage.getItem("validToken");
  const mainContainer = document.getElementById("destinationsContainer");
  mainContainer.innerHTML = "";
  allFilteredDestinations.forEach((destination) => {
    let template = document.getElementById("destinationTemplate");
    let clone = template.content.cloneNode(true);

    clone.querySelector(".title").textContent = destination.title;
    clone.querySelector(".city").textContent = destination.city;
    clone.querySelector(".country").textContent = destination.country;
    clone.querySelector(".dateStart").textContent = destination.dateStart;
    clone.querySelector(".dateEnd").textContent = destination.dateEnd;
    clone.querySelector(".description").textContent = destination.description;
    if (token !== null && token !== undefined && token !== "") {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteDestination(destination._id, allFilteredDestinations);
      });

      const deleteButtonGroup = clone.querySelector(".deleteButtonGroup"); // Adjust selector based on your template
      if (deleteButtonGroup) {
        deleteButtonGroup.appendChild(deleteButton);
      } else {
        console.error("deleteButtonGroup not found in the template.");
      }
    }
    mainContainer.appendChild(clone);
  });
}
