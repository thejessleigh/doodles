(function IsItFridayYet() {
  const date = new Date();
  const thisMonth = date.getMonth();
  const thisDay = date.getDay();
  const theBody = document.body;
  const textElement = document.getElementById("friday");
  let season = "";

  // return a programatic yes on Fridays to print on homepage.
  function isFriday(n) {
    return (n == 5 ? "YES" : "NO");
  }

  // return a season string to switch up body class later.
  function thisSeason(range) {
    if(range >= 2 && range < 5 ) {
      return "spring";
    } else if(range >= 5 && range < 8 ) {
      return "summer";
    } else if(range >= 8 && range < 11) {
      return "fall";
    } else if(range >= 11 || range <= 2) {
      return "winter";
    } else {
      return "";
    }
  }

  // restyle the site based on the season because we can dammit.
  function seasonStyles() {
    season = thisSeason(thisMonth);
    theBody.classList.add(season);
  }

  textElement.innerHTML = isFriday(thisDay);
  seasonStyles();

})();
