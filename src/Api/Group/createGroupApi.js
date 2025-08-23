/**
 * createGroupApi - Makes a POST request to create a new group.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} groupTitle - The name of the group to be created.
 * @returns {Promise<Object>} Resolves with the newly created group object if group creation is successful.
 *          Rejects with an error if the request fails.
 */

const createGroupApi = (token, group) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/group/create';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                group: group
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Group Creation Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default createGroupApi;