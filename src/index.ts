/// <reference path="index.d.ts" />
import {
    generateLines,
    generateLine,
    isOutsideTheScreen
} from "./helpers";

import {
    MAX_CONCURRENT_LINES
} from "./defaults";


const $canvas = <HTMLCanvasElement> document.getElementById("background");

let WINDOW_DIMENSIONS: windowDimensions = {
    width  : 0,
    height : 0
};

let rafHandler: number = 0;

const context = $canvas.getContext("2d");
let lines: line[] = [];


const initialize = () => {

    WINDOW_DIMENSIONS.width = window.innerWidth;
    WINDOW_DIMENSIONS.height = window.innerHeight;
    $canvas.width  = WINDOW_DIMENSIONS.width;
    $canvas.height = WINDOW_DIMENSIONS.height;

    lines = generateLines(WINDOW_DIMENSIONS);

    window.cancelAnimationFrame(rafHandler);
    window.requestAnimationFrame(draw);
};


window.addEventListener("resize", () => initialize());
initialize();



function draw(): void {
    context.clearRect(0, 0, WINDOW_DIMENSIONS.width, WINDOW_DIMENSIONS.height);
    for (let i = 0; i < MAX_CONCURRENT_LINES; i += 1) {
        const { x, y, width, height, speed, color } = lines[i];
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        lines[i].x += speed;
        if (isOutsideTheScreen(lines[i], WINDOW_DIMENSIONS)) {
            console.log(lines[i]);
            lines[i] = generateLine(WINDOW_DIMENSIONS);
        }
    }
    rafHandler = window.requestAnimationFrame(draw);
}


rafHandler = window.requestAnimationFrame(draw);