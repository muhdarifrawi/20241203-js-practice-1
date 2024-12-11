// const { default: test } = require("node:test");
const question01 = require("./question-01");
const question02 = require("./question-02");
const question03 = require("./question-03");

describe("Question 1: ", () => {
    test("Declare variable 'on discount' and display.", () => {
        const fnString = question01.toString();
        console.log = jest.fn();

        question01();

        expect(fnString).toMatch(/let\s+onDiscount\s*=/);
        expect(console.log.mock.calls[0][0]).toBe(false);
    });

    test("Declare variable 'fruit' and display.", () => {
        const fnString = question01.toString();
        console.log = jest.fn();

        question01();

        expect(fnString).toMatch(/var\s+fruit\s*=/);
        expect(console.log.mock.calls[1][0]).toBe('apple');
    });

    test("Declare variable 'gst' and display.", () => {
        const fnString = question01.toString();
        console.log = jest.fn();

        question01();

        expect(fnString).toMatch(/const\s+gst\s*=/);
        expect(console.log.mock.calls[2][0]).toBe(0.09);
    });
    console.log(`\n`);
})

describe("Question 2: ", () => {
    test("Declare and assign variable.", () => {
        const fnString = question02.toString();

        question02();

        expect(fnString).toMatch(/let nameOfFruit\s*=\s*['"]watermelon['"]\s*;/);
    });

    test("Reassign variable.", () => {
        const fnString = question02.toString();

        question02();


        expect(fnString).toMatch(/nameOfFruit\s*=\s*['"]rockmelon['"]\s*;/);
    });

    test("Display variable.", () => {
        const fnString = question02.toString();
        console.log = jest.fn();

        question02();

        expect(console.log.mock.calls[0][0]).toBe("rockmelon");
    });
    console.log(`\n`);
})


describe("Question 3: ", () => {
    test("Declare and assign values to 'a' and 'b'.", () => {
        const fnString = question03.toString();

        question03();
        expect(fnString).toMatch(/let a\s*=\s*2\s*;/);
        expect(fnString).toMatch(/let b\s*=\s*9\s*;/);
    });

    test("Declare sum and display.", () => {
        const fnString = question03.toString();
        console.log = jest.fn();

        question03();
        expect(fnString).toMatch(/let .*\s*=\s*[ab]+\s*\+\s*[ab]+\s*;/);
        expect(console.log.mock.calls[0][0]).toBe(11);
    });

    test("Declare multiply and display.", () => {
            const fnString = question03.toString();
            console.log = jest.fn();

            question03();
            expect(fnString).toMatch(/let .*\s*=\s*[ab]+\s*\*\s*[ab]+\s*;/);
            expect(console.log.mock.calls[1][0]).toBe(18);
    });

    test("Declare power of and display.", () => {
            const fnString = question03.toString();
            console.log = jest.fn();

            question03();
            expect(fnString).toMatch(/let .*\s*=\s*a\s*[\*\*]\s*\*\s*b+\s*;/);
            expect(console.log.mock.calls[2][0]).toBe(512);
    });

    test("Declare modulo and display.", () => {
        const fnString = question03.toString();
        console.log = jest.fn();

        question03();
        expect(fnString).toMatch(/let .*\s*=\s*[a]+\s*\%\s*[b]+\s*;/);
        expect(console.log.mock.calls[3][0]).toBe(2);
});
    console.log(`\n`);
})


