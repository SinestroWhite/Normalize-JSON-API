
/**
 * Find all corresponding relationship items
 *
 * @param {Object} response - JSON:API styled response from the server.
 * @param {Object} temp - Relationship data field
 * @throws {Error} A data relationship item does not contain type field.
 * @throws {Error} A data relationship item does not contain id field.
 * @return {Object} result - Included items grouped by their type
 */
export function findItems(response: any, temp: any) {
    // Checking if temp has type field
    if (!temp.hasOwnProperty('type')) {
        throw '[Normalize] [JSON:API Syntax Error] A data relationship item does not contain type field!';
    }
    // Checking if temp has id field
    if (!temp.hasOwnProperty('id')) {
        throw '[Normalize] [JSON:API Syntax Error] A data relationship item does not contain id field!';
    }
    const result = [];
    // Adding all found results
    result.push(
        response.included.find((item: any) => (String(item.id) === String(temp.id)) &&
            (String(item.type) === String(temp.type))),
    );
    return result;
}
