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

import { Destination } from "./Destination.js";

const allCountries = [];
let allFilteredDestinations = [];

window.addEventListener("load", async () => {
    try {
        const allDestinations = await getData();
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

            clone.querySelector(".title").textContent = destination.title
            clone.querySelector(".city").textContent = destination.city;
            clone.querySelector(".country").textContent = destination.country;
            clone.querySelector(".dateStart").textContent = destination.dateStart
            clone.querySelector(".dateEnd").textContent = destination.dateEnd;
            clone.querySelector(".description").textContent =
                destination.description;
            clone
                .querySelector(".deleteButton")
                .addEventListener("click", () =>
                    deleteDestination(destination._id)
                );
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
    allCountries.forEach((country) => {
        let filterTemplate = document.getElementById("dropdownTemplate");
        let filterClone = filterTemplate.content.cloneNode(true);

        filterClone.querySelector(".filterOption").textContent = country;
        filterClone.querySelector(".filterOption").value = country;

        document.getElementById("dropdown").appendChild(filterClone);
    });

    // Attach a `change` event listener to the dropdown
    document
        .getElementById("dropdown")
        .addEventListener("change", async (event) => {
            const selectedCountry = event.target.value;
            if (selectedCountry) {
                allFilteredDestinations = await filterDestinations(
                    selectedCountry
                );
                console.log("allFilteredDestinations", allFilteredDestinations);
                updateList();
            }
        });
}

export function updateList() {
    const mainContainer = document.getElementById("destinationsContainer");
    mainContainer.innerHTML = "";
    allFilteredDestinations.forEach((destination) => {
        let template = document.getElementById("destinationTemplate");
        let clone = template.content.cloneNode(true);

        clone.querySelector(".title").textContent = destination.title
        clone.querySelector(".city").textContent = destination.city;
        clone.querySelector(".country").textContent = destination.country;
        clone.querySelector(".dateStart").textContent = destination.dateStart
        clone.querySelector(".dateEnd").textContent = destination.dateEnd
        clone.querySelector(".description").textContent =
            destination.description;
        clone
            .querySelector(".deleteButton")
            .addEventListener("click", () =>
                deleteDestination(destination._id)
            );
        mainContainer.appendChild(clone);
    });
}

async function filterDestinations(country) {
    console.log("Filter this country", country);
    const url = `http://127.0.0.1:3003/destinations/${country}`;
    console.log("URL", url);
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const filteredDestinations = await response.json();
        return filteredDestinations;
    } catch (error) {
        console.error(error);
    }
}

async function deleteDestination(id) {
    allFilteredDestinations = allFilteredDestinations.filter(
        (item) => item._id !== id
    );

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

    updateList();
}

let title = document.getElementById("title");
let city = document.getElementById("city");
let country = document.getElementById("country");
let dateStart = document.getElementById("dateStart");
let dateEnd = document.getElementById("dateEnd");
let description = document.getElementById("description");
const submit = document.getElementById("addDestination");

submit.addEventListener("click", async function (e) {
    e.preventDefault();
    document.getElementById("stateMessage").textContent =
        "Saving destination..."; //loading state
    await addNewDestination();
    updateList();
});

async function addNewDestination() {
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

    const result = await saveDestination(destination1);

    if (result.error) {
        document.getElementById("cityErrorMessage").textContent =
            result.error.errors?.city?.message || "";
        document.getElementById("countryErrorMessage").textContent =
            result.error.errors?.country?.message || "";
        document.getElementById("descriptionErrorMessage").textContent =
            result.error.errors?.description?.message || "";
    } else {
        document.getElementById("cityErrorMessage").textContent = "";
        document.getElementById("countryErrorMessage").textContent = "";
        document.getElementById("descriptionErrorMessage").textContent = "";
    }

    document.getElementById("stateMessage").textContent = "";
}

// Post data to mongoDB
async function saveDestination(destination1) {
    allFilteredDestinations.push(destination1);

    const url = "http://127.0.0.1:3003/destinations";
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
    updateList();
}
