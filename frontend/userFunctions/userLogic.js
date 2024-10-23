// Import User class
import { User } from "./User.js";

// Import functions
import { saveUser } from "./saveUser.js";

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordCheck = document.getElementById("passwordCheck");
const submitUser = document.getElementById("submitUser");

// Creates a object with the class User.js
let addNewUser = async () => {
    const newFirstname = firstname.value;
    const newLastname = lastname.value;
    const newEmail = email.value;
    const newPassword = password.value;
    const newPasswordCheck = passwordCheck.value;

    // Check if both password inputs is the same
    if (newPassword !== newPasswordCheck) {
        alert(`The passwords are not the same, try again`);
        return;
    }

    // Save a new user and POST
    const user1 = new User(newFirstname, newLastname, newEmail, newPassword);
    const result = await saveUser(user1);
    if (result.error) {
        console.log(result.error.keyValue.email);
        document.getElementById("firstnameErrorMessage").textContent =
            result.error.errors?.firstName.message || "";
        document.getElementById("lastnameErrorMessage").textContent =
            result.error.errors?.lastName.message || "";
        document.getElementById("emailErrorMessage").textContent =
            `The email ${result.error.keyValue.email} is already in use` || "";
    }
};

// function to register submit click
submitUser.addEventListener("click", async (e) => {
    e.preventDefault();
    await addNewUser();
});


