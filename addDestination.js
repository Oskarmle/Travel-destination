import { Destination } from "./Destination.js";

let city = document.getElementById("city");
let country = document.getElementById("country");
let description = document.getElementById("description");
const submit = document.getElementById("addDestination");

submit.addEventListener("click", function (e) {
    addNewDestination();
    e.preventDefault();
});

function addNewDestination() {
    const newCity = city.value;
    const newCountry = country.value;
    const newDescription = description.value;
    const destination1 = new Destination(newCity, newCountry, newDescription);
    saveDestination(destination1);
}

// Post data to mongoDB
async function saveDestination(destination1) {
    console.log(destination1);
    const url = "http://127.0.0.1:3003/destinations";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(destination1),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        // console.error(error);
    }
}
