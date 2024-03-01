const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite("Number", function () {
        test("Read a whole number input", function () {
            assert.equal(convertHandler.getNum('10mi'), 10);
        });
        test("Read a decimal number input", function () {
            assert.equal(convertHandler.getNum('10.1mi'), 10.1);
        });
        test("Read a fractional input", function () {
            assert.equal(convertHandler.getNum('10/2mi'), 5);
        });
        test("Read a fractional input with a decimal", function () {
            assert.equal(convertHandler.getNum('10.0/2mi'), 5);
        });
        test("Return an error on a double-fraction", function () {
            assert.equal(convertHandler.getNum('10/2/2mi'), 'invalid number');
        });
        test("Return 1 when no numerical input is provided", function () {
            assert.equal(convertHandler.getNum('mi'), 1);
        });
    });
    suite("Unit", function () {
        test("Read valid unit input", function () {
            assert.equal(convertHandler.getUnit('10mi'), 'mi');
        });
        test("Return an error for an invalid input unit", function () {
            assert.equal(convertHandler.getUnit('10meters'), 'invalid unit');
        });
        test("Return the correct unit for each valid input unit", function () {
            let inputUnits = ['L', 'mi', 'lbs', 'gal', 'km', 'kg'];
            let returnUnits = ['gal', 'km', 'kg', 'L', 'mi', 'lbs'];
            inputUnits.forEach((element,i) => {
                assert.equal(convertHandler.getReturnUnit(element), returnUnits[i]);
            })
        });
    });
    suite("String", function () {
        test("Return the spelled-out string unit for each valid input", function () {
            let inputUnits = ['L', 'mi', 'lbs', 'gal', 'km', 'kg'];
            let stringUnits = ['liters', 'miles', 'pounds', 'gallons', 'kilometers', 'kilograms'];
            inputUnits.forEach((element, i) => {
                assert.equal(convertHandler.spellOutUnit(element), stringUnits[i]);
            })
        });
    });
    suite("Conversion", function () {
        test("Correctly convert gal to L", function () {
            assert.approximately(convertHandler.convert(2,'gal'), 7.57082, 0.1);
        });
        test("Correctly convert L to gal", function () {
            assert.approximately(convertHandler.convert(10,'L'), 2.64172, 0.1);
        });
        test("Correctly convert mi to km", function () {
            assert.approximately(convertHandler.convert(10,'mi'), 16.0934, 0.1);
        });
        test("Correctly convert km to mi", function () {
            assert.approximately(convertHandler.convert(5,'km'), 3.10686, 0.1);
        });
        test("Correctly convert lbs to kg", function () {
            assert.approximately(convertHandler.convert(8,'lbs'), 3.62874, 0.1);
        });
        test("Correctly convert kg to lbs", function () {
            assert.approximately(convertHandler.convert(3,'kg'), 6.61387, 0.1);
        });
    });
});