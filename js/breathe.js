function onLoad() {
    var tod = new Date().getHours();
    colorScheme = "";
    switch (true) {
        case tod <= 4:
            colorScheme = "witching";
            break;
        case tod <= 5 && tod < 7:
            colorScheme = "dawn";
            break;
        case tod >= 7 && tod < 10:
            colorScheme = "morning";
            break;
        case tod >= 10 && tod < 12:
            colorScheme = "late-morning";
            break;
        case tod === 12:
            colorScheme = "noon";
            break;
        case tod >= 12 && tod < 16:
            colorScheme = "afternoon";
            break;
        case tod >= 16 && tod < 19:
            colorScheme = "dusk";
            break;
        case tod >= 19 && tod < 21:
            colorScheme = "late-evening";
            break;
        case tod >= 21 && tod < 24:
            colorScheme = "night";
            break;
    }
    document.getElementById("breather").classList.add(colorScheme);

    console.log(document.getElementById("breather").classList);

    setTimeout(
        function() {
            $("#adjust").fadeIn(1000);
        }, 5000
    );
}

onLoad();

var slower = document.getElementById("slower");
var faster = document.getElementById("faster");
var speed = 16;

slower.addEventListener("click", function() {
    speed += 2;
    console.log(`Total animation time increased to ${speed}`);
    document.getElementById("breather").style.WebkitAnimationDuration = `${speed}s`;
    document.getElementById("breather").style.AnimationDuration = `${speed}s`;
});

faster.addEventListener("click", function() {
    speed -=2;
    console.log(`Total animation time decreased to ${speed}`);
    document.getElementById("breather").style.WebkitAnimationDuration = `${speed}s`;
    document.getElementById("breather").style.AnimationDuration = `${speed}s`;
});
