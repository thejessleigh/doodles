// get canvas and context
var canvas = document.querySelector("#canvas"),
    context = canvas.getContext('2d');

// set canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// play around with these, but it doesn't perform well with more than 15k starting dots
var config = {
    dotNum: 10000,
    maxDotSize: 1,
    colorVariation: 50,
    maxSpeed: 100,
};


// colors are muted, experiment with different colors for a different feel
var colorPalette = {
    bg: {r: 22, g: 22, b: 29},
    matter: [
        {r: 100, g: 100, b: 100}, // lightish grey
        {r: 85, g: 85, b: 85}, // medium grey
        {r: 100, g: 0, b: 0}, // red
        {r: 0, g: 100, b: 0}, // green
        {r: 0, g: 0, b: 100}, // blue
        {r: 200, g: 200, b: 200}, // whiteish
        // {r: 0, g: 0, b: 0}, // pure black
        {r: 45, g: 45, b: 45} // dark grey
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
    this.y = y;
    this.color = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
    // Speed at which the dot floats
    this.speed = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the dot floats
    this.direction = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r, g, b, a;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r, g, b, a};
    }
};

var moveDot = function (d) {
    var a = 180 - (d.direction + 100); // find the 3rd angle
    d.direction > 0 && d.direction < 180 ? d.x += d.speed * Math.sin(d.direction) / Math.sin(d.speed) : d.x -= d.speed * Math.sin(d.direction) / Math.sin(d.speed);
    d.y < canvas.height / 100 && dots.length % 100 === 0 ? d.y -= d.speed * Math.sin(a) / Math.sin(d.speed) * 20 : d.y += d.speed * Math.sin(a) / Math.sin(d.speed);

    return d;
};


var drawStaticDot = function (x, y, c) {
    context.beginPath();
    context.fillStyle = c;
    context.arc(x, y, 1, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
};

// Remove dots that have moved off canvas
var cleanDots = function () {
    if (dots.length >= config.dotNum * 1.5) {
        dots = dots.filter((d) => (Math.round(d.x) % 5 !== 0));
    }
    dots = dots.filter((d) => {
        return (d.x > -100 && d.y > -100);
    });
};


var initDots = function (numDots, x, y) {
    for (let i = 0; i < numDots; i++) {
        dots.push(new staticDot(x, y));
    }
    dots.forEach((d) => {
        drawStaticDot(d.x, d.y, d.color);
    });
};


// Our Frame function
var frame = function () {
    // Draw background first
    drawBg(context, colorPalette.bg);
    // Update dots to new position
    dots.map((d) => {
        return moveDot(d);
    });
    cleanDots();
    dots.forEach((d) => {
        drawStaticDot(d.x, d.y, d.color);
    });
    // semi-randomly spawn more dots to compensate for offscren dots cleaned up
    if (dots.length % 5 === 0) {
        initDots(300, 0, 0);
    } else if (dots.length % 3 === 0) {
        initDots(config.dotNum * .2, 0, canvas.height)
    }
    // Do it again!
    window.requestAnimationFrame(frame);
};


frame();

initDots(config.dotNum);
