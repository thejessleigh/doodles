function onLoad() {
    let today = new Date().getDay();
    let element = document.getElementById("friday");
    if (today === 5) {
      element.innerHTML = "YES";
      let month = new Date().getMonth();

      let season = "";
      switch (true) {
        case month >= 3 && month < 6:
          season = "spring";
          break;
        case month >= 6 && month < 9:
          season = "summer";
          break;
        case month >= 9 && month < 12:
          season = "autumn";
          break;
        default:
          season = "winter";
          break;
      }
      document.body.classList.add(season);
    } else {
      element.innerHTML = "NO";
    }
  }

onLoad();
