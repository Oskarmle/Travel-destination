const deleteButtonPopUp = document.getElementById("deleteButton");
const cancelDelete = document.getElementById("canceDelete");
const confirmDeleteBox = document.getElementById("confirmDelete")

deleteButtonPopUp.addEventListener("click", function () {
  if (confirmDeleteBox.style.display !== "flex") {
    confirmDeleteBox.style.display = "flex";
  }
});

cancelDelete.addEventListener("click", function () {
    if (confirmDeleteBox.style.display !== "none") {
        confirmDeleteBox.style.display = "none"
    }
});
