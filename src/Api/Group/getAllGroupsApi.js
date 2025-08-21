/**
 * getAllGroupsApi - Makes a GET request to retrieve all groups associated with the user.
 * 
 * @param {string} token - The authentication token of the user.
 * @returns {Promise<Array>} Resolves with an array of groups if successful.
 *          Rejects with an error if the request fails.
 */

const getAllGroupsApi = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/group/getAll';

        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Group Get Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default getAllGroupsApi;