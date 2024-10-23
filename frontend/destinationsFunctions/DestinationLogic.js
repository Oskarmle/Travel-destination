// Import functions
import { getData } from "./getAllDestinations.js"; // GET request function
import { updateList } from "./updateList.js";
import { addNewDestination } from "./addDestination.js";
import { deleteDestination } from "./deleteDestination.js";
import { filterDestinations } from "./filterDestinations.js";
import { editDestination } from "./editDestination.js";

// Import class
import { Destination } from "./Destination.js";

const allCountries = [];
let allFilteredDestinations = [];
let allDestinations = [];

window.addEventListener("load", async () => {
  let token = sessionStorage.getItem("validToken");
  console.log(token);

  try {
    allDestinations = await getData();
    // console.log(allDestinations);

    if (allDestinations.length === 0) {
      console.log("No destinations available");
      return;
    }
    allFilteredDestinations = allDestinations;
    console.log(allFilteredDestinations);

    allDestinations.forEach((destination) => {
      if (!allCountries.includes(destination.country)) {
        allCountries.push(destination.country);
      }

      let template = document.getElementById("destinationTemplate");
      let clone = template.content.cloneNode(true);

      clone.querySelector(".title").textContent = destination.title;
      clone.querySelector(".city").textContent = destination.city;
      clone.querySelector(".country").textContent = destination.country;
      clone.querySelector(".dateStart").textContent = destination.dateStart;
      clone.querySelector(".dateEnd").textContent = destination.dateEnd;
      clone.querySelector(".description").textContent = destination.description;
      clone.querySelector(".edit").addEventListener("click", function () {
        const editButton = document.getElementById("editDestinationButton");
        editButton.classList.remove("invisible");
        editButton.classList.add("showButton");
        document
          .getElementById("addDestination")
          .classList.remove("showButton");
        document.getElementById("addDestination").classList.add("invisible");

        // Display data in form
        let title = document.getElementById("title");
        let city = document.getElementById("city");
        let country = document.getElementById("country");
        let dateStart = document.getElementById("dateStart");
        let dateEnd = document.getElementById("dateEnd");
        let description = document.getElementById("description");

        title.value = destination.title;
        city.value = destination.city;
        country.value = destination.country;
        dateStart.value = destination.dateStart;
        dateEnd.value = destination.dateEnd;
        description.value = destination.description;

        editButton.addEventListener("click", async function (e) {
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
          console.log("From destinationLogic file", updatedDestination);

          const result = await editDestination(
            destination._id,
            allFilteredDestinations,
            updatedDestination
          );
          console.log("result", result);
        });
      });
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

      document.getElementById("destinationsContainer").appendChild(clone);
    });

    getFilters();
    document.getElementById("stateMessage").textContent = "";
  } catch (error) {
    document.getElementById("stateMessage").textContent =
      "Server was unavailable, please try again in 32 days";
  }
});

//Display all countries in a filter select
function getFilters() {
  let updateTemplate = document.getElementById("dropdown");
  updateTemplate.innerHTML = "";

  // WE HAVE A HUGE PROBLEM HERE ---------------------------------------------------------------------------------------
  const allCountriesOption = document.createElement("option");
  allCountriesOption.setAttribute("value", allCountries);
  allCountriesOption.textContent = "all countries";
  updateTemplate.appendChild(allCountriesOption);

  allCountries.forEach((country) => {
    let filterTemplate = document.getElementById("dropdownTemplate");
    let filterClone = filterTemplate.content.cloneNode(true);

    filterClone.querySelector(".filterOption").textContent = country;
    filterClone.querySelector(".filterOption").value = country;

    updateTemplate.appendChild(filterClone);
  });

  // Attach a `change` event listener to the dropdown
  document
    .getElementById("dropdown")
    .addEventListener("change", async (event) => {
      const selectedCountry = event.target.value;
      console.log(selectedCountry);

      if (selectedCountry === "allCountries") {
        console.log(allFilteredDestinations);
        allFilteredDestinations = allDestinations;
        updateList(allFilteredDestinations);
      } else {
        allFilteredDestinations = await filterDestinations(selectedCountry);
        updateList(allFilteredDestinations);
      }
    });
}

const submit = document.getElementById("addDestination");

submit.addEventListener("click", async function (e) {
  e.preventDefault();
  document.getElementById("stateMessage").textContent = "Saving destination..."; //loading state
  await addNewDestination(allFilteredDestinations);
  updateList(allFilteredDestinations);
  getFilters();
});
