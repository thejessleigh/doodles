function onLoad() {
    let today = new Date().getDay();
    let element = document.getElementById("notfriday");
    if (today === 5) {
      element.innerHTML = "It's Friday, you fool. Be on your way.";
    } else {
      element.innerHTML = "&#9760; It is not Friday &#9760;";
    }
  }

onLoad();
