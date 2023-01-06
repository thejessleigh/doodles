(function IsItFridayYet() {
  const date = new Date();
  const theDay = date.getDay();
  const element = document.getElementById("friday");

  if (theDay === 5) {
    element.innerHTML = "YES"
  } else {
    element.innerHTML = "NO";
  }

})();
