// get canvas and context
var canvas = document.querySelector("#canvas"),
    context = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// feel free to play around here, but more than 10k dots gets slow and unruly
var config = {
    dotNum: 10000,
    maxDotSize: 3,
    colorVariation: 1000,
    maxSpeed: 150
};

var colorPalette = {
    bg: {r: 22, g: 22, b: 29},
    matter: [
        {r: 255, g: 0, b: 0}, // red
        {r: 255, g: 255, b: 255}, // white
        {r: 0, g: 255, b: 0}, // green
        {r: 0, g: 0, b: 255}, // blue
        {r: 0, g: 0, b: 0} // black
    ]
};

// variables woo

var dots = [];

drawBg = function (context, color) {
    context.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

// Dot constructor
var staticDot = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius
    this.r = Math.ceil(Math.random() * config.maxDotSize);
    this.color = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
    // Speed at which the dot falls
    this.speed = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the dot falls
    this.direction = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r,g,b,a, variation;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r,g,b,a};
    }
};

var moveDot = function (d) {
    var a = 180 - (d.direction + 90); // find the 3rd angle
    d.direction > 0 && d.direction < 180 ? d.x += d.speed * Math.sin(d.direction) / Math.sin(d.speed) : d.x -= d.speed * Math.sin(d.direction) / Math.sin(d.speed);
    d.direction > 90 && d.direction < 270 ? d.y += d.speed * Math.sin(a) / Math.sin(d.speed) : d.y -= d.speed * Math.sin(a) / Math.sin(d.speed);
    return d;
};


var drawStaticDot = function (x, y, r, c) {
    context.beginPath();
    context.fillStyle = c;
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
};

// Remove dots that have moved off canvas
var removeDotsOffscreen = function () {
    dots = dots.filter((d) => {
        return (d.x > -100 && d.y > -100);
    });
};


var initDots = function (numDots, x, y) {
    for (let i = 0; i < numDots; i++) {
        dots.push(new staticDot(x, y));
    }
    dots.forEach((d) => {
        drawStaticDot(d.x, d.y, d.r, d.color);
    });
};


// Our Frame function
var frame = function () {
    // Draw background first
    drawBg(context, colorPalette.bg);
    // Move the dots around!
    dots.map((d) => {
        return moveDot(d);
    });
    dots.forEach((d) => {
        drawStaticDot(d.x, d.y, d.r, d.color);
    });
    // do it all over again
    window.requestAnimationFrame(frame);
};

// Event listener
document.body.addEventListener("click", function (event) {
    var x = event.clientX,
        y = event.clientY;
    removeDotsOffscreen();
    initDots(config.dotNum - dots.length, x, y);
});

frame();

initDots(config.dotNum);
