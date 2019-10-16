function onLoad() {
    let today = new Date().getDay();
    let element = document.getElementById("friday");
    if (today === 3) {
      element.innerHTML = "YES";
      let month = new Date().getMonth();

      season = "";
      switch (true) {
        case month >= 3 && month < 6:
          season = "spring";
        case month >= 6 && month < 9:
          season = "summer";
        case month >= 9 && month < 12:
          season = "autumn";
        default:
          season = "winter";
      }
      document.body.classList.add(season);
    } else {
      element.innerHTML = "NO";
    }
  }

onLoad();
