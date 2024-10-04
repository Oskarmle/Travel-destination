export function updateList(allFilteredDestinations) {
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
    clone
      .querySelector(".deleteButton")
      .addEventListener("click", () => deleteDestination(destination._id));
    mainContainer.appendChild(clone);
  });
}
