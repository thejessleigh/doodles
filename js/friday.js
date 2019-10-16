function onLoad() {
    var today = new Date().getDay();
    let element = document.getElementById("friday")
    if (today === 5) {
        element.innerHTML = "YES";
    } else {
        element.innerHTML = "NO";
    }
}

onLoad();