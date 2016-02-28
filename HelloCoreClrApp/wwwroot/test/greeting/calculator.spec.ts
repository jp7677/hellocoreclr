/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
'use strict';

describe("Calculator Test ", () => {
    it('Should calculate', () => {
        var calc = new greeting.Calculator();
        chai.expect(calc.sum(5,9)).to.equals(14);
    });
});
