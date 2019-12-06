(function IsItFridayYet() {
  const date = new Date();
  const theMonth = date.getMonth();
  const theDay = date.getDay();
  const element = document.getElementById("friday");
  const spans = document.getElementsByClassName("fallingElement");
  let season = "";

  if (theDay === 5) {
    element.innerHTML = "YES";

    switch (true) {
      case theMonth >= 3 && theMonth < 6:
        season = "spring";
        break;
      case theMonth >= 6 && theMonth < 9:
        season = "summer";
        break;
      case theMonth >= 9 && theMonth < 12:
        season = "autumn";
        document.body.style.backgroundColor = "fff7c8";
        break;
      default:
        season = "winter";
        document.body.style.backgroundColor = "dcf0f4";
        break;
    }
    Array.from(spans).forEach(function (element) {
      element.classList.add(season);
    });
  } else {
    element.innerHTML = "NO";
  }
})();
