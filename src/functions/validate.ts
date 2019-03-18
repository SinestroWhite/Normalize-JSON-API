
/**
 * Validating data field from the server response
 *
 * @param {Object} response - JSON:API styled response from the server.
 * @throws {Error} Not all data items are the same type.
 * @throws {Error} A data item does not contain type field.
 * @throws {Error} The data field must be an object or array.
 * @throws {Error} A data field does not exist.
 */
export function validate(response: any) {
    // Checking if there is data filed in the response
    if (!response.hasOwnProperty('data')) {
        throw '[Normalize] [JSON:API Syntax Error] A data field does not exist!';
    }
    if (response.data.length === 0) { return true; }
    // Checking the type of data
    if ((response.data.constructor !== Object) && (response.data.constructor !== Array)) {
        throw '[Normalize] [JSON:API Syntax Error] The data field must be an object or array!';
    }
    // Checking if data is an array of objects
    if (response.data.constructor === Object) {
        response.data = Array(response.data);
    }
    // Checking if the first item has type field
    if (!response.data[0].hasOwnProperty('type')) {
        throw '[Normalize] [JSON:API Syntax Error] A data item does not contain type field!';
    }
    // Getting the type of the first element
    const type = response.data[0].type;
    for (const item of response.data) {
        // Checking if an data item has type field
        if (!item.hasOwnProperty('type')) {
            throw '[Normalize] [JSON:API Syntax Error] A data item does not contain type field!';
        }
        // Checking if the current item has the same type as the first
        if (item.type !== type) {
            throw '[Normalize] [JSON:API Syntax Error] Not all data items are the same type!';
        }
    }
    return false;
}
