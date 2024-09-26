// Import User class
import { User } from "./User.js";

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordCheck = document.getElementById("passwordCheck");
const submitUser = document.getElementById("submitUser");

// Creates a object with the class User.js
let addNewUser = () => {
  const newFirstname = firstname.value;
  const newLastname = lastname.value;
  const newEmail = email.value;
  const newPassword = password.value;
  const newPasswordCheck = passwordCheck.value;

  if (newPassword !== newPasswordCheck) {
    alert(`The passwords are not the same, try again`);
  } else {
    const user1 = new User(newFirstname, newLastname, newEmail, newPassword);
    // console.log("the passwords are correct");
    // console.log(`Created the user object`, JSON.stringify(user1));
    saveUser(user1);
  }
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
