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
          document.body.style.backgroundColor = "fff7c8";
          break;
        default:
          season = "winter";
          document.body.style.backgroundColor = "dcf0f4";
          break;
      }
      let spans = document.getElementsByClassName("fallingElement");
      Array.from(spans).forEach(function (element) {
        element.classList.add(season);
      });
    } else {
      element.innerHTML = "NO";
    }
  }

onLoad();
