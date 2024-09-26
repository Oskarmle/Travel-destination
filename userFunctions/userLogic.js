// Import User class
import { User } from "./User.js";

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
  const allUserEmails = await getUserEmails();
  // console.log(allUserEmails);

  // Check if both password inputs is the same
  if (newPassword !== newPasswordCheck) {
    alert(`The passwords are not the same, try again`);
    return;
  }

  // Check if the email from the input field is already in use
  if (allUserEmails.some((user) => user.email === newEmail)) {
    alert(`The email is already in use`);
    return;
  }

  const user1 = new User(newFirstname, newLastname, newEmail, newPassword);
  saveUser(user1);
};

// function to register submit click
submitUser.addEventListener("click", (e) => {
  e.preventDefault();
  addNewUser();
});

// Post user data to mongoDB
async function saveUser(user1) {
  const url = "http://127.0.0.1:3003/users";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user1),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

// Get user emails to check against new user emails
async function getUserEmails() {
  const url = "http://127.0.0.1:3003/users";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const userEmails = await response.json();
    return userEmails;
  } catch (error) {
    console.error(error);
  }
}