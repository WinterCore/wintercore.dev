import * as DEFAULTS from "./defaults";

export const randomRange = (min: number, max: number, round = true): number => {
    const number = Math.random() * (max - min) + min;
    return round ? Math.round(number) : number;
};

export const generateLine = ({ width : windowWidth, height : windowHeight }: windowDimensions): line => {
    const width: number  = randomRange(DEFAULTS.MIN_LINE_WIDTH, windowWidth / DEFAULTS.MAX_LINE_WIDTH_SCALE);
    const height: number = randomRange(DEFAULTS.HEIGHT_MIN, DEFAULTS.HEIGHT_MAX)
    const y: number      = randomRange(0 + DEFAULTS.PADDING_TOP, windowHeight - height - DEFAULTS.PADDING_BOTTOM);
    const isGoingRight   = Math.random() > DEFAULTS.DIRECTION_RATIO;
    const x: number      = isGoingRight ? -width : windowWidth;
    const randomSpeed    = randomRange(DEFAULTS.MIN_SPEED, DEFAULTS.MAX_SPEED, false);
    return {
        x,
        y,
        width,
        height,
        color : `rgba(${DEFAULTS.COLOR.r}, ${DEFAULTS.COLOR.g}, ${DEFAULTS.COLOR.b}, ${randomRange(DEFAULTS.COLOR_OPACITY_MIN, DEFAULTS.COLOR_OPACITY_MAX, false)})`,
        speed : isGoingRight ? randomSpeed : -randomSpeed
    };
};

export const generateLines = (windowDimensions: windowDimensions): line[] =>
    Array(DEFAULTS.MAX_CONCURRENT_LINES).fill(null).map(() => generateLine(windowDimensions));


export const isOutsideTheScreen = ({ x, width, speed }: line, windowDimensions: windowDimensions): boolean => {
    const isGoingRight = speed > 0;
    if (
        (isGoingRight && x > windowDimensions.width)
        || (!isGoingRight && x + width < 0)
    ) return true;
    return false;
};