export class InvalidLengthError extends Error {

    constructor(dimension: string, length: number) {
        super(`Size of '${dimension}' must be positive. Received ${length}.`)
        this.name = "InvalidLengthError";
    }

}

export class Rectangle {

    width: number;
    height: number;

    constructor (width: number, height: number) {

        if (height <= 0) {
            throw new InvalidLengthError("height", height);
        }

        if (width <= 0) {
            throw new InvalidLengthError("width", width);
        }

        this.width = width;
        this.height = height;

    }

    area (): number {
        return this.height * this.width;
    }

    perimeter (): number {
        return 2 * (this.height + this.width);
    }

    scale (coeff: number): Rectangle {

        if (coeff <= 0) {
            throw new InvalidLengthError("scaling coefficient", coeff);
        }

        this.height *= coeff;
        this.width *= coeff;

        return this;

    }

    isSquare (): boolean {
        return this.width === this.height;
    }

}
