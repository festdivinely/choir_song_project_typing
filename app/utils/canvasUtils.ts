export type maxType = number
export type minType = number
export type colorType = string[]
export type xDirectionExp = number
export type yDirectionExp = number
export type xCoordinateExp = number
export type yCoordinateExp = number


export function randomIntFromRange(min: minType, max: maxType) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor(colors: colorType) {
    return colors[Math.floor(Math.random() * colors.length)]
}

export function distance(x1: xDirectionExp, y1: yDirectionExp, x2: xCoordinateExp, y2: yCoordinateExp) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


