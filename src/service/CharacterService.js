import axiosInstance from "./AxiosConfig";

// Default table pagination
export const DEFAULT_PAGINATION_AMOUNT = 20;

/**
 * Generates the correct orderBy string for the API
 * 
 * @param {String} sortDirection - The sort direction asc or desc
 * @param {string} sortField - The field to be sorted by 
 * @returns {string} The sort string correctly formatted. Ex : -name
 */
const generateOrderBy = (sortDirection, sortField) => {
    let orderByString = "";

    orderByString += sortDirection === "asc" ? "" : "-";
    orderByString += sortField;

    return orderByString;
};

const CharacterService = {

    /**
     * Retrieve the characters 
     * 
     * @param {string} searchQuery - The name of the character
     * @param {number} page - The page number (default = 0)
     * @param {string} sortDirection - The sort direction asc or desc
     * @param {string} sortField - The field to be sorted by 
     * @returns {Promise<>}
     */
    getCharacters: function (searchQuery, page = 0, sortDirection = '', sortField = '') {
        console.log("toto")
        return axiosInstance.get('/characters', {
            params: {
                ...(searchQuery ? { name: searchQuery } : {}),
                offset: page * DEFAULT_PAGINATION_AMOUNT,
                ...(sortDirection && sortField ? { orderBy: generateOrderBy(sortDirection, sortField) } : {})
            }
        })
    }

};

export default CharacterService;