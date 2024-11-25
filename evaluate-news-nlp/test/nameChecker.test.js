import { isValidName } from "../src/client/js/nameChecker.js";

describe("Testing name validation", () => {
    test("isValidName should return true for valid names", () => {
        expect(isValidName("John")).toBe(true);
    });

    test("isValidName should return false for empty names", () => {
        expect(isValidName("")).toBe(false);
    });
});  