/*
* Validation test file
* Description: This file contains tests which check if any modifications
* make the new code incompatible with the old one.
*/

// Importing the validation function
import { validate } from '../functions/validate';
// Importing mocha and chai for the tests
import { expect } from 'chai';
import 'mocha';

// Creating the test set
describe('Validation test', () => {
    it('should return false when data object follows the JSON:API specification', () => {
        const test = { data: [{ type: 'article', id: '1' }, { type: 'article', id: '2' }] };
        expect(validate(test)).to.equal(false);
    });
    it('should return true when data object is empty', () => {
        const test = { data: [] };
        expect(validate(test)).to.equal(true);
    });
    // Creating throw tests
    it('should throw that a data field does not exist', () => {
        const test = { example: [] };
        expect(() => {
            validate(test);
        }).to.throw('[Normalize] [JSON:API Syntax Error] A data field does not exist!');
    });
    it('should throw that data field must be an object or array', () => {
        const test = { data: 'example' };
        expect(() => {
            validate(test);
        }).to.throw('[Normalize] [JSON:API Syntax Error] The data field must be an object or array!');
    });
    it('should throw that the first data item does not contain type field', () => {
        const test = { data: [{ id: '3' }] };
        expect(() => {
            validate(test);
        }).to.throw('[Normalize] [JSON:API Syntax Error] A data item does not contain type field!');
    });
    it('should throw that a data item does not contain type field', () => {
        const test = { data: [{ type: 'article' }, { id: '3' }] };
        expect(() => {
            validate(test);
        }).to.throw('[Normalize] [JSON:API Syntax Error] A data item does not contain type field!');
    });
    it('should throw that not all data items are the same type', () => {
        const test = { data: [{ type: 'article' }, { type: 'person' }] };
        expect(() => {
            validate(test);
        }).to.throw('[Normalize] [JSON:API Syntax Error] Not all data items are the same type!');
    });
});
