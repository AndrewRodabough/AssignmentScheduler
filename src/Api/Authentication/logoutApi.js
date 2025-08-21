/**
 * logout - Makes a DELETE request to log out the authenticated user.
 * 
 * @param {string} token - The authentication token of the user to be logged out.
 * @returns {Promise<void>} Resolves if logout is successful.
 *          Rejects with an error if the logout request fails.
 */

const logoutApi = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/auth/logout';

        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {

            console.log(response)

            if (!response.ok) {
                throw new Error('Logout failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default logoutApi;