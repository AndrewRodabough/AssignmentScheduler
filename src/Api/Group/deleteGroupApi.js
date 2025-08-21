/**
 * deleteGroupApi - Makes a DELETE request to remove an existing group.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} groupUID - The uid of the group to be deleted.
 * @returns {Promise<string>} Resolves with a success message if group deletion is successful.
 *          Does not return updated group data. Rejects with an error if the request fails.
 */

const deleteGroupApi = (token, groupUID) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/group/delete';

        console.log(token);

        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                groupUID: groupUID
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Group Deletion Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default deleteGroupApi;