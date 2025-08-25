/**
 * updateGroupApi - Makes a PUT request to update an existing group.
 *
 * @param {string} token - The authentication token of the user.
 * @param {string} groupUID - The uid of the group to update.
 * @param {Object} group - The updated group.
 * @returns {Promise<Object>} Resolves with the updated group object if successful.
 *          Rejects with an error if the request fails.
 */

const updateGroupApi = (token, groupUID, updates) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/group/update';
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                groupUID: groupUID, 
                updates: updates
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Group Update Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default updateGroupApi;