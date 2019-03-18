
/**
 * Adding included items in the normalized result
 *
 * @param {Object} response - JSON:API styled response from the server.
 * @throws {Error} An included item does not contain type field.
 * @return {Object} result - Included items grouped by their type
 */
export function addFields(response: any) {
    // Creating a variable for the result
    const result: any = {};
    // Checking if there is included filed in the response
    if (response.hasOwnProperty('included')) {
        // Grouping included items by their type
        for (const item of response.included) {
            // Checking if an included item has type field
            if (!item.hasOwnProperty('type')) {
                throw '[Normalize] [JSON:API Syntax Error] An included item does not contain type field!';
            }
            // Checking if the result has property the type of the item
            if (!result.hasOwnProperty(item.type)) {
                result[item.type] = [];
            }
            // Adding the item according to it's type
            result[item.type].push({ ...item });
            // Deleting unnecessary type filed in the result
            delete result[item.type][result[item.type].length - 1].type;
        }
    }
    return result;
}
