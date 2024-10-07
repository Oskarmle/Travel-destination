let email = document.getElementById("loginEmail");
let password = document.getElementById("loginPassword");
const loginUserButton = document.getElementById("loginButton");

export async function loginUser(userObj) {
  const url = "http://127.0.0.1:3003/users/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const json = await response.json();
    console.log(json);

    sessionStorage.setItem("validToken", json.token)
    return json;
  } catch (error) {
    // console.error(error);
  }
}

// function to login on submit click
loginUserButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const userObj = {
    email: email.value,
    password: password.value
};
  loginUser(userObj)
});
