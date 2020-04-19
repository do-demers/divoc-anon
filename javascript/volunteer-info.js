function ShowHideDiv(deployCheck) {
    var deployForm = document.getElementById("deployForm");
    deployForm.style.display = deployCheck.checked ? "block" : "none";
}