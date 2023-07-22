import { Rectangle, InvalidLengthError } from './problem_six';

describe(
    'Rectangle Tests',
    () => {

        test('zero width', () => {
            expect(() => new Rectangle(0, 1)).toThrow(InvalidLengthError);
        })

        test('zero length', () => {
            expect(() => new Rectangle(1, 0)).toThrow(InvalidLengthError);
        })

        test('negative width', () => {
            expect(() => new Rectangle(-1, 1)).toThrow(InvalidLengthError);
        })

        test('negative width', () => {
            expect(() => new Rectangle(1, -1)).toThrow(InvalidLengthError);
        })

        test('negative width and zero length', () => {
            expect(() => new Rectangle(-1, 0)).toThrow(InvalidLengthError);
        })

        test('zero width and negative length', () => {
            expect(() => new Rectangle(0, -1)).toThrow(InvalidLengthError);
        })

        test('area, perimeter, isSquare', () => {
            const r: Rectangle = new Rectangle(5, 3);
            expect(r.area()).toEqual(15);
            expect(r.perimeter()).toEqual(16);
            expect(r.isSquare()).toEqual(false);
        })

        test('area, perimeter, isSquare', () => {
            const r: Rectangle = new Rectangle(1, 1);
            expect(r.area()).toEqual(1);
            expect(r.perimeter()).toEqual(4);
            expect(r.isSquare()).toEqual(true);
        })

        test('negative scale', () => {
            const r: Rectangle = new Rectangle(7, 9);
            expect(() => r.scale(-9)).toThrow(InvalidLengthError);
        })

        test('zero scale', () => {
            const r: Rectangle = new Rectangle(7, 9);
            expect(() => r.scale(0)).toThrow(InvalidLengthError);
        })

        test('scale down', () => {
            const r: Rectangle = new Rectangle(5, 10);
            r.scale(0.2);
            expect(r.width).toEqual(1);
            expect(r.height).toEqual(2);
        })

        test('scale down', () => {
            const r: Rectangle = new Rectangle(5, 10);
            r.scale(2.3);
            expect(r.width).toEqual(11.5);
            expect(r.height).toEqual(23);
        })

        test('scale chaining', () => {
            const r: Rectangle = new Rectangle(5, 10);
            r.scale(0.2).scale(5);
            expect(r.width).toEqual(5);
            expect(r.height).toEqual(10);
        })

    }
)
