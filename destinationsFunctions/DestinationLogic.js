// Import functions
import { getData } from "./getAllDestinations.js"; // GET request function
import { updateList } from "./updateList.js";
import { addNewDestination } from "./addDestination.js";
import { deleteDestination } from "./deleteDestination.js";
import { filterDestinations } from "./filterDestinations.js";

const allCountries = [];
let allFilteredDestinations = [];
let allDestinations = [];

window.addEventListener("load", async () => {
  let token = sessionStorage.getItem("validToken");
  console.log(token);

  try {
    allDestinations = await getData();
    console.log(allDestinations);

    if (allDestinations.length === 0) {
      console.log("No destinations available");
      return;
    }
    allFilteredDestinations = allDestinations;

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

// let isUserLoggedIn = () => {
//   let token = sessionStorage.getItem("validToken")
// };

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
