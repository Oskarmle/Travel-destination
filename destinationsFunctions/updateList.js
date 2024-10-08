import { editDestination } from "./editDestination.js";

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
    clone.querySelector(".edit").addEventListener("click", function(){
      const editButton = document.getElementById("editDestinationButton")
      editButton.classList.remove("invisible")
      editButton.classList.add("showButton")
      document.getElementById("addDestination").classList.remove("showButton")
      document.getElementById("addDestination").classList.add("invisible")

      // Display data in form
      let title = document.getElementById("title");
      let city = document.getElementById("city");
      let country = document.getElementById("country");
      let dateStart = document.getElementById("dateStart");
      let dateEnd = document.getElementById("dateEnd");
      let description = document.getElementById("description");

      title.value = destination.title
      city.value = destination.city
      country.value = destination.country
      dateStart.value = destination.dateStart
      dateEnd.value = destination.dateEnd
      description.value = destination.description

      editButton.addEventListener("click", function(e){
        e.preventDefault();
        
        const newTitle = title.value;
        const newCity = city.value;
        const newCountry = country.value;
        const newDateStart = dateStart.value;
        const newDateEnd = dateEnd.value;
        const newDescription = description.value;
        const updatedDestination = new Destination(
          newTitle,
          newCity,
          newCountry,
          newDateStart,
          newDateEnd,
          newDescription
        );
        // console.log(updatedDestination);
        
        editDestination(destination._id, allFilteredDestinations, updatedDestination);
      })

    })
    
    if (token !== null && token !== undefined && token !== "") {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteDestination(destination._id, allFilteredDestinations);
      });

      const deleteButtonGroup = clone.querySelector(".deleteButtonGroup");
      if (deleteButtonGroup) {
        deleteButtonGroup.appendChild(deleteButton);
      } else {
        console.error("deleteButtonGroup not found in the template.");
      }
    }
    mainContainer.appendChild(clone);
  });
}
