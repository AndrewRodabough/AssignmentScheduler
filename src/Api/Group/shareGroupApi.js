/**
 * shareGroupApi - Makes a PUT request to share a group with another user.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} shareUser - The username of the user to share the group with.
 * @param {string} groupUID - The uid of the group to share.
 * @returns {Promise<Object>} Resolves with the updated group object if the group is successfully shared.
 *          Rejects with an error if the request fails.
 */

const shareGroupApi = (token, username, groupUID) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/group/share';

        console.log(token);

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                groupUID: groupUID
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Group Share Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default shareGroupApi;