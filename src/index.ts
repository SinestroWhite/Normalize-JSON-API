/*
* Main file
* Description: This file contains the main function for normalizing API responses.
*/

// Importing functions
import {validate}  from './functions/validate';
import {addFields} from './functions/add-fields';
import {findItems} from './functions/find-items';

// Creating interface for the result object
export interface Result {
    [key: string]: Record<string, any>[];
}

/**
 * Normalizing a JSON:API styled server response
 *
 * @param {Object} response - JSON:API styled response from the server.
 * @throws {Error} A data relationship item does not contain type field.
 * @return {Object} result - Normalized response from server
 */
export default function normalize(response: any) {
    //Checking if the response is empty
    if (response.length === 0) { return {}; }
    // Validating data field from the server response
    if (validate(response)) {
        return { data: [] };
    }
    // Creating a variable for the result
    let result: Result;

    // Adding included items in the normalized result
    result = addFields(response);

    // Getting the type of the data items
    const type = response.data[0].type;

    // Creating a new field for the result
    result[type] = [];

    for (const item of response.data) {
        // Adding item from data to the result
        result[type].push({ ...item });
        // Creating a variable to shorten the object path
        const reference = result[type][result[type].length - 1];
        // Using a for loop to go through all relationships of every item in data
        for (const key of Object.keys(item.relationships)) {
            const relation = item.relationships[key];
            // Checking if there is only one relationship stored in an object
            if (relation.data.constructor === Array) {
                // Checking if a data relationship item has type field
                if (!relation.data[0].hasOwnProperty('type')) {
                    throw '[Normalize] [JSON:API Syntax Error] A data relationship item does not contain type field!';
                }
                reference[relation.data[0].type] = [];
                for (const temp of relation.data) {
                    // Adding all found results
                    reference[relation.data[0].type] = [
                        ...reference[relation.data[0].type],
                        ...findItems(response, temp),
                    ];
                }
            } else if (relation.data.constructor === Object) {
                // Adding all found results
                reference[relation.data.type] = findItems(response, relation.data)[0];
            }
        }
        // Removing unnecessary type field
        delete reference.type;
        // Removing unnecessary relationships field
        delete reference.relationships;

    }
    return result;
}
