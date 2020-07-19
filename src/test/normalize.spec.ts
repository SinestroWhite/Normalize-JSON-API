/*
* Validation test file
* Description: This file contains tests which check if any modifications
* make the new code incompatible with the old one.
*/

// Importing the normalize function
import normalize from '../index';
// Importing mocha and chai for the tests
import { expect } from 'chai';
import 'mocha';

// Creating the test set
describe('normalize test', () => {
    it('should normalize when included relationship is null', () => {
        const test = {
           "data":[
              {
                 "id":"3",
                 "type":"conversation",
                 "attributes":{
                    "subject":"Test subject"
                 },
                 "relationships":{
                    "last_message":{
                       "data":{ type: "people", id: "9" }
                    }
                 }
              },
           ],
           "included": [],
        };
        expect(() => normalize(test)).to.not.throw();
        const normalized = normalize(test);
        expect(normalized).to.have.property('conversation');
    });
    it('should normalize when property "included" is undefined', () => {
        const test = {
           "data":[
              {
                 "id":"3",
                 "type":"conversation",
                 "attributes":{
                    "subject":"Test subject"
                 },
                 "relationships":{
                    "last_message":{
                       "data":{ type: "people", id: "9" }
                    }
                 }
              },
           ],
        };
        expect(() => normalize(test)).to.not.throw();
        const normalized = normalize(test);
        expect(normalized).to.have.property('conversation');
    });
    it('should normalize when property "included" is undefined and relationship is null', () => {
        const test = {
           "data":[
              {
                 "id":"3",
                 "type":"conversation",
                 "attributes":{
                    "subject":"Test subject"
                 },
                 "relationships":{
                    "last_message":{
                       "data": null
                    }
                 }
              },
           ],
        };
        expect(() => normalize(test)).to.not.throw();
        const normalized = normalize(test);
        expect(normalized).to.have.property('conversation');
    });
});
